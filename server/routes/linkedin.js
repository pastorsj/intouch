var express = require('express');
var router = express.Router();
var Linkedin = require('node-linkedin')(process.env['LINKED_IN_APP_ID'], process.env['LINKED_IN_SECRET']);
var passport = require('passport');

router.get('/', (req, res) => {
    console.log('Auth', req.session.token);
    const linkedin = Linkedin.init(req.session.token);
    linkedin.companies_search.name('facebook', 1, function(err, company) {
        if (err) {
            console.error(err);
            return;
        } else {
            console.log('Company', company);
        }
        name = company.companies.values[0].name;
        desc = company.companies.values[0].description;
        industry = company.companies.values[0].industries.values[0].name;
        city = company.companies.values[0].locations.values[0].address.city;
        websiteUrl = company.companies.values[0].websiteUrl;
    });
    res.sendStatus(200);
});

module.exports = router;