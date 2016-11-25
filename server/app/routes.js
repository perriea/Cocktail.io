var sequelize = require('sequelize');
var bcrypt = require('bcrypt');

var MUsers  = require("./models/users");
var Generate = require("./controllers/generate");
var Pref = require("./controllers/preferences");
var Template = require("./controllers/template");

var Middleware = require("./middleware");

module.exports = function(app, passport, middleware) {

	app.get('/api/generate/lorem', Generate.lorem);

    app.get('/api/generate/password', Generate.password);

    app.get('/api/generate/username', Generate.username);

    app.post('/api/generate/video', Generate.video);

    app.get('/api/generate/shapes', Generate.shapes);

    app.get('/api/template/search', Template.search);

    app.get('/api/generate/gradients', Generate.gradients);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    app.get('/api/profile', Middleware.isLoggedIn, function(req, res) {
        res.status(200).json({"error" : true, "data" : req.user });
    });

    app.get('/api/preferences', Middleware.isLoggedIn, Pref.read);
    app.post('/api/preferences', Pref.write);

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
    /*app.post('/api/auth/login', passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect : '/login',
        failureFlash : true
    }));*/
    app.post('/api/auth/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info)
        {
            if (err)
                return res.status(500).json({ error: true, message: "Une erreur est survenue !" });
            if (user)
            {
                req.session.id = user.dataValues.id;
                req.session.email = user.dataValues.email;

                return res.status(200).json({ error: false, message: info.message });
            }

            return res.status(500).json({ error: true, message: info.message });

        })(req, res, next);
    });


    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.post('/api/auth/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info)
        {
            if (err)
                return res.status(500).json({ error: true, message: "Une erreur est survenue !" });
            if (!user)
                return res.status(201).json({ error: false, message: info.message });
            req.logIn(user, function(err) {
                if (err)
                    return res.status(500).json({ error: true, message: "Une erreur est survenue !" });
                return res.status(500).json({ error: true, message: "Une erreur est survenue !" });
            });
        })(req, res, next);
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
    app.get('/api/auth/logout', function(req, res) {
        req.logout();
        res.status(200).json({ error: false, message: "Session terminée !" });
    });



    // All routes not found => 404
    app.get('*', function(req, res) {
        res.json({ "error" : true, "status" : 404 });
    });

};