const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const { body, check, validationResult } = require("express-validator");
const User = require('../models/userModel');

/* Middleware functions */

function emailValid(req, res, next) {
  // console.log("We are checking the email!");
  // console.log(req.body.email);
  check('email')
    .trim()
    .isLength({ min: "12"})
    .withMessage("Invalid length")
    .escape();

  // console.log(check('email'));
  // const emailErrors = validationResult(req);
  // console.log(emailErrors.array());
  next();
};

function passwordLength(req, res, next) {
  // console.log("We are checking the password!");
  body('password')
    .isLength()
    .withMessage("Password must be between 8 and 20 characters")
    .escape()
    .optional();
  
  next();
};

function confirmpasswordMatch(req, res, next) {
  // console.log("We are checking the confirmpassword!");
  body('confirmpassword')
  .custom((value, { req }) => {
    return value === req.body.password;
  })
  .withMessage("Passwords do not match.")
  .optional();

  next();
};

function displaynameValid(req, res, next) {
  // console.log("We are checking the display name!");
  
  // Permitted characters in the display name
  const regexPattern = /^[a-zA-Z0-9_-]{1,20}$/;

  // Was a display name provided?
  const displayNameProvided = req.body.displayname != "";

  if (!displayNameProvided) {
    next();
  }

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

  next();
};

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

// body('email').trim().isEmail().withMessage('Invalid e-mail address').escape(),

function emailTest(req, res, next) {
  check('email').trim().isEmail().withMessage('Invalid e-mail address').escape();
  next();
};

/* POST new user. */
router.post(
  '/',
  [
    emailTest,
    async (req, res, next) => {
      /*
      Check if there are any default errors.
      - If yes, prepare to re-render the page.
      - If no, continue.
      */
      // console.log("We are in the async part!");
      // Extract erros from default validations.
      // console.log("We are in the async func");
      console.log(req.body.email);
      const defaultErrors = validationResult(req);

      console.log(defaultErrors.array());

      if (!defaultErrors.isEmpty()) {
        console.log("Some errors were found mate.");
        console.log(defaultErrors.array());
        res.render('error');
        return;
      }

      /*
      What user errors are possible?

      - Email format incorrect (handled on frontend)
      - Display name of an insufficient length (handled on frontend)
      - Email is already in use
      - Display name is already in use
      - Display name includes illegal characters (handled on backend)
      */

    }
  ]
);

module.exports = router;
