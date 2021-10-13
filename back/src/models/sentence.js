const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Schema = mongoose.Schema

const SentenceSchema = new Schema(
    {
        _id: { type: String },
        text: { type: String },
        order: { type: Number },
        meta: { type: Object },
    },
    { collection: 'sentences' }
)

mongoosePaginate.paginate.options = {
    limit: 20,
    page: 1,
}

SentenceSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Sentence', SentenceSchema)
