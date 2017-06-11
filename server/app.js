var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var auth = require('./routes/auth');

var cors = require('cors');

var app = express();

var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var session = require('express-session');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'build')))

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session(
  {
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }
)); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// app.use(helmet());

app.use('/auth', auth);

passport.use(new LinkedInStrategy({
  clientID: process.env['LINKED_IN_APP_ID'],
  clientSecret: process.env['LINKED_IN_SECRET'],
  callbackURL: "http://localhost:3001/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true
}, function(accessToken, refreshToken, profile, done) {
    console.log('Access token', accessToken);
    return done(null, profile);
}));

app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
    methods: ['POST', 'GET', 'PUT', 'DELETE']
}));

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
  res.render('error');
});

module.exports = app;
