const express = require('express');
const router = express.Router();

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

module.exports = router;
