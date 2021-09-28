import open from "open";
import clipboardy from "clipboardy";
import readkey from "readkey";
import fs from "fs";
import args from "../args.js";
import { print, clearLine } from "../print.js";
import readline from "readline";

const SILENT = "silent";
const SAVE = "save";

const MSG = "[F]orward, [B]ackward, [O]pen, [L]abel, [C]omment";

// consumes the input
export default function (input) {
  const i = input.index;
  delete input.index;
  const objs = Object.entries(input);

  input.index = i ? i : 0;

  let _last = "";
  const clearPrint = (output) => {
    const str = `${output}\n\n${MSG}`;
    print(str, {
      clear_string: _last,
    });
    _last = output;
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
      const path = `${args[SAVE]}.json`;
      fs.writeFileSync(path, JSON.stringify(input));
    }
    process.exit();
  };

  let _commenting = false;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const comment = () => {
    clearLine();

    rl.on("line", (line) => {
      if (!_commenting) return;
      const [doi, _] = objs[input.index];
      input[doi].comment = line;
      clearPrint(`Added comment to ${doi}: ${line}`);
      _commenting = false;
    });
  };

  const keyCommands = [
    { fn: (str, key) => str === "f", command: forward },
    { fn: (str, key) => str === "b", command: backward },
    { fn: (str, key) => key.ctrl && key.name === "c", command: exit },
    { fn: (str, key) => str === "l", command: label },
    { fn: (str, key) => str === "o", command: openArticle },
    {
      fn: (str, key) => str === "c" && !_commenting,
      command: () => {
        _commenting = true;
        comment();
      },
    },
  ];
  exec();
  readkey(keyCommands);
  return { result: null, process_tag: "iterate_open_save" };
}
