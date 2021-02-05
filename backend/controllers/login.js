const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/users');
require('dotenv').config();

loginRouter.post('/', async (req, res) => {
    const body = req.body;

    const user = await User.findOne({ email: body.email})
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

        if (!(user && passwordCorrect)) {
            return res.status(401).json({
                error: 'invalid email or password'
            })
        }

        const userForToken = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(userForToken, process.env.SECRET_KEY);

        res.status(200).send({ response: token, username: user.username })
})

module.exports = loginRouter