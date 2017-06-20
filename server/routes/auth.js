var express = require('express');
var router = express.Router();
var Linkedin = require('node-linkedin')(process.env['LINKED_IN_APP_ID'], process.env['LINKED_IN_SECRET']);
var passport = require('passport');

router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/callback', (req, res, next) => {
    passport.authenticate('linkedin', (err, user, info) => {
      if (err) {
        return res.redirect('/signin');
      }
      if (!user) {
        return res.redirect('/signin');
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    })(req, res, next);
  });

module.exports = router;
