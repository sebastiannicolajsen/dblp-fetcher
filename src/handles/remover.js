import args from "../args.js";

const LABEL = "only-label";

// replaces address with wrapped element
export default async function (input) {
  const onlyLabel = args[LABEL];
  if (onlyLabel) {
    for (const [doi, { title, address, label }] of Object.entries(input)) {
      if (doi === "index") continue;
      if (!label) {
        delete input[doi];
      } else {
        delete input[doi].label;
      }
    }
    input.index = 0; //some inputs may no longer exist, so ensure we reset starting point
  }

  return { result: input, process_tag: "only_label" };
}
