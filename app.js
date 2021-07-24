const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const morgan = require('morgan');
const app = express();
const routes = require('./api/v1/router');
dotEnv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan());
app.use(routes);

app.use((req, res, next) => {
  console.log('Im in this middelware');
});
app.use((req, res, next) => {
  res.status(404).json({ message: 'No Route' });
});

app.use((err, req, res, next) => {
  console.log('Error Middleware', err);
  res.status(400).json({ err });
});

mongoose
  .connect(process.env.MONGOOSE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(`Error occured => ${err}`));

app.listen(process.env.PORT, () => {
  console.log(`App listen in ${process.env.PORT} number.`);
});
