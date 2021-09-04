const express = require('express');
const helmet = require('helmet')

global.__basedir1 = __dirname + "/..";
global.__basedir = __dirname;

const mongoose = require('./mongoose')
const service = require('./services')

const app = express();

app.use(helmet());

mongoose(app);
service(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;