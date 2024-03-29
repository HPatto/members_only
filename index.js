// Environment variables
// require('dotenv').config(); // Uncomment for local development.

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
const mainRouter = require('./routes/main.js');
const memberRouter = require('./routes/member.js');
const adminRouter = require('./routes/admin.js');
const signupRouter = require('./routes/signup.js');
const loginRouter = require('./routes/login.js');
const logoutRouter = require('./routes/logout.js');
const userRouter = require('./routes/user.js');
const memberAttemptRouter = require('./routes/memberattempt.js');
const sendMessageRouter = require('./routes/sendmessage.js');
const deleteMessageRouter = require('./routes/deletemessage.js');

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

app.use('/', mainRouter);
app.use('/main', mainRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/member', memberRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/memberattempt', memberAttemptRouter);
app.use('/sendmessage', sendMessageRouter);
app.use('/deletemessage', deleteMessageRouter);

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

// #!/usr/bin/env node

/**
 * Module dependencies.
 */

// const app = require('../index');
const debug = require('debug')('members-only:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = app;
