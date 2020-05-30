module.exports = {
    port: process.env.NODE_PORT || 4000,
    host: process.env.NODE_HOST || '0.0.0.0',
    mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/dataset',
    tokenSecret: process.env.TOKEN_SECRET || 'secret',
}