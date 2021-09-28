let columns = process.stdout.columns;

const NEW_LINE = "\n";

process.stdout.on("resize", function () {
  columns = process.stdout.columns;
  console.log(columns);
});

// eliminates up two 2 newlines added by clear_string
export const print = (
  out,
  config = {
    clear_string: undefined,
  }
) => {
  const { clear_string } = config;
  if (clear_string) {
    const lines = clear_string.split(/\n/);
    let length = lines.length * 2;
    for (const line of lines) {
      length = length + Math.ceil(line.length / columns);
    }

    process.stdout.moveCursor(0, -length);
    process.stdout.cursorTo(0);
    process.stdout.clearScreenDown();
  }

  process.stdout.write(out + NEW_LINE);
};

export const clearLine = () => {
  process.stdout.moveCursor(0, -1);
  process.stdout.cursorTo(0);
  process.stdout.clearScreenDown();
};

export default print;
