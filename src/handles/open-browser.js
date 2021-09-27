import open from 'open';

export default function (input) {
    for(const [doi, _] of Object.entries(input)){
        open(doi);
    }
    
    return {result: input, process_tag: "open_browser"}
} 