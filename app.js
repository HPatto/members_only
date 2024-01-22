// Environment variables
require('dotenv').config();

// Import modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const engine = require("express-handlebars").engine;

// Connect to database
mongoose.connect(process.env.dbConnect);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// Add new schemas to the database (Done via imports?)
const User = require('./models/userModel.js');
const Message = require('./models/messageModel.js');

// Import app routing
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Some security stuff here?


// Define the app
const app = express();

// view engine setup
app.engine('handlebars', engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
