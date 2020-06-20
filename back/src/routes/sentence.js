const mongoose = require('mongoose');
const express = require('express');

const Sentence = require('../models/sentence')
const Record = require('../models/record')
const Skip = require('../models/skip')

const app = express.Router();

app.post('/skip/:id', async (req, res) => {
    let params = { sentence: req.params.id, user: req.user._id }
    let skip = await Skip.findOne(params).exec()
    if (!skip) {
        skip = await new Skip(params).save()
    }
    res.json(skip)
})

app.get('/list', async (req, res) => {
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const data = await Sentence.paginate({}, {
        page,
        limit,
        lean: true,
        sort: { order: 1 }
    })
    const sentenceMap = data.docs.reduce((map, s) => {
        map[s._id] = s;
        return map;
    }, {})
    const skips = await Skip.find({ user: req.user._id, sentence: { $in: data.docs.map(s => s._id) } })
    const records = await Record.find({ user: req.user._id, sentence: { $in: data.docs.map(s => s._id) } })
    skips.forEach(skip => {
        sentenceMap[skip.sentence].skip = true
    })
    records.forEach(record => {
        sentenceMap[record.sentence].recorded = true
    })
    res.json({
        ...data,
        docs: Object.values(sentenceMap)
    })
})

app.get('/next', async (req, res) => {
    const [skips, recordedSentences] = await Promise.all([
        Skip.find({ user: req.user._id }).distinct('sentence'),
        Record.find({ user: req.user._id }).distinct('sentence'),
    ])
    let nextSentence = await Sentence.findOne({ _id: { $nin: recordedSentences.concat(skips) } }).sort({ order: 1 })
    if (!nextSentence && skips.length) {
        nextSentence = await Sentence.findOne({ _id: { $nin: recordedSentences } }).sort({ order: 1 })
    }
    res.json(nextSentence)
})

app.get('/:id', async (req, res) => {
    const sentence = await Sentence.findById(req.params.id).exec();
    res.json(sentence)
})

module.exports = app;