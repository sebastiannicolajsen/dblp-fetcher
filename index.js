import { parseMultiple } from "./src/parser.js";
import loader from "./src/loader.js";
import dotenv from "dotenv";
import args from "./src/args.js";
import fs from "fs";
import getVenues from "./src/venue-propagator.js";

dotenv.config();

const FILE = "file";

const paths = [
  "https://dblp.org/db/journals/toplas/index.html",
  "https://dblp.org/db/journals/pacmpl/index.html",
  "https://dblp.org/db/conf/hopl/index.html",
  "https://dblp.org/db/conf/popl/index.html",
  "https://dblp.org/db/conf/pldi/index.html",
  "https://dblp.org/db/conf/cgo/index.html",
  "https://dblp.org/db/conf/dls/index.html",
  "https://dblp.org/db/conf/gpce/index.html",
  "https://dblp.org/db/conf/oopsla/index.html",
  "https://dblp.org/db/conf/sle/index.html",
];

let results, na;

if (args[FILE]) {
  console.log("running with existing file...");
  const input = fs.readFileSync(args[FILE]);
  results = JSON.parse(input);
  na = [];
} else {
  const res = await parseMultiple(await getVenues());
  results = res.results;
  na = res.na;
}

console.log(
  `Initially found ${Object.entries(results).length}, and lost ${
    Object.entries(na).length
  } `
);
await loader(results);
