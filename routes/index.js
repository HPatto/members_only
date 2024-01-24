const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Will need conditional logic here to serve up w.r.t. cookies.
  res.render('landingpage');
});

module.exports = router;
