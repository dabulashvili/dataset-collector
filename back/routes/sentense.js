const mongoose = require('mongoose');
const express = require('express');

const Sentense = require('../models/sentense')

const app = express.Router();

app.get('/list', async (req, res) => {
    const sentenses = await Sentense.find({}).exec()
    res.json(sentenses)
})

app.get('/:id', async (req, res) => {
    const sentence = await Sentense.findById(mongoose.Types.ObjectId(req.query.id)).exec()
    res.json(sentence)
})

module.exports = app;