const multer = require('multer')

const generateUniqueWord = require('./generateUniqueWord')

var storage = multer.diskStorage({
    destination: '/tmp/geo-tts',
    filename: function (req, file, cb) {
        cb(null, generateUniqueWord() + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })

module.exports = upload