// chiffrement mot de passe
var sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var salt   = bcrypt.genSaltSync(10);

var MUsers  = require("./models/users");

module.exports = function(app, passport) {

	app.get('/api', function(req, res) 
    {
    	var newUser = {
            username: "test",
            lastname: "test",
            firstname: "test",
            email: "test",
            sex: "M",
            password: "test",
            authenticate_type: 1,
            token: "fdsfnjdsnfksd"
        }
        MUsers.TUsers.create(newUser).then(function() {
            console.log("Project with id =1 updated successfully!");
            res.json(200, { status: "OK" });
        }).catch(function(e) {
            console.log("Project update failed !");
            res.json(200, { status: "Fail" });
        });
    });
    
    // =====================================
    // AUTHENTIFICATION ====================
    // =====================================
    app.post('/api/auth/local', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));


    // =====================================
    // LOGIN ===============================
    // =====================================
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect : '/login',
        failureFlash : true
    }));


    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', 
        failureRedirect : '/signup',
        failureFlash : true
    }));


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });


    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    app.get('/api/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/api/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
    }));


    // =====================================
    // GITHUB ROUTES =======================
    // =====================================
    app.get('/api/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

    app.get('/api/auth/github/callback',
        passport.authenticate('github', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    app.get('/api/auth/twitter', passport.authenticate('twitter'));

    app.get('/api/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
    }));


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/admin', isAdminIn, function(req, res) {
        res.json({"error" : false, "session" : req.session.passport });
    });

    app.get('/', function(req, res) {
        res.render('index');
    });



    // All routes not found => 404
    app.get('*', function(req, res) {
        res.json({"error" : true, "status" : 404});
    });

};

// =====================================
// MIDDLEWARE FUNCTIONS ================
// =====================================
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.status(401).send({ error: true, message: "Unauthorized, authentification required" });
}

function isAdminIn(req, res, next)
{
    console.log(req.session.passport);
    if (req.isAuthenticated()) {
        MUsers.TUsers.find({where: { authenticate_type: 1, id: req.session.passport }}).then(function (user) {
            if (user)
                return next();
        }).catch(function (e) {
            console.log("isAdminIn : Erreur dans la requête.");
        });
    }

    res.status(401).send({ error: true, message: "Unauthorized, authentification required and admin." });
}