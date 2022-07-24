require('express-async-errors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const errorhandler = require('./middlewares/errorhandler');

const app = express();
const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const blogPostRouter = require('./routes/blogPostRouter');

const swaggerDocs = require('./swagger.json');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use('/post', blogPostRouter);

app.use(errorhandler);

module.exports = app;
