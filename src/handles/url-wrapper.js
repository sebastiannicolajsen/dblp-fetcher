import args from "../args.js";

const WRAPPER = "wrapper";

// replaces address with wrapped element
export default async function (input) {
  const wrapper_url = args[WRAPPER];
  if (wrapper_url) {
    for (const [doi, { title, address }] of Object.entries(input)) {
      if (doi === "index") continue;
      input[doi] = { title, address: `${wrapper_url}${address}` };
    }
  }

  return { result: input, process_tag: "wrapped_url" };
}
