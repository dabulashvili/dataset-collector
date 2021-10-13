const express = require('express')

const auth = require('./auth')
const sentence = require('./sentence')
const record = require('./record')

const authMiddleware = require('./auth').authMiddleware

const router = express()

router.use('/auth', auth)
router.use('/sentence', authMiddleware, sentence)
router.use('/record', authMiddleware, record)

module.exports = router
