import { createResultsLiteComposition } from "./controller/createResultsLiteComposition";

const basic = createResultsLiteComposition("basic");
const brickwork = createResultsLiteComposition("brickwork");
const classic = createResultsLiteComposition("classic");
const twocolumnclassic = createResultsLiteComposition("twocolumnclassic");
const cnsw = createResultsLiteComposition("cnsw");
const cnswprivate = createResultsLiteComposition("cnswprivate");
const sixersThunder = createResultsLiteComposition("sixers");
const mudgeeraba = createResultsLiteComposition("mudgeeraba");
const broadcastpro = createResultsLiteComposition("broadcastpro");
const broadcastprorounded = createResultsLiteComposition("broadcastprorounded");
const scoreline = createResultsLiteComposition("scoreline");
const nightSession = createResultsLiteComposition("nightsession");

export {
  basic,
  brickwork,
  classic,
  twocolumnclassic,
  cnsw,
  cnswprivate,
  sixersThunder,
  sixersThunder as sixers,
  sixersThunder as thunder,
  mudgeeraba,
  broadcastpro,
  broadcastprorounded,
  scoreline,
  nightSession,
  nightSession as nightsession,
};
