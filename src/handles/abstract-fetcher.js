import cliProgress from "cli-progress";
import fetch from 'node-fetch';

const d = "https://doi.org/"
const extract = (doi) => doi.replace(d, "")
const api = (doi) => `http://api.crossref.org/works/${extract(doi)}/transform/application/vnd.crossref.unixsd+xml` 

export default async function (input) {

    const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    console.log("Fetching information from crossref ...");
    bar.start(input.size, 0);

    for(const [doi, _] of Object.entries(input)){
        const response = await fetch(api(doi))
        input[doi].content = await response.text()
        bar.increment()
    }
    
    return {result: input, process_tag: "fetch_abstract"}
} 