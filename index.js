import { parseMultiple} from './src/parser.js';
import loader from './src/loader.js';
import dotenv from 'dotenv';
import minimist from 'minimist';
import fs from 'fs';

dotenv.config();


const paths = [
    'https://dblp.org/db/conf/hopl/index.html',
    'https://dblp.org/db/conf/popl/index.html',
    'https://dblp.org/db/conf/pldi/index.html',
    'https://dblp.org/db/conf/cgo/index.html',
    'https://dblp.org/db/conf/dls/index.html',
    'https://dblp.org/db/conf/gpce/index.html',
    'https://dblp.org/db/conf/oopsla/index.html',
    'https://dblp.org/db/conf/sle/index.html',
    
]

const argv = minimist(process.argv.slice(2))
let results, na;

if(argv["file"]){
    console.log("running with existing file...")
    const input = fs.readFileSync(argv["file"]);
    results = JSON.parse(input);
    na = []
} else {
    const res = await parseMultiple(paths);
    results = res.results;
    na = res.na;
}

console.log(`Initially found ${Object.entries(results).length}, and lost ${Object.entries(na).length} `)
await loader(results);







