export default async function (input) {
    for(const [doi, title] of Object.entries(input)){
        input[doi] = {title, address: `${process.env.WRAPPER_URL}${doi}`} 
    }
    
    return {result: input, process_tag: "wrapped_url"}
} 