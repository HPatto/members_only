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
const MongoStore = require('connect-mongo');

// Connect to database
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect(process.env.dbConnect);//, dbOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// Add new schemas to the database (Done via imports?)
const User = require('./models/userModel.js');
// const Message = require('./models/messageModel.js');

// Import app routing
const indexRouter = require('./routes/index');
const memberRouter = require('./routes/member');
const adminRouter = require('./routes/admin');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const userRouter = require('./routes/user');
const memberAttemptRouter = require('./routes/memberattempt');
const sendMessageRouter = require('./routes/sendmessage');

// Some security stuff here?


// Define the app
const app = express();

// view engine setup
app.engine('handlebars', engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

const customFields = {
  usernameField: 'email',
  passwordField: 'password'
};

const verifyCallback = async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email });
    console.log("We got to the verify callback");
    console.log(user);
    if (!user) {
      return done(null, false, { message: "Incorrect email" });
    };
    const match = await bcrypt.compare(password, user.hashed_password);
    if (!match) {
      // console.log("Password didn't match");
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch(err) {
    console.log("We got and error");
    console.log(err);
    return done(err);
  };
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

const sessionStore = MongoStore.create(
  { 
    client: db.getClient(),
    collection: "sessions",
    stringify: false, // Don't automatically stringify session data
    parse: JSON.parse,
    autoRemove: 'native',
    autoRemoveInterval: 10
  }
);

app.use(session(
  { secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60
    },
  }
));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static('node_modules'));
app.use('/public', express.static('public'));

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/member', memberRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/memberattempt', memberAttemptRouter);
app.use('/sendmessage', sendMessageRouter);

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
