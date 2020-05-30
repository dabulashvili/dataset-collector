const mongoose = require('mongoose');

module.exports = (mongoUrl) => {
    mongoose.connect(mongoUrl, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(function () {
        console.log('Connected to DB')
    }).catch(function (err) {
        console.error(err)
    });
    
    return mongoose
};
