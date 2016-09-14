// chiffrement mot de passe
var sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var salt   = bcrypt.genSaltSync(10);

var MUsers  = require("./models/users");
var Generate = require("./controllers/generate");

module.exports = function(app, passport) {

    /**
     * @api {post} /api/generate/lorem Génération de lorem Ipsum
     * @apiVersion 1.0.0
     * @apiName GetGenerateLorem
     * @apiGroup Generation
     * @apiPermission none
     * @apiSampleRequest http://localhost:3000/api/generate/lorem
     *
     * @apiParam {Number} count Nombre de mots à générer.
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "count": 20
     *     }
     *
     * @apiSuccess {Boolean} error         Déclarer si une erreur est arrivée en cours d'execution.
     * @apiSuccess {Object}  data          Données générées
     * @apiSuccess {String}  data.word   Mots générés.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "error": false,
     *       "data": "proident do tempor amet nostrud ad nisi Lorem esse pariatur"
     *     }
     *
     */
	app.post('/api/generate/lorem', Generate.lorem);

    /**
     * @api {post} /api/generate/password Génération de mot de passe
     * @apiVersion 1.0.0
     * @apiName GetGeneratePassword
     * @apiGroup Generation
     * @apiPermission none
     * @apiSampleRequest http://localhost:3000/api/generate/password
     *
     * @apiParam {Number} count Nombre de caractères a générer.
     * @apiParam {Boolean} numbers Intégration des nombres.
     * @apiParam {Boolean} symbols Intégration des symboles.
     * @apiParam {Boolean} uppercase Intégration des majuscules.
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "count": 20,
     *       "numbers": true,
     *       "symbols": false,
     *       "uppercase": true
     *     }
     *
     * @apiSuccess {Boolean} error         Déclarer si une erreur est arrivée en cours d'execution.
     * @apiSuccess {Object}  data          Données générées
     * @apiSuccess {String}  data.word   Password généré.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "error": false,
     *       "data": "proident do tempor amet nostrud ad nisi Lorem esse pariatur"
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    app.post('/api/generate/password', Generate.password);

    /**
     * @api {post} /api/generate/username Génération des pseudos
     * @apiVersion 1.0.0
     * @apiName GetGenerateUsername
     * @apiGroup Generation
     * @apiPermission none
     * @apiSampleRequest http://localhost:3000/api/generate/password
     *
     * @apiParam {Number} count Nombre de caractères a générer.
     * @apiParam {Boolean} numbers Intégration des nombres.
     * @apiParam {Boolean} symbols Intégration des symboles.
     * @apiParam {Boolean} uppercase Intégration des majuscules.
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "count": 20,
     *       "numbers": true,
     *       "symbols": false,
     *       "uppercase": true
     *     }
     *
     * @apiSuccess {Boolean} error         Déclarer si une erreur est arrivée en cours d'execution.
     * @apiSuccess {Object}  data          Données générées
     * @apiSuccess {String}  data.word   Password généré.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "error": false,
     *       "data": "proident do tempor amet nostrud ad nisi Lorem esse pariatur"
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    app.post('/api/generate/username', Generate.username);

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