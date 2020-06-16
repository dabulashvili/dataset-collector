const fs = require('fs')
const readline = require('readline');
const crypto = require('crypto');

const users = [
    { _id: 'davit', 'email': 'davit@tts.ge', 'passwordHash': '$2b$10$xTRFdH0fqV3Q4Hh2HJx4eOaohN/GlfYSPqy8iIze8sFHw9TNnIAeC', 'name': 'Davit' },
    { _id: 'tamuna', 'email': 'tamuna@tts.ge', 'passwordHash': '$2b$10$Lkr2j6Ss4xOdDrve0Hp34.8CiaFN7a72CdeMl4REMwRFPC3XUfHCa', 'name': 'Tamuna' },
    { _id: 'natia', 'email': 'natia@tts.ge', 'passwordHash': '$2b$10$n5Qvt9KCVgTFrMBjobfzhuJ4PLvimKWyB6o.T9gS0vu0IHOOvdfHi', 'name': 'Natia' },
    { _id: 'mari', 'email': 'mari@tts.ge', 'passwordHash': '$2b$10$T1l/wptccSIwQcj4pZaHUOh1PknMCl.rKzIOUBpWRXSBVsGHYMpBS', 'name': 'mari' },
]

async function insertSerntences(db) {
    const collection = db.collection('sentences');
    const fileStream = fs.createReadStream('sentences.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let index = 0;
    for await (const line of rl) {
        let s = line.trim()
        let hash = crypto.createHash('md5').update(s).digest("hex");
        let sentence = {
            _id: `${hash}`,
            hash,
            text: s,
            order: index++,
            length: s.length
        }
        collection.updateOne({ _id: sentence._id }, { $set: sentence }, { upsert: true })
    }
}

function insertUsers(db) {
    const collection = db.collection('users');
    for (let user of users) {
        collection.updateOne({ _id: user._id }, { $set: user }, { upsert: true })
    }
}

module.exports = { insertUsers, insertSerntences }