const express = require('express');

const Sentense = require('../models/sentense')

const app = express.Router();

app.get('/list', async (req, res) => {
    const sentenses = await Sentense.find({}).exec()
    res.json(sentenses)
})

module.exports = app;