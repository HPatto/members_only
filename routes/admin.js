const express = require('express');
const router = express.Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next();
    }
    // return next(); // User is authenticated, proceed to the next middleware or route handler
  }
  // User is not authenticated, redirect to the login page or send an unauthorized response
  res.redirect(301, '/index'); // Adjust the path based on your application
};

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  // Will need conditional logic here to serve up w.r.t. cookies.
  res.render('admin');
});

module.exports = router;