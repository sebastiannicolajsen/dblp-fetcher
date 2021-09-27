
import fetch from 'node-fetch';
import {JSDOM } from 'jsdom';

export async function parseList(list){
    const result = await fetch(list);
    const data = await result.text();
    const dom = new JSDOM(data);
    const results = [];
    dom.window.document.querySelectorAll(".toc-link").forEach(function(e){
        results.push(e.href);
    })
    return results;
}

export async function parsePage(page){
    const result = await fetch(page);
    const data = await result.text();
    const dom = new JSDOM(data);
    const results = {}
    const na = []
    dom.window.document.querySelectorAll(".publ-list").forEach(function(list){
        list.querySelectorAll(":scope > li").forEach(function(e){
            let doi = e.querySelector("li.ee")?.querySelector("a")?.href; 
            const title = e.querySelector("cite").textContent.replace(/\s+/g,' ').trim(); 
            if(!doi) {
                na.push(title)
            } else {
                results[doi] = title;
            }
            
        })
    });

    return {results, na};
}


export async function parseAll(list){
    let result = {};
    const urls = await parseList(list);
    for(const url of urls){
        const articles = await parsePage(url);
        const results = {...result.results, ...articles.results}
        const na = {...result.na, ...articles.na}
        result = {results, na};
    }
    return result;
}



