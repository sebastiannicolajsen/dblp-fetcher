import fetch from "node-fetch";

const format = "json";
const path = (type, query) =>
  `https://dblp.org/search/${type}/api?format=${format}&q=${query}`;

const request = async (type, query) => {
  const response = await fetch(path(type, query));
  const json = JSON.parse(await response.text());
  return json.result.hits.hit.map((h) => h.info.url);
};

export default request;
