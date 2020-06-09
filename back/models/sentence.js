const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const SentenceSchema = new Schema({
    text: { type: String },
    meta: { type: Object },
}, {collection: 'sentences'});

SentenceSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Sentence', SentenceSchema);
