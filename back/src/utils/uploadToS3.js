const fs = require('fs')

const { s3 } = require('../config')
const createS3Client = require('../utils/createS3Client')
const convertAudio = require('../utils/convertAudio')
const audioDuration = require('../utils/audioDuration')

const s3Client = createS3Client(s3)

module.exports = async (file, user) => {
    const newPath = `${file.path}.wav`;
    await convertAudio(file.path, newPath);
    const stat = await fs.promises.stat(newPath);
    const fileName = `${file.filename}.wav`;
    const stream = fs.createReadStream(newPath);
    const duration = await audioDuration(newPath);
    console.log(newPath, duration)

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
            return resolve({
                url: resp.Location,
                duration
            });
        });
    });
}