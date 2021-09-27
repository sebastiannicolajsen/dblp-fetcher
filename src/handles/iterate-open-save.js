import open from 'open';
import clipboardy from 'clipboardy';
import readkey from 'readkey';
import fs from 'fs';


// consumes the input
export default function (input) {
    const i = input.index;
    delete input.index;
    const objs = Object.entries(input);
    
    input.index = i ? i : 0; 

    const exec = () => {
        const [doi, {title, address}] = objs[input.index]
        clipboardy.writeSync(title)
        console.log(`${doi} (${input.index}): ${title}`)
        open(address, {app: { name: "google chrome"}} )
    }

    const forward = () => {        
        input.index++;
        if(input.index === objs.length) process.exit()
        exec();
    }
    const backward = () => {
        input.index--;
        if(input.index < 0) input.index = 0; 
        exec();
    }

    const label = () => {
        const [doi, _] = objs[input.index]
        input[doi].label = true
        console.log(`${doi} labelled.`)
    }

    const save = () => {
        const path = process.env.FILE;
        fs.writeFileSync(path, JSON.stringify(input));
        process.exit();
    }   
 
    const keyCommands = [
        {fn: (str, key) => str === 'f', command: forward},
        {fn: (str, key) => str === 'b', command: backward},
        {fn: (str, key) => key.ctrl && key.name === 'c', command: () => process.exit()},
        {fn: (str, key) => str === 's', command: save},
        {fn: (str, key) => str === 'x', command: label}
    ]
    exec()
    readkey(keyCommands)
    return {result: null, process_tag: "iterate_open_save"}
} 