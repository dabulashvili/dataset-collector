const mongoose = require('mongoose');
const express = require('express');

const Sentence = require('../models/sentence')
const Record = require('../models/record')

const app = express.Router();

app.get('/list', async (req, res) => {
    const sentenses = await Sentence.find({}).exec()
    res.json(sentenses)
})

app.get('/next', async (req, res) => {
    const recordedSentences = await Record.distinct('sentence')
    const nextSentence = await Sentence.findOne({_id: {$nin: recordedSentences}})
    res.json(nextSentence)
})

app.get('/:id', async (req, res) => {
    const sentence = await Sentence.findById(mongoose.Types.ObjectId(req.params.id)).exec();
    res.json(sentence)
})

module.exports = app;