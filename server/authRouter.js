const express = require('express');
const authRouter = express.Router();
const passport = require('passport');

authRouter.get('/auth/logout', (req,res) => {
  req.logout();
  res.redirect('/');
})

authRouter.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}));

authRouter.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

const authCheck = (req, res, next) => {
  if (req.user) {
    // If logged in
    next(req.user);
  } else {
    // If user is not logged in
    res.redirect('/auth/google');
  }
};

authRouter.get('/auth/isSignedIn', function (req, res) {
  if (req.user) {
    console.log(req.user);
    res.send(req.user);
  } else {
    console.log('Not signed in');
    res.send(null);
  }
})

module.exports = authRouter;