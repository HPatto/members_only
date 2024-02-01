const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const he = require('he');

async function getDataFromQuery(queryObject) {
  const textDataPromises = queryObject.map(async (docObject) => {
    return await getInfoFromDocument(docObject);
  });

  // Wait for all promises to resolve
  const textData = await Promise.all(textDataPromises);

  return textData;
};

async function getInfoFromDocument(docObject) {
  let info = {
    text: "",
    user: "",
    time: ""
  };

  info['text'] = he.decode((docObject['text']));

  const dbUser = await User.findOne({ _id: docObject['userID'] }).exec();

  if (dbUser) {
    info['user'] = dbUser.displayname || dbUser.email;
  } else {
    // Handle the case where dbUser is not found
    info['user'] = "Unknown User";
  }

  
  const fullTimestamp = docObject['timestamp'];
  const year = fullTimestamp.getFullYear();
  const month = fullTimestamp.getMonth() + 1;
  const day = fullTimestamp.getDate();

  info['time'] = `${day}/${month}/${year}`;

  // console.log(info);

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
  
  const messageArray = await getDataFromQuery(lastMessages);
  const context = {
    messages: messageArray
  };
  
  res.render('user', context);
});

module.exports = router;