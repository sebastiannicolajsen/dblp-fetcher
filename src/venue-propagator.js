import args from "./args.js";
import query from "./query.js";

const VENUES = "_";

const getVenues = async () => {
  let venues = [];
  const ids = args[VENUES];
  if (ids) {
    const sets = await Promise.all(ids.map((id) => query("venue", id)));
    for (const set of sets) venues = [...venues, ...set];
  }
  console.log(`Using "${ids}" to identify:`);
  for (const v of venues) console.log(`- ${v}`);

  return venues;
};

export default getVenues;
