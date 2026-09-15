/** Controlled Markdown subset for the interview page; unsupported syntax fails. */
const escape = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const fail = (line, reason) => {
  throw new Error(`Interview Markdown line ${line}: ${reason}`);
};

function inline(text, line, links = true) {
  let html = "";
  for (let i = 0; i < text.length; ) {
    if (text[i] === "`") {
      const end = text.indexOf("`", i + 1);
      if (end <= i + 1)
        fail(line, "use single-backtick inline code with a closing delimiter");
      html += `<code>${escape(text.slice(i + 1, end))}</code>`;
      i = end + 1;
    } else if (text.startsWith("**", i)) {
      const end = text.indexOf("**", i + 2);
      if (end < 0) fail(line, "unclosed bold text");
      html += `<strong>${inline(text.slice(i + 2, end), line, links)}</strong>`;
      i = end + 2;
    } else if (text[i] === "[") {
      const match = text.slice(i).match(/^\[([^\]]+)\]\(([^\s()]+)\)/);
      if (!match || !links) fail(line, "unsupported or nested link");
      const url = match[2];
      if (!/^(\.\.?\/|\/[^/]|#[a-zA-Z]|https?:\/\/)/.test(url))
        fail(line, "unsupported link target");
      const href = url.startsWith("./")
        ? `/design/.docs/${url.slice(2)}`
        : url.startsWith("../")
          ? new URL(url, "https://local.invalid/design/.docs/").pathname
          : url;
      html += `<a href="${escape(href)}">${inline(match[1], line, false)}</a>`;
      i += match[0].length;
    } else {
      if (
        text.startsWith("![", i) ||
        text.startsWith("~~", i) ||
        text[i] === "*" ||
        (/^(?:^|\W)_[^ ]/.test(text.slice(Math.max(0, i - 1))) &&
          text[i] === "_")
      )
        fail(line, "unsupported inline Markdown; use code, bold, or links");
      if (text[i] === "<" || text[i] === "\\")
        fail(
          line,
          "raw HTML, autolinks, and Markdown escapes are unsupported; use inline code",
        );
      html += escape(text[i++]);
    }
  }
  return html;
}

export function startsBlock(line) {
  return /^(#{1,6}\s|```|~~~|\||[-+*]\s|\d+[.)]\s|>|\s{2,}|<|---+$|\*\*\*+$|___+$)/.test(
    line,
  );
}

export function renderInterviewMarkdown(source) {
  const lines = source.split(/\r?\n/);
  const blocks = [];
  const ids = new Set();
  const check = (line, n) => {
    if (/^(\s{2,}\S|>|<|~~~|[-*_]{3,}\s*$|#{4,6}\s|[+*]\s|\d+\)\s)/.test(line))
      fail(
        n,
        "unsupported block; nested lists, indented blocks, quotes, HTML, thematic rules, and alternate markers are not supported",
      );
    if (/ {2}$/.test(line)) fail(n, "hard line breaks are unsupported");
  };
  for (let i = 0; i < lines.length; ) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    check(line, i + 1);
    if (line.startsWith("```")) {
      const fence = line.match(/^```([a-zA-Z0-9-]*)$/);
      if (!fence) fail(i + 1, "unsupported fence metadata");
      const n = i + 1;
      const content = [];
      i++;
      while (i < lines.length && lines[i] !== "```") content.push(lines[i++]);
      if (i === lines.length) fail(n, "unclosed code fence");
      i++;
      blocks.push(
        `<pre class="prompt"><code${fence[1] ? ` class="language-${fence[1]}"` : ""}>${escape(content.join("\n"))}</code></pre>`,
      );
    } else if (/^#{1,3} /.test(line)) {
      const level = line.indexOf(" ");
      const title = line.slice(level + 1);
      const base =
        title
          .toLowerCase()
          .replace(/[^a-z0-9 ]/g, "")
          .replace(/ +/g, "-") || "section";
      let id = base;
      for (let suffix = 2; ids.has(id); suffix++) id = `${base}-${suffix}`;
      ids.add(id);
      blocks.push(`<h${level} id="${id}">${inline(title, i + 1)}</h${level}>`);
      i++;
    } else if (line.startsWith("|")) {
      const n = i + 1;
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!lines[i].endsWith("|"))
          fail(i + 1, "table rows must have a closing pipe");
        rows.push(
          lines[i++]
            .split("|")
            .slice(1, -1)
            .map((cell) => cell.trim()),
        );
      }
      if (rows.length < 2 || rows[1].some((cell) => !/^---+$/.test(cell)))
        fail(n + 1, "table requires an unaligned --- separator row");
      if (rows.some((row) => row.length !== rows[0].length))
        fail(
          n,
          "table column counts differ; pipes inside cells are unsupported",
        );
      const header = rows[0]
        .map((cell) => `<th scope="col">${inline(cell, n)}</th>`)
        .join("");
      const body = rows
        .slice(2)
        .map(
          (row, index) =>
            `<tr>${row.map((cell) => `<td>${inline(cell, n + index + 2)}</td>`).join("")}</tr>`,
        )
        .join("\n");
      blocks.push(
        `<div class="interview-table"><table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table></div>`,
      );
    } else if (/^(- |\d+\. )/.test(line)) {
      const ordered = /^\d/.test(line);
      const tag = ordered ? "ol" : "ul";
      const pattern = ordered ? /^\d+\. / : /^- /;
      const items = [];
      const start = ordered ? Number(line.match(/^\d+/)[0]) : 1;
      while (i < lines.length && pattern.test(lines[i])) {
        check(lines[i], i + 1);
        items.push(`<li>${inline(lines[i].replace(pattern, ""), i + 1)}</li>`);
        i++;
      }
      if (i < lines.length && lines[i].trim() && !startsBlock(lines[i]))
        fail(
          i + 1,
          "list continuations are unsupported; separate a paragraph with a blank line",
        );
      blocks.push(
        `<${tag}${ordered && start !== 1 ? ` start="${start}"` : ""}>${items.join("\n")}</${tag}>`,
      );
    } else {
      const n = i + 1;
      const paragraph = [];
      do {
        check(lines[i], i + 1);
        paragraph.push(lines[i++]);
      } while (i < lines.length && lines[i].trim() && !startsBlock(lines[i]));
      blocks.push(`<p>${inline(paragraph.join(" "), n)}</p>`);
    }
  }
  return blocks.join("\n\n");
}
