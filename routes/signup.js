const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require('../models/userModel');

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

/* POST new user. */
router.post('/', async (req, res, next) => {
  // Validate, sanitize, error-check, create

  // Was a display name provided?
  const displayNameProvided = req.body.displayname != "";

  // Permitted characters in the display name
  const regexPattern = /^[a-zA-Z0-9_-]{1,20}$/;

  // Email field
  body("email")
    .trim()
    .isEmail()
    .withMessage("Must be a valid e-mail address!")
    .escape();

  // Password field
  body('password').
    isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters!")
    .escape();

  // Confirm password field
  body('passwordConfirmation').custom((value, { req }) => {
    return value === req.body.password;
  });

  // Display name field
  if (displayNameProvided) {
    
    // If the display name is invalid, send her back
    if (!(regexPattern.test(req.body.displayname))) {
      console.log("Big time displayname character error"); 
    }
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
