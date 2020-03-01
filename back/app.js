require('dotenv').config();
require('./bin/db');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var teachersRouter = require('./routes/teachers');
var skillsRouter = require('./routes/skills');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/professores', teachersRouter);
app.use('/skills', skillsRouter);

module.exports = app;
