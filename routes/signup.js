const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const messages = require('../config/messages');
const User = require('../models/userModel');

// Standards used for route processing
const regexPattern = /^[a-zA-Z0-9_-]{1,20}$/;

// Error processing functions
function generateContextFromErrorArray(errorObj) {
  // The validation request doesn't seem to offer a way to index errors.
  // Best if that logic is handled seperately.
  // Really feels like a library could handle that.
  let blankContext = {
    "emailError": [],
    "passwordError": [],
    "confirmpasswordError": [],
    "displaynameError": []
  };
  let newContext = blankContext;
  errorObj.array().forEach((err) => {
    newContext[err.path + "Error"].push(err.msg);
  })

  return newContext;
}

// Middleware functions
const emailFormat = () => 
  body('email')
    .trim()
    .isEmail()
    .withMessage(messages.errors.emailFormat)
    .escape();

const passwordLength = () =>
  body('password')
    .isLength({ min: "8" })
    .withMessage(messages.errors.passwordLength)
    .escape();

const passwordMatch = () =>
  body('confirmpassword')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(messages.errors.passwordMatch)
    .escape();

const displaynameFormat = () =>
  // Was a display name provided?
  // Is the length suitable?
  body('displayname')
    .trim()
    .isLength({ max: "20" })
    .withMessage(messages.errors.displaynameLength)
    .optional()
    .custom(async (val) => {
      if (val.length === 0) {
        return true;
      }
      if (!(regexPattern.test(val))) {
        throw new Error(messages.errors.displaynameFormat);
      };
      return true;      
    })
    .optional()
    .escape();

const inputMiddleware = [
  emailFormat(),
  passwordLength(),
  passwordMatch(),
  displaynameFormat()
];

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

/* POST new user. */
router.post(
  '/',
  inputMiddleware,
  async (req, res) => {
    /*
    Check if there are any default errors.
    - If yes, prepare to re-render the page.
    - If no, continue.
    */

    const inputErrors = validationResult(req);
    const inputData = {
      givenEmail: req.body.email,
      givenDisplayname: req.body.displayname
    }

    if (!inputErrors.isEmpty()) {
      console.log("Errors found");
      const sortedInputErrors = generateContextFromErrorArray(inputErrors);
      const inputContext = {...inputData, ...sortedInputErrors};
      res.render('signup', inputContext);
      return;
    }

    // Is email already in use?
    // body('email').custom(async value => {
    //   const user = await UserCollection.findUserByEmail(value);
    //   if (user) {
    //     throw new Error('E-mail already in use');
    //   }
    // });

    // Check if the email exists in the database
    const emailTaken = await User.findOne({ email: req.body.email }).exec();
    // , (err, existingUser) => {
    //   if (err) {
    //     // Handle error
    //     return res.status(500).send(err.message);
    //   }
    //   return existingUser;
    // });

    let displaynameTaken = false;

    if (req.body.displayname !== "") {
      displaynameTaken = await User.findOne({ displayname: req.body.displayname }).exec();
    };

    // Final errors to check for in user input
    if (emailTaken || displaynameTaken) {
      const dbErrors = {
        "emailError": [],
        "displaynameError": []
      };

      if (emailTaken) {
        dbErrors['emailError'].push(messages.errors.emailInUse);
      }

      if (displaynameTaken) {
        dbErrors['displaynameError'].push(messages.errors.displaynameInUse);
      }

      const dbContext = {...inputData, ...dbErrors};
      res.render('signup', dbContext);
      return;
    }

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

        await user.save();
        res.redirect("/user");
      }
    });
  }
);

module.exports = router;
