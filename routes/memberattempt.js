const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require('../models/userModel');

// Environment variables
// require('dotenv').config();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  }
  // User is not authenticated, redirect to the login page or send an unauthorized response
  res.redirect('/main'); // Adjust the path based on your application
};

/* GET membership attempt page. */
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('memberattempt');
});

/* POST membership attempt page. */
router.post('/',
  isAuthenticated,
  body('membershipcode')
  .trim()
  .isLength({ max: "25" })
  .escape(),
  async (req, res, next) => {

    if (req.body.membershipcode === process.env.membershipCode) {
      const user = await User.findById(req.user._id);
      user.isMember = true;
      await user.save();

      res.redirect('/main');
      return;
    }

    res.render('memberattempt');
    return;
  }
);



module.exports = router;