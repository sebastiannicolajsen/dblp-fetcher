import open from "open";
import clipboardy from "clipboardy";
import readkey from "readkey";
import fs from "fs";
import args from "../args.js";

const SILENT = "silent";
const SAVE = "save";

// consumes the input
export default function (input) {
  const i = input.index;
  delete input.index;
  const objs = Object.entries(input);

  input.index = i ? i : 0;

  const clearPrint = (output) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(output);
  };

  const exec = () => {
    const [doi, { title, address }] = objs[input.index];
    clipboardy.writeSync(title);
    clearPrint(`${doi} (${input.index}): ${title}`);
    if (!args[SILENT]) openArticle();
  };

  const forward = () => {
    input.index++;
    if (input.index === objs.length) process.exit();
    exec();
  };
  const backward = () => {
    input.index--;
    if (input.index < 0) input.index = 0;
    exec();
  };

  const openArticle = () => {
    const [doi, { title, address }] = objs[input.index];
    open(address, { app: { name: "google chrome" } });
  };

  const label = () => {
    const [doi, _] = objs[input.index];
    input[doi].label = !input[doi].label;
    clearPrint(`${doi} labelled: ${input[doi].label}`);
  };

  const exit = () => {
    if (args[SAVE]) {
      const path = process.env.FILE;
      fs.writeFileSync(path, JSON.stringify(input));
    }
    process.exit();
  };

  const keyCommands = [
    { fn: (str, key) => str === "f", command: forward },
    { fn: (str, key) => str === "b", command: backward },
    { fn: (str, key) => key.ctrl && key.name === "c", command: exit },
    { fn: (str, key) => str === "x", command: label },
    { fn: (str, key) => str === "o", command: openArticle },
  ];
  exec();
  readkey(keyCommands);
  return { result: null, process_tag: "iterate_open_save" };
}
