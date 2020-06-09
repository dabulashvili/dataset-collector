const fs = require('fs')

const { s3 } = require('../config')
const createS3Client = require('../utils/createS3Client')
const convertAudioToMp3 = require('../utils/convertAudioToMp3')

const s3Client = createS3Client(s3)

module.exports = async (file, user) => {

    console.log(file)

    const newPath = `${file.path}.mp3`
    await convertAudioToMp3(file.path, newPath);
    const stat = await fs.promises.stat(newPath);
    const fileName = `${file.filename}.mp3`
    const stream = fs.createReadStream(newPath)

    return new Promise(function (resolve, reject) {
        s3Client.upload({
            Metadata: {
                'Original-Name': fileName
            },
            ContentType: 'audio/mpeg',
            ContentLength: stat.size,
            Bucket: s3.bucket,
            Key: `${user}/${fileName}`,
            Body: stream,
            ACL: "public-read"
        }, function (err, resp) {
            if (err) return reject(err);
            return resolve(resp.Location);
        });
    });
}