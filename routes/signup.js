const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

/* POST new user. */
router.post('/', function(req, res, next) {
  // Check if everything is valid?
  //// Is it an e-mail?
  //// Is it already in use?
  //// Is the password valid (Do we want to implement rules?)

  // Send it to the database
})

module.exports = router;
