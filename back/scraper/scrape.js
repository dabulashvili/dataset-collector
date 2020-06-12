const fs = require('fs');
const readline = require('readline');
const spider = require('./spider')

module.exports = async () => {
    const fileStream = fs.createReadStream('scraper/sites.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        let sentences = await spider.getSentences(line)
        // for (let sentence of sentences) {
        //     console.log(sentence.length, sentence)
        // }
    }
}