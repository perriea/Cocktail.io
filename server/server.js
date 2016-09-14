var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var sequelize      = require('sequelize');
var flash          = require('req-flash');

var passport       = require('passport');
var expressSession = require('express-session');

// configuration ===========================================

// PORT du serveur web
var port = process.env.PORT || 3000; 

// Recuperation des POST
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cookieParser()); // read cookies (needed for auth)

app.set('view engine', 'ejs');

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// auth
// init de session Passport
app.use(expressSession({
	secret: 'passportcestdelamerde',
	resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require('./app/routes')(app, passport); // configure our routes
require('./config/passport')(passport);

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;