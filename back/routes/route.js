const express = require('express');

const auth = require('./auth');
const sentense = require('./sentense');
const record = require('./record');

const authMiddleware = require('./auth').authMiddleware

const router = express();


router.use('/auth', auth);
router.use('/sentence', authMiddleware, sentense);
router.use('/record', authMiddleware, record);

module.exports = router;
