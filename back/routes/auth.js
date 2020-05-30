const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const accessTokenSecret = require('../config').tokenSecret;
const User = require('../models/user');

const app = express.Router();

app.post('/login', async (req, res) => {
    // Read username and password from request body
    const { email, password } = req.body;
    // Filter user from the users array by username and password
    const user = await User.findOne({ email: email.toLowerCase() }).lean().exec();

    if (user) {
        const match = await bcrypt.compare(password, user.passwordHash);

        if (match) {
            // Generate an access token
            const accessToken = jwt.sign({ 
                ...user,
                passwordHash: undefined
             }, accessTokenSecret);

            return res.json({
                accessToken
            });
        }
    }

    res.send('Username or password incorrect');
});

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = app;
module.exports.authMiddleware = authenticateJWT;