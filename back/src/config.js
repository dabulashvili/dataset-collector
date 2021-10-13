require('dotenv').config()

module.exports = {
    port: process.env.NODE_PORT || 4000,
    host: process.env.NODE_HOST || '0.0.0.0',
    mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/dataset',
    tokenSecret: process.env.TOKEN_SECRET || 'secret',
    s3: {
        key: process.env.S3_KEY || '',
        secret: process.env.S3_SECRET || '',
        host: process.env.S3_HOST || 'fra1.digitaloceanspaces.com',
        bucket: process.env.S3_BUCKET || 'geo-tts-dataset',
    },
}
