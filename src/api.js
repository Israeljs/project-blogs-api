require('express-async-errors');
const express = require('express');
const errorhandler = require('./middlewares/errorhandler');

const app = express();
const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const blogPostRouter = require('./routes/blogPostRouter');

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use('/post', blogPostRouter);
app.get('/ping', (_req, res) => res.status(200).send('pong'));

app.use(errorhandler);

module.exports = app;
