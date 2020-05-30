const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const SentenseSchema = new Schema({
    text: { type: String },
    meta: { type: Object },
}, {collection: 'sentenses'});

SentenseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Sentense', SentenseSchema);
