const express = require('express');

const Record = require('../models/record')

const app = express.Router();

app.get('/list', async (req, res) => {
    const records = await Record.find({user: req.user._id}).exec()
    res.json(records)
})

app.delete('/:id', async (req, res) => {
    await Record.findOneAndRemove({_id: req.params.id, user: req.user._id})
    res.send()
})

app.post('/save', async (req, res) => {
    const record = req.body;
    const newRecord = await new Record({
        ...record,
        user: req.user._id
    }).save()
    res.json(newRecord)
})

module.exports = app;