import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { renderInterviewMarkdown } from "./interview-markdown.js";

describe("interview Markdown", () => {
  it("stops paragraphs at headings, lists, tables, and fences without blank lines", () => {
    const html = renderInterviewMarkdown(
      "Intro\n## Heading\n- Item\n| A | B |\n| --- | --- |\n| One | Two |\n```text\n<safe>\n```",
    );
    expect(html).toContain("<p>Intro</p>\n\n<h2");
    expect(html).toContain("<ul><li>Item</li></ul>");
    expect(html).toContain('<th scope="col">A</th>');
    expect(html).toContain('<code class="language-text">&lt;safe&gt;</code>');
  });

  it("renders ordered lists, multiline paragraphs, and code without a language", () => {
    const html = renderInterviewMarkdown(
      "First\nsecond & third\n\n3. Three\n4. Four\n\n```\nx\n```",
    );
    expect(html).toContain("<p>First second &amp; third</p>");
    expect(html).toContain('<ol start="3"><li>Three</li>');
    expect(html).toContain('<pre class="prompt"><code>x</code></pre>');
  });

  it("combines links, bold, and literal code without interpreting code contents", () => {
    const html = renderInterviewMarkdown(
      "[**Read** `brief`](./brief.md) and **use `a*b`**. `<script>`",
    );
    expect(html).toContain(
      '<a href="/design/.docs/brief.md"><strong>Read</strong> <code>brief</code></a>',
    );
    expect(html).toContain("<strong>use <code>a*b</code></strong>");
    expect(html).toContain("<code>&lt;script&gt;</code>");
  });

  it("supports parent, root, fragment, and HTTPS links", () => {
    const html = renderInterviewMarkdown(
      "[A](../guide/) [B](/design/guide/) [C](#section) [D](https://example.com/?a=1&b=2)",
    );
    expect(html).toContain('href="/design/guide/"');
    expect(html).toContain('href="#section"');
    expect(html).toContain('href="https://example.com/?a=1&amp;b=2"');
  });

  it("assigns globally unique heading IDs", () => {
    const html = renderInterviewMarkdown(
      "# Repeat\n## Repeat\n### Repeat-2\n## Repeat",
    );
    const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((match) => match[1]);
    expect(new Set(ids).size).toBe(4);
  });

  it.each([
    "| A |\n| data |",
    "| A | B |\n| --- | --- |\n| Only one |",
    "- Item\n  - Nested",
    "- Item\ncontinuation",
    "> Quote",
    "<div>raw</div>",
    "![image](./image.png)",
    "*emphasis*",
    "[unsafe](javascript:alert)",
    "```text\nunclosed",
    "Paragraph\n---",
    "Paragraph\n    indented",
    "Paragraph\n+ alternate list",
    "| A |\n| :--- |",
  ])(
    "rejects unsupported or malformed syntax with a line number: %s",
    (source) => {
      expect(() => renderInterviewMarkdown(source)).toThrow(
        /Interview Markdown line \d+:/,
      );
    },
  );

  it("renders the actual interview with its construction gate", () => {
    const source = readFileSync(
      "design/.docs/design-interview-prompt.md",
      "utf8",
    );
    const html = renderInterviewMarkdown(source);
    expect(html).toContain('id="visual-construction-pass"');
    expect(html).toContain('id="completion-gate"');
    expect(html).toContain("The build prompt remains blocked");
  });
});
