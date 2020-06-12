const express = require('express');
const mongoose = require('mongoose');

const Record = require('../models/record')
const upload = require('../utils/createMulterMiddleware')
const uploadToS3 = require('../utils/uploadToS3')

const app = express.Router();

app.get('/list', async (req, res) => {
    const records = await Record.find({ user: req.user._id }).populate('sentence').exec()
    res.json(records)
})

app.get('/:sentenceId', async (req, res) => {
    let record = await Record.findOne({ user: req.user._id, sentence: req.params.sentenceId })
    res.json(record)
})

app.delete('/:id', async (req, res) => {
    await Record.findOneAndRemove({ _id: req.params.id, user: req.user._id })
    res.send()
})

app.post('/save', upload.single('audio'), async (req, res) => {
    const { url, duration } = await uploadToS3(req.file, req.user._id)
    let record = await Record.findOne({
        sentence: req.body.sentence,
        user: req.user._id,
    })

    if (!record) {
        record = await new Record({
            sentence: req.body.sentence,
            user: req.user._id,
            url,
            duration: parseFloat(duration)
        }).save()
    } else {
        record.url = upload
        record.save()
    }
    res.json(record)
})

module.exports = app;