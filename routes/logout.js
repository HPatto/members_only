const express = require('express');
const router = express.Router();
const passport = require("passport");

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware or route handler
    }
    // User is not authenticated, redirect to the login page or send an unauthorized response
    res.redirect('/'); // Adjust the path based on your application
  };

/* GET logout page. */
router.get("/", isAuthenticated, (req, res, next) => {
    req.logout((err) => {
      if (err) {
        console.log("log out error");
        return next(err);
      }
    });

    // req.session.destroy((err) => {
    //     if (err) {
    //       console.error('Error destroying session:', err);
    //     }
    //     res.clearCookie('connect.sid'); // Clear the session cookie
    //     res.redirect('/'); // Redirect to the home page or any other desired location
    // });
    res.clearCookie('connect.sid');
    res.redirect('/');
});

module.exports = router;
