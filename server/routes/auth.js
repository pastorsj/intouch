var express = require('express');
var router = express.Router();
var Linkedin = require('node-linkedin')(process.env['LINKED_IN_APP_ID'], process.env['LINKED_IN_SECRET']);
var passport = require('passport');

router.get('/linkedin', passport.authenticate('linkedin'), function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
});

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
