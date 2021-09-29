let columns = process.stdout.columns;

const NEW_LINE = "\n";

process.stdout.on("resize", function () {
  columns = process.stdout.columns;
  console.log(columns);
});

const RED = "\x1b[31m";
const RESET = "\x1b[0m";

// eliminates up two 2 newlines added by clear_string

let _last;
export const print = (
  out,
  config = {
    clear_string: false,
    color: false,
  }
) => {
  const { clear_string, color } = config;
  if (clear_string) {
    const lines = _last;
    let length = 0;
    for (const line of lines) {
      length = length + Math.ceil(line.length / columns);
    }

    process.stdout.moveCursor(0, -length);
    process.stdout.cursorTo(0);
    process.stdout.clearScreenDown();
  }
  _last = out + NEW_LINE;
  if (color) _last = RED + _last + RESET;
  process.stdout.write(_last);
};

export const clearLine = () => {
  process.stdout.moveCursor(0, -1);
  process.stdout.cursorTo(0);
  process.stdout.clearScreenDown();
};

export default print;
