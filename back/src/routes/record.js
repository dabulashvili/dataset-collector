const express = require('express');
const mongoose = require('mongoose');

const Record = require('../models/record')
const upload = require('../utils/createMulterMiddleware')
const uploadToS3 = require('../utils/uploadToS3')

const app = express.Router();

app.get('/list', async (req, res) => {
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const records = await Record.paginate({ user: req.user._id }, {
        page,
        limit,
        lean: true,
        populate: 'sentence',
    })
    res.json(records)
})

app.get('/total', async (req, res) => {
    let totalRecord = await Record.aggregate([
        { $match: { 'user': req.user._id } },
        {
            $group: {
                _id: "duration",
                totalRecorded: { $sum: "$duration" }
            }
        }
    ])

    res.json(totalRecord[0])
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