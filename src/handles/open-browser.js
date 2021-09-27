import open from 'open';

export default function (input) {
    for(const [_, {_, address}] of Object.entries(input)){
        open(address);
    }
    
    return {result: input, process_tag: "open_browser"}
} 