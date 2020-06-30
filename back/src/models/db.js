const mongoose = require('mongoose');
const { insertSerntences, insertUsers } = require('./defaults');

module.exports = (mongoUrl, updateDefaults = true) => {
    mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(function () {
        console.log('Connected to DB')
        if (updateDefaults) {
            insertUsers(mongoose.connection.db);
            insertSerntences(mongoose.connection.db);
        }
    }).catch(function (err) {
        console.error(err)
    });

    return mongoose
};
