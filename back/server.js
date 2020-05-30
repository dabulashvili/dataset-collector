const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./models/db');
const router = require('./routes/route')

module.exports = configs => {
    app.use(cors());
    app.use(bodyParser.json());

    mongoose(configs.mongoUrl);

    app.use('/',  router);

    app.listen(configs.port, function () {
        console.log(`Server is running on Port: ${configs.port}`);
    });
}