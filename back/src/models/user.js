const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const UsersSchema = new Schema(
    {
        email: { type: String, index: { unique: true } },
        firstName: { type: String, index: true },
        lastName: { type: String, index: true },
        password: String,
        role: String,
    },
    {
        collection: 'users',
    }
)

UsersSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('User', UsersSchema)
