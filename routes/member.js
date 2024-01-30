const express = require('express');
const router = express.Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isMember) {
      return next();
    }
  }
  // User is not authenticated, redirect to the login page or send an unauthorized response
  res.redirect('/'); // Adjust the path based on your application
};

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  // Will need conditional logic here to serve up w.r.t. cookies.
  res.render('member');
});

module.exports = router;