const express = require('express');
const router = express.Router();
const he = require('he');

function getDataFromQuery(queryObject) {
  let textData = [];

  queryObject.forEach((docObject) => {
    textData.push(getInfoFromDocument(docObject));
  });

  return textData;
}

function getInfoFromDocument(docObject) {
  let info = {
    text: ""
  };
  info['text'] = he.decode((docObject['text']));

  return info;
}

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  }
  // User is not authenticated, redirect to the login page or send an unauthorized response
  res.redirect('/index'); // Adjust the path based on your application
};

/* GET home page. */
router.get('/', isAuthenticated, async function(req, res, next) {
  // Will need conditional logic here to serve up w.r.t. cookies.
  const lastMessages = await Message.find().sort({_id:-1}).limit(10);
  
  const messageArray = getDataFromQuery(lastMessages);
  const context = {
    messages: messageArray
  };
  
  res.render('user', context);
});

module.exports = router;