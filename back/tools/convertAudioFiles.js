const fs = require('fs')
const convert = require('../src/utils/convertAudioLowHz')

const dir = '/home/davit/data/tts.ge/wavs'

fs.readdir(dir, (err, files) => {
    if (err) {
        throw err
    }

    // files object contains all files names
    // log them on console
    files.forEach(async (file) => {
        if (!file.endsWith('.wav')) {
            console.log(file)
            await convert(`${dir}/${file}`, `${dir}/${file}.wav`)
        }
    })
})
