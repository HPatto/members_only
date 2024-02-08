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
}

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

  console.log(info);

  return info;
}

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isMember) {
      return next();
    }
  }
  // User is not authenticated, redirect to the login page or send an unauthorized response
  res.redirect('/main'); // Adjust the path based on your application
};

/* GET home page. */
router.get('/', isAuthenticated, async function(req, res, next) {
  console.log("Start of try block");

  const lastMessages = await Message.find().sort({_id: -1}).limit(10);
  console.log("After fetching messages");

  const messageArray = await getDataFromQuery(lastMessages);
  console.log("After processing messages");

  const context = {
    messages: messageArray
  };

  console.log("We're going to render");
  res.render('member', context);
  return;
});

module.exports = router;