// requires WRAPPER_URL to be set, replaces address with wrapped element
export default async function (input) {
    for(const [doi, {title, address}] of Object.entries(input)){
        if(doi === "index") continue;
        input[doi] = {title, address: `${process.env.WRAPPER_URL}${address}`} 
    }
    
    return {result: input, process_tag: "wrapped_url"}
} 