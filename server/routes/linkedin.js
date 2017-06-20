var express = require('express');
var router = express.Router();
var Linkedin = require('node-linkedin')(process.env['LINKED_IN_APP_ID'], process.env['LINKED_IN_SECRET']);
var passport = require('passport');

var responses = require('./responses');

router.get('/', (req, res) => {
    console.log('Auth', req.session.token);
    if (!req.session.token) {
        responses.standardError(res, new Error('Token is not set'));
        return;
    }
    const linkedin = Linkedin.init(req.session.token);
    linkedin.companies_search.name('facebook', 1, function(err, company) {
        if (err) {
            responses.standardError(res, new Error('Token is not set'));
            return;
        } else if (company.status === 401) {
            req.logout();
            console.log('not auth');
            return;
        } else {
            console.log('Company', JSON.stringify(company));
        }
        name = company.companies.values[0].name;
        desc = company.companies.values[0].description;
        industry = company.companies.values[0].industries.values[0].name;
        city = company.companies.values[0].locations.values[0].address.city;
        websiteUrl = company.companies.values[0].websiteUrl;
        responses.standardResponse(res, company);
    });
});

module.exports = router;