const fs = require('fs');
const https = require('https');
const configs = require('../src/config')
const mongoose = require('../src/models/db');
const Record = require('../src/models/record')
const Sentence = require('../src/models/sentence')


async function download() {

    const metadata = '/home/davit/data/tts.ge/metadata.csv'

    mongoose(configs.mongoUrl, false);
    const ids = await Sentence.find({}).distinct('_id')
    console.log(`${ids.length} files to download`)
    const cursor = Record.find({ user: 'tamuna', sentence: { $in: ids } }).populate('sentence').cursor()
    let i = 1
    cursor.eachAsync(record => {
        const id = record._id.toString()
        const wavFile = fs.createWriteStream(`/home/davit/data/tts.ge/wavs/${id}.wav`);
        const request = https.get(record.url, function (response) {
            response.pipe(wavFile);
        });

        fs.appendFileSync(metadata, `${id}|${record.sentence.text}|${record.sentence.text}\n`);
        console.log(`${id} downloaded, ${i++} of ${ids.length}`)
    })
}

download()