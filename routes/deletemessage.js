const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require('../models/userModel');
const Message = require('../models/messageModel');

// Environment variables
// require('dotenv').config();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    // console.log("In the delete message");
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  }
  // User is not authenticated, redirect to the login page or send an unauthorized response
  res.redirect('/main'); // Adjust the path based on your application
};

// /* GET membership attempt page. */
// router.get('/', isAuthenticated, function(req, res, next) {
//   res.render('memberattempt');
// });

/* POST membership attempt page. */
router.post('/',
  isAuthenticated,
  async (req, res, next) => {

    console.log(req.body.messageid);

    await Message.findByIdAndDelete(req.body.messageid).exec();
    // console.log(messageToDelete);

    res.redirect('/main', 301);
    return;
  }
);

module.exports = router;