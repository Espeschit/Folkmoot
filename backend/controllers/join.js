const joinRouter = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getTokenFrom = request => {
    const authorization = request.get('Authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

joinRouter.post('/', async (req, res) => {
    const token = getTokenFrom(req);
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        if (!token || !decodedToken.id) {
            return res.status(401).send({ error: 'Token missing or invalid '});
        }
        res.send('Success')
    } catch (err) {
        res.status(401).send({ message:'Token missing or invalid' });
    }
})

module.exports = joinRouter;