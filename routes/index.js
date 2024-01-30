const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  // Will need conditional logic here to serve up w.r.t. cookies.
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      res.redirect('admin');
      return;
    } else if (req.user.isMember) {
      console.log("We are a member");
      res.redirect('member');
      return;
    } else {
      res.redirect('user');
      return;
    }
  }
  // if (req.cookies && req.cookies['connect.sid']) {
    
  //   const sessionID = req.cookies['connect.sid'];
  //   const sessionDocument = await Session.findOne({ session_id: sessionID });
    
  //   const user = await User.findOne({ sessionID });

  //   console.log("This is a logged-in user");
  //   console.log(user);

  //   if (user && user.isAdmin) {
  //     res.redirect('admin');
  //     return;
  //   };

  //   if (user && user.isMember) {
  //     res.redirect('member');
  //     return;
  //   };

  //   if (user) {
  //     console.log("This is a the last logged-in func");
  //     res.redirect('user');
  //     return;
  //   }

  // }
  res.render('landing');
  return;
});

module.exports = router;
