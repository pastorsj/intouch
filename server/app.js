var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var auth = require('./routes/auth');
var linkedin = require('./routes/linkedin');

var cors = require('cors');

var app = express();

var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require("redis").createClient();

var options = {
  host: '127.0.0.1',
  port: 6379
}

var sessionConfig = {
    secret: 'SECRET',
    resave: false,
    store: new RedisStore({ host: 'localhost', port: 6379, client: redis }),
    saveUninitialized: false,
    cookie: { secure: false }
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/**
 * -----------------------------------------------------------------------------
 * Setup
 * -----------------------------------------------------------------------------
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session(
  sessionConfig
)); // session secret

app.use(express.static(path.join(__dirname, 'build')))

/**
 * -----------------------------------------------------------------------------
 * Passport Code
 * -----------------------------------------------------------------------------
 */
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

passport.use(new LinkedInStrategy({
  clientID: process.env['LINKED_IN_APP_ID'],
  clientSecret: process.env['LINKED_IN_SECRET'],
  callbackURL: "http://localhost:3001/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_basicprofile'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  req.session.token = accessToken;
  console.log('token', req.session.token);
  done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

/**
 * -----------------------------------------------------------------------------
 * Cross Origin Requests
 * -----------------------------------------------------------------------------
 */

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

/**
 * -----------------------------------------------------------------------------
 * Routes
 * -----------------------------------------------------------------------------
 */
app.use('/auth', auth);
app.use('/linkedin', linkedin);

app.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/')
})

/**
 * -----------------------------------------------------------------------------
 * Error Handling
 * -----------------------------------------------------------------------------
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error(err);
});

module.exports = app;
