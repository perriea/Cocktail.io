var sequelize = require('sequelize');
var bcrypt = require('bcrypt');

var MUsers  = require("./models/users");
var Generate = require("./controllers/generate");

var Middleware = require("./middleware");

module.exports = function(app, passport, middleware) {

    /**
     * @api {get} /api/generate/lorem Génération de lorem Ipsum
     * @apiVersion 1.0.0
     * @apiName GetGenerateLorem
     * @apiGroup Generation
     * @apiPermission none
     * @apiSampleRequest http://localhost:3000/api/generate/lorem
     *
     * @apiParam {Number} count Nombre de mots à générer.
     * @apiParam {String} paragraphs Nombre de paragraphes.
     *
     * @apiSuccess {Boolean} error         Déclarer si une erreur est arrivée en cours d'execution.
     * @apiSuccess {Object}  data          Données générées
     * @apiSuccess {String}  data.word     String generee
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "error": false,
     *       "data": "<p>proident do tempor amet nostrud ad nisi Lorem esse pariatur.</p>"
     *     }
     *
     */
	app.get('/api/generate/lorem', Generate.lorem);

    /**
     * @api {get} /api/generate/password Génération de mot de passe
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
     */
    app.get('/api/generate/password', Generate.password);

    /**
     * @api {get} /api/generate/username Génération des pseudos
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
     */
    app.get('/api/generate/username', Generate.username);

    /**
     * @api {post} /api/generate/video Génération un lien video
     * @apiVersion 1.0.0
     * @apiName GetGenerateVideo
     * @apiGroup Generation
     * @apiPermission none
     * @apiSampleRequest http://localhost:3000/api/generate/video
     *
     * @apiParam {Boolean} autoplay Ajout de l'option autoplay, obligatoire.
     * @apiParam {Number} height Ajout de la hauteur, obligatoire.
     * @apiParam {Number} width Ajout de la largeur, obligatoire.
     * @apiParam {String} src Liens vers la video, facultatif.
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "autoplay": true,
     *       "height": 400,
     *       "width": 600,
     *       "src": "http://mazwai.com/system/posts/videos/000/000/220/preview_mp4_3/the_valley-graham_uheslki.mp4"
     *     }
     *
     * @apiSuccess {Boolean} error         Déclarer si une erreur est arrivée en cours d'execution.
     * @apiSuccess {Object}  data          HTML généré.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "error":false,
     *      "data":"<video src='http://mazwai.com/system/posts/videos/000/000/220/preview_mp4_3/the_valley-graham_uheslki.mp4' width='300' height='400' controls autoplay>"
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "error":true,
     *       "data":false
     *     }
     */
    app.post('/api/generate/video', Generate.video);


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
    app.post('/api/auth/login', passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect : '/login',
        failureFlash : true
    }));


    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.post('/api/auth/local', passport.authenticate('local-signup', {
        successRedirect : '/profile', 
        failureRedirect : '/signup',
        failureFlash : true
    }));


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    app.get('/api/profile', Middleware.isLoggedIn, function(req, res) {
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
        res.redirect('/');
    });


    app.get('/api/admin', Middleware.isAdminIn, function(req, res) {
        res.json({"error" : false, "session" : req.session.passport });
    });


    // All routes not found => 404
    app.get('*', function(req, res) {
        res.json({ "error" : true, "status" : 404 });
    });

};