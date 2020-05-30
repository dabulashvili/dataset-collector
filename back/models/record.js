const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    url: {type: String},
    user: {type: String, ref: 'User'},
    sentense: {type: String, ref: 'Sentense'},
    recordDate: { type: Date, default: Date.now },
}, {
    collection: 'records',
});

RecordSchema.plugin(mongoosePaginate);

RecordSchema.pre('save', function (next) {
    if (!this._id) {
        this._id = mongoose.Types.ObjectId().toString();
    }
    next();
});

module.exports = mongoose.model('Record', RecordSchema);
