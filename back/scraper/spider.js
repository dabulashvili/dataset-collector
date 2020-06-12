const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs')

const abb = /(ე\..?ი\..|ა\..?შ|ჩვ\..?წ\.|ე\..?წ\.|კვ\..?კმ|ჩ\..?გ\.|ქ\.|ნახ\.|ძვ\..?წ\.)/g;

const getText = (site) => {
    return fetch(site)
        .then(res => res.text())
        .then(body => {
            let $ = cheerio.load(body);

            return $('.mw-parser-output>p').text()
        });
}

const getSentences = async (site) => {
    let text = await getText(site)
    let paragraphs = text.split('\n')
    paragraphs
        .filter(p => p)
        .map(p => p.replace(/\(.*\)/gm, ''))
        .map(p => p.replace(/\[.*\]/gm, ''))
        .map(p => p.trim())
        .filter(p => p)
        .forEach(p => {
            fs.appendFileSync('sentences.txt', p + '\n')
        })
}

module.exports = {
    getText,
    getSentences
}