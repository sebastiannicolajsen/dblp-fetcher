export default function (input) {
  let i = 0;
  for (const [doi, _] of Object.entries(input)) {
    if (doi === "index") continue;
    input[doi].index = i++;
  }

  return { result: input, process_tag: "indexed" };
}
