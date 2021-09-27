import {parseAll} from './src/parser.js';
import loader from './src/loader.js';
import open from 'open';
import clipboardy from 'clipboardy';
import dotenv from 'dotenv';

dotenv.config();

const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', (dat) => {
      process.stdin.setRawMode(false)
      resolve()
    }))
  }


const {results, na} = await parseAll('https://dblp.org/db/conf/popl/index.html');
const loaded = await loader(results);

const length = Object.entries(results).length;
let i = 0;

console.log(`Found ${length}, and lost ${Object.entries(na).length} `)
for(const [doi, {title, address}] of Object.entries(loaded)){
    clipboardy.writeSync(title)
    console.log(`opening ${doi} (${i}/${length})`)
    open(address, {app: { name: "google chrome"}} )
    i++;
    await keypress()
}







