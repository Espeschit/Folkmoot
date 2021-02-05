const signupRouter = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

signupRouter.get('/', async (req, res, next) => {
    try {
      const users = await User.find({})
        res.json(users);
    } catch (exception) {
      next(exception);
    }
});

signupRouter.post('/', async (req, res, next) => {
    const body = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    try {
        const user = new User({
            email: body.email,
            username: body.username,
            passwordHash
        });

        const savedUser = await user.save();
        res.json(savedUser.toJSON());
    } catch (exception) {
        next(exception)
    }
});

module.exports = signupRouter;