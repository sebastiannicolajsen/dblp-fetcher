import * as handles from './handles/index.js'
import filters from './filters.js' 
import filter from './filter.js'

export default async function loader(input) {
    let result = input;
    let process_tag = "initial";
    result = filter(result, filters, process_tag); // pre filter
    
    for(const [_, handle] of Object.entries(handles)){
        const output = await handle(result)
        result = output.result
        process_tag = output.process_tag
        result = filter(result, filters, process_tag);
    }
    return result;
}