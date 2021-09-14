const fs = require('fs')

const { s3 } = require('../config')
const createS3Client = require('../utils/createS3Client')
const audioDuration = require('../utils/audioDuration')
const initBucket = require('../utils/initBucket')

const s3Client = createS3Client(s3)

module.exports = async (file, user) => {
    await initBucket(s3Client, s3.bucket)
    const stat = await fs.promises.stat(file.path);
    const fileName = `${file.filename}.wav`;
    const stream = fs.createReadStream(file.path);
    const duration = await audioDuration(file.path);
    // console.log(file, newPath, duration)

    return new Promise(function (resolve, reject) {
        s3Client.upload({
            Metadata: {
                'Original-Name': fileName
            },
            ContentType: 'audio/x-wav',
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