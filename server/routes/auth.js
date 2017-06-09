var express = require('express');
var router = express.Router();
var Linkedin = require('node-linkedin')(process.env['LINKED_IN_APP_ID'], process.env['LINKED_IN_SECRET']);

Linkedin.auth.setCallback('callback');

var scope = ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages'];


/* GET home page. */
router.get('/linkedin', function(req, res) {
    // This will ask for permisssions etc and redirect to callback url. 
    Linkedin.auth.authorize(res, scope);
});

router.get('/linkedin/callback', function(req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
        if ( err )
            return console.error(err);
 
        /**
         * Results have something like:
         * {"expires_in":5184000,"access_token":". . . ."}
         */

        console.log(results);

        var linkedin = Linkedin.init(results['access_token'], {
            timeout: 10000 /* 10 seconds */
        });

        return res.redirect('/');
    });
});

module.exports = router;
