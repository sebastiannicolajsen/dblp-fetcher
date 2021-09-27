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


const {results, na} = await parseAll('https://dblp.org/db/conf/hopl/index.html');
const loaded = await loader(results);

const initLength = Object.entries(results).length;
const length = Object.entries(loaded).length;
let i = 0;

console.log(`Found ${initLength}, filtered to ${length}, and lost ${Object.entries(na).length} `)
for(const [doi, {title, address}] of Object.entries(loaded)){
    clipboardy.writeSync(title)
    console.log(`opening ${doi} (${i}/${length})`)
    open(address, {app: { name: "google chrome"}} )
    i++;
    await keypress()
}







