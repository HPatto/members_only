const express = require('express');
const router = express.Router();
const passport = require("passport");

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

/* POST login page */
router.post(
  '/',
  passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login"
  })
);

module.exports = router;
