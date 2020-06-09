const express = require('express');

const Record = require('../models/record')
const upload = require('../utils/createMulterMiddleware')
const uploadToS3 = require('../utils/uploadToS3')

const app = express.Router();

app.get('/list', async (req, res) => {
    const records = await Record.find({ user: req.user._id }).populate('sentence').exec()
    res.json(records)
})

app.delete('/:id', async (req, res) => {
    await Record.findOneAndRemove({ _id: req.params.id, user: req.user._id })
    res.send()
})

app.post('/save', upload.single('audio'), async (req, res) => {
    const upload = await uploadToS3(req.file, req.user._id)

    console.log(req.body)
    console.log(req.body.sentence)
    const newRecord = await new Record({
        sentence: req.body.sentence,
        user: req.user._id,
        url: upload
    }).save()
    res.json(newRecord)
})

module.exports = app;