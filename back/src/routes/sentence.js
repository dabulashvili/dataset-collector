const mongoose = require('mongoose');
const express = require('express');

const Sentence = require('../models/sentence')
const Record = require('../models/record')

const app = express.Router();

app.get('/list', async (req, res) => {
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const sentenses = await Sentence.paginate({}, {
        page,
        limit,
        lean: true
    })
    res.json(sentenses)
})

app.get('/next', async (req, res) => {
    const recordedSentences = await Record.find({ user: req.user._id }).distinct('sentence')
    const nextSentence = await Sentence.findOne({ _id: { $nin: recordedSentences } })
    res.json(nextSentence)
})

app.get('/:id', async (req, res) => {
    const sentence = await Sentence.findById(req.params.id).exec();
    res.json(sentence)
})

module.exports = app;