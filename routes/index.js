const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Message = require('../models/messageModel');
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
  info['text'] = he.decode(docObject['text']);

  return info;
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  // Get messages
  // Get the messages collection.
  const lastMessages = await Message.find().sort({_id:-1}).limit(10);
  
  const messageArray = getDataFromQuery(lastMessages);
  const context = {
    messages: messageArray
  };

  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      res.redirect('admin', 301);
      return;
    } else if (req.user.isMember) {
      res.redirect('member', 301);
      return;
    } else {
      console.log("User is weirdly not authenticated.");
      res.redirect('user', 301);
      return;
    }
  }

  // console.log("We going to the landing page");
  res.render('landing', context);
  return;
});

module.exports = router;
