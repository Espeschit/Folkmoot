const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const signupRouter = require('./controllers/signup');
const loginRouter = require('./controllers/login');
const joinRouter = require('./controllers/join');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/join', joinRouter);


module.exports = app;