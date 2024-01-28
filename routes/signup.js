const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const { body, check, validationResult } = require("express-validator");
const User = require('../models/userModel');

// Permitted characters in the display name
const regexPattern = /^[a-zA-Z0-9_-]{1,20}$/;

/* Middleware functions */

const emailFormat = () => 
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid e-mail address')
    .escape();

const passwordLength = () =>
  body('password')
    .isLength({ min: "8" })
    .withMessage("Password must be between 8 or more characters.")
    .escape();

const passwordMatch = () =>
  body('confirmpassword')
  .custom((value, { req }) => {
    return value === req.body.password;
  })
  .withMessage("Passwords do not match.")
  .escape();

const displaynameFormat = () => {
  // Was a display name provided?
  const displayNameProvided = (body.displayname != "");

  if (displayNameProvided) {
      // Is the length suitable?
    body('displayname')
      .trim()
      .isLength({ min: "1", max: "20" })
      .withMessage("Display name must be between 1 and 20 characters.")
      .custom(async (val) => {
        if (!(regexPattern.test(val))) {
          return false;
        };
        return true;      
      })
      .withMessage("Invalid characters included.")
      .escape();
  }
}

const mware = [
  emailFormat(),
  passwordLength(),
  passwordMatch()
  // displaynameFormat()
];

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

/*
emailValid, passwordLength, confirmpasswordMatch, displaynameValid

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
*/

/* POST new user. */
router.post(
  '/',
  mware,
  (req, res) => {
    /*
    Check if there are any default errors.
    - If yes, prepare to re-render the page.
    - If no, continue.
    */

    const defaultErrors = validationResult(req);

    console.log(req.body);

    if (!defaultErrors.isEmpty()) {
      console.log("Some errors were found mate.");
      console.log(defaultErrors.array());
      res.render('error');
      return;
    }

    res.send("You didn't catch the errors");
    return;

    /*
    What user errors are possible?

    - Email format incorrect (handled on frontend)
    - Display name of an insufficient length (handled on frontend)
    - Email is already in use
    - Display name is already in use
    - Display name includes illegal characters (handled on backend)
    */

  }
);

module.exports = router;
