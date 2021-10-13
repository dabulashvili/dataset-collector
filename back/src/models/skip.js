const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SkipSchema = new Schema(
    {
        sentence: { type: String, ref: 'Sentence' },
        user: { type: String, ref: 'User' },
    },
    {
        collection: 'skips',
    }
)

module.exports = mongoose.model('Skip', SkipSchema)
