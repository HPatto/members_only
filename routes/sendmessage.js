const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const messages = require('../config/messages');

// Environment variables
require('dotenv').config();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  }
  // User is not authenticated, redirect to the login page or send an unauthorized response
  res.redirect('/index'); // Adjust the path based on your application
};

/* POST message. */
router.post('/',
  isAuthenticated,
  body('message')
  .trim()
  .isLength({ max: "200" })
  .withMessage(messages.errors.messageLength)
  .escape(),
  async (req, res, next) => {
    // console.log(req.body.message);
    const messageErrors = validationResult(req);
    
    if (!(messageErrors.isEmpty())) {
        next(err);
    }
    // console.log("USER");
    // console.log(req.user);
    // console.log("USER");
    // console.log("BODY");
    // console.log(req.body);
    // console.log("BODY");
    // console.log(req.user._id);
    // console.log(req.body.message);

    const newMessage = new Message({
        userID: req.user._id,
        text: req.body.message
    })

    console.log("After creating the message object:");
    console.log(req.body.message);

    await newMessage.save();
    res.redirect("/index");
    return;
  }
);



module.exports = router;