// require('dotenv').config();
import configViewEngine from './config/viewEngine.js';
// const configViewEngine = require('./config/viewEngine');
import webRoutes from './routes/web.js'
// const webRoutes = require('./routes/web');
// const connection = require('./config/database');
import connection from './config/database.js';
// import express from 'express';
import 'dotenv/config';
const express = require('express');
import initAPIRoute from './routes/api.js';

var morgan = require('morgan')


const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

app.use((req, res, next) => {
  next();
})

app.use(morgan('combined'))

app.use(express.json())
app.use(express.urlencoded({ extended: true })) //for data

configViewEngine(app);
app.use('/', webRoutes)

initAPIRoute(app);

app.use((req, res) => {
  return res.render('404.ejs')
})

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})