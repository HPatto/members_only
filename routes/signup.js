const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require('../models/userModel');

/* Middleware functions */

function emailValid(req, res, next) {
  body('email')
    .trim()
    .isEmail()
    .withMessage("Invalid e-mail address")
    .escape();
  
  next();
};

function passwordLength(req, res, next) {
  body('password')
    .isLength()
    .withMessage("Password must be between 8 and 20 characters")
    .escape();
  
  next();
};

function confirmpasswordMatch(req, res, next) {
    body('confirmpassword').custom((value, { req }) => {
      return value === req.body.password;
    });
};

function displaynameValid(req, res, next) {
  
  // Permitted characters in the display name
  const regexPattern = /^[a-zA-Z0-9_-]{1,20}$/;

  // Was a display name provided?
  const displayNameProvided = req.body.displayname != "";



};

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

/* POST new user. */
router.post(
  '/',
  [emailValid, passwordLength, confirmpasswordMatch,

  ],
  async (req, res, next) => {
  // Validate, sanitize, error-check, create

  // Display name field
  if (displayNameProvided) {
    
    // If the display name is invalid, send her back
    if (!(regexPattern.test(req.body.displayname))) {
      console.log("Big time displayname character error"); 
    };
  }

  /*
  What user errors are possible?

  - Email format incorrect (handled on frontend)
  - Display name of an insufficient length (handled on frontend)
  - Email is already in use
  - Display name is already in use
  - Display name includes illegal characters (handled on backend)
  */

  // Is email already in use?
  body('email').custom(async value => {
    const user = await UserCollection.findUserByEmail(value);
    if (user) {
      throw new Error('E-mail already in use');
    }
  });

  // Is display name already in use?
  body('displayname').custom(async value => {
    const user = await UserCollection.findUserByName(value); // Incorrect?
    if (user) {
      throw new Error('Display name already in use');
    }
  });

  // Extract erros from request.
  const errors = validationResult(req);

  // Hash and salt password, store the user
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    // if err, do something
    if (err) {
      return next(err);
    } else {
      const user = new User({
        email: req.body.email,
        displayname: req.body.displayname,
        hashed_password: hashedPassword,
        isMember: false,
        isAdmin: false
      });

      const result = await user.save();
      res.redirect("/member");
    }
  });

});

module.exports = router;
