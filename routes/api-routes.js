require('dotenv').config();
const controllers = require('../models');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const upload = require('../util/multer');
const router = require('express').Router();
// const helpers = require('../util');
const inventory = controllers.inventory;

// post route to create a user
router.get('/get-inventory-category', (req, res) => {
  inventory.selectAllAndGroupBy(result => {
    res.send(result);
  });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = { username, password };
    users
      .findOne(user)
      .then(foundUser => {
        return done(null, foundUser);
      })
      .catch(error => {
        console.log('NO USER FOUND:', error);
        return done(null, false);
      });
  })
);

// saves the users session in a cookie based on the userID
passport.serializeUser((user, done) => {
  done(null, user);
});

// checks the cookie
passport.deserializeUser((id, done) => {
  users.getUserById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = router;
