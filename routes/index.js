const express = require('express');
const router = express.Router();

// Homepage text content
const tabText = "STREAM OF CONSCIOUSNESS";
const headerText = "STREAM OF CONSCIOUSNESS";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(
    'index',
    {
      tabTitle: tabText,
      header: headerText,
      vibes: "We are now vibing"
    }
  );
});

module.exports = router;
