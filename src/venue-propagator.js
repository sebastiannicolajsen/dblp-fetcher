import args from "./args.js";
import query from "./query.js";

const VENUES = "venues";

const getVenues = async () => {
  let venues = [];
  const input = args[VENUES];
  if (input) {
    const ids = input.split(",").map((id) => id.trim());
    const sets = await Promise.all(ids.map((id) => query("venue", id)));
    for (const set of sets) venues = [...venues, ...set];
  }
  console.log(`Using "${input}"" to identify:`);
  for (const v of venues) console.log(`- ${v}`);

  return venues;
};

export default getVenues;
