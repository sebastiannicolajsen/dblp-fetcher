import open from "open";
import clipboardy from "clipboardy";
import readkey from "readkey";
import fs from "fs";
import args from "../args.js";
import { print, clearLine } from "../print.js";
import readline from "readline";

const SILENT = "silent";
const SAVE = "save";

const MSG =
  "[F]orward*, [B]ackward*, [O]pen, [L]abel, [C]omment, [S]ave, [G]o to (*shift to jump)";

// consumes the input
export default function (input) {
  const i = input.index;
  delete input.index;
  const objs = Object.entries(input);

  input.index = i ? i : 0;
  if (i >= objs.length) input.index = 0;

  let first = false;
  const clearPrint = (output, color = false) => {
    const str = `${output}\n\n${MSG}`;
    print(str, {
      clear_string: first,
      color,
    });
    first = true;
  };

  const exec = () => {
    const [doi, { title, address, label }] = objs[input.index];
    clipboardy.writeSync(title);
    const index = title.indexOf(":");
    clearPrint(
      `[${label ? "X" : " "}] ${doi} (${input.index}) / ${title.substr(
        0,
        index
      )}:\n- ${title.substr(index + 1)}`,
      label
    );
    if (!args[SILENT]) openArticle();
  };

  const forward = () => {
    input.index++;
    if (input.index === objs.length) exit();
    exec();
  };

  const jump = (f) => {
    const titleIncludes = (incl) => {
      const [_, { title }] = objs[input.index];
      for (const item of incl) {
        if (title.toLowerCase().includes(item)) return true;
      }
      return false;
    };

    f();
    const ids = ["workshop", "proceeding", "conference"];
    while (!titleIncludes(ids)) {
      f();
      if (input.index === 0) break;
    }
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

  const save = () => {
    const path = `${args[SAVE] ? args[SAVE] : "data"}.json`;
    fs.writeFileSync(path, JSON.stringify(input));
    clearPrint(`Saved file to ${path}.`);
  };

  const exit = () => {
    if (args[SAVE]) save();
    process.exit();
  };

  let _commenting = false;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const extractLine = (f, c) => {
    rl.on("line", (line) => {
      if (!_commenting) return;
      const short = line.substring(line.toLowerCase().indexOf(c) + 1); // eliminates all prior input
      f(short);
      _commenting = false;
    });
  };

  const initLine = (f) => () => {
    _commenting = true;
    f();
  };

  const comment = () => {
    clearLine();

    extractLine((line) => {
      const [doi, _] = objs[input.index];
      input[doi].comment = line;
      clearPrint(`Added comment to ${doi}: ${line}`);
    }, "c");
  };

  const goTo = () => {
    clearLine();

    extractLine((line) => {
      input.index = line;
      exec();
    }, "g");
  };

  const keyCommands = [
    { fn: (str, key) => str === "f" && !_commenting, command: forward },
    { fn: (str, key) => str === "b" && !_commenting, command: backward },
    { fn: (str, key) => key.ctrl && key.name === "c", command: exit },
    { fn: (str, key) => str === "l" && !_commenting, command: label },
    { fn: (str, key) => str === "s" && !_commenting, command: save },
    { fn: (str, key) => str === "o" && !_commenting, command: openArticle },
    {
      fn: (str, key) => key.shift && key.name === "b",
      command: () => jump(backward),
    },
    {
      fn: (str, key) => str === "F" && !_commenting,
      command: () => jump(forward),
    },
    {
      fn: (str, key) => str === "c" && !_commenting,
      command: initLine(comment),
    },
    { fn: (str, key) => str === "g" && !_commenting, command: initLine(goTo) },
  ];
  exec();
  readkey(keyCommands);
  return { result: null, process_tag: "iterate_open_save" };
}
