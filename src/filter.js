

export default function filter(results, filters, tag){
    const asArray = Object.entries(results);
    
    const filtered = asArray.filter(function([key, value]){
        for(const {process_tag, filter} of filters){
            if(process_tag === tag && !filter(key,value.toLowerCase())) return false;
        }
        return true;
    });
    return Object.fromEntries(filtered);
}