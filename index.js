import { parseMultiple } from "./src/parser.js";
import loader from "./src/loader.js";
import dotenv from "dotenv";
import args from "./src/args.js";
import fs from "fs";
import getVenues from "./src/venue-propagator.js";

dotenv.config();

const FILE = "file";

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
