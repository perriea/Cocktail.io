var loremIpsum = require('lorem-ipsum');
var generator = require('generate-password');
var generateName = require('sillyname');
var validator = require('validator');

module.exports = {

    // GET /api/generate/lorem
    lorem: function(req, res)
    {
        var count = req.query.count;
        var paragraphs = req.query.paragraphs;
        var output = [];

        // on verifie que les parametres obligatoire sont rempli
        // et dans un interval
        if ((typeof req.query.count !== 'undefined' && validator.isInt(count, { min: 1, max: 25000 })) &&
            (typeof req.query.paragraphs !== 'undefined' && validator.isInt(paragraphs, { min: 1, max: 25 })))
        {
            // on cree les paragraphe avec le nombre de mots indiqués
            for (var i = 0; i < paragraphs; i++)
            {
                var lorem = loremIpsum({
                    count: count,
                    units: 'words',
                    format: 'html',
                    random: Math.random
                });

                output += "<p>" + lorem + "</p>";
            }

            res.status(200).send({"error" : false, "data" : output });
        }
        else
            res.status(400).json({"error" : true, "data" : [] });
    },

    // GET /api/generate/password
    password: function (req, res) {
        var numbers = false;
        var symbols = false;
        var uppercase = false;
        var count = 0;

        // on regarde les parametre et ceux qui sont activés
        if ((typeof req.query.count !== 'undefined' && validator.isInt(req.query.count, { min: 1, max: 200 })))
        {
            count = req.query.count;

            if ((typeof req.query.numbers !== 'undefined' && validator.isBoolean(req.query.numbers)) && req.query.numbers == 1)
                numbers = true;

            if ((typeof req.query.symbols !== 'undefined' && validator.isBoolean(req.query.symbols)) && req.query.symbols == 1)
                symbols = true;

            if ((typeof req.query.uppercase !== 'undefined' && validator.isBoolean(req.query.uppercase)) && req.query.uppercase == 1)
                uppercase = true;

            // on génère le mot de passe
            var password = generator.generate({
                length: count,
                numbers: numbers,
                symbols: symbols,
                uppercase: uppercase
            });

            res.status(200).json({"error" : false, "data" : password });
        }
        else
            res.status(400).json({"error" : true, "data" : [] });
    },

    // GET /api/generate/username
    username: function (req, res) {
        var sillyName = [];
        var count = req.query.count;
        var strings = "";
        var output = [];

        // on regarde s'il s'agit bien d'un nombre et dans l'interval
        if (validator.isInt(count, { min: 1, max: 100 }))
        {
            for (var i = 0; i < count; i++)
            {
                strings = "";

                // on genere le nom
                strings = generateName();
                output = strings.split(' ');
                sillyName[i] = output[0];
            }

            res.status(200).json({"error" : false, "data" : sillyName });
        }
        else
            res.status(400).json({"error" : true, "data" : [] });
    },

    // POST /api/generate/video
    video: function (req, res) {
        var autoplay = req.body.autoplay;
        var controls = req.body.controls;
        var loop = req.body.loop;
        var muted = req.body.muted;
        var height = req.body.height;
        var width = req.body.width;
        var src = req.body.src;
        var option_string = "";
        var html = "";

        // on regarde les parametres obligatoires
        if ((typeof height !== 'undefined' && validator.isInt(height, { min: 1 })) &&
            (typeof width !== 'undefined' && validator.isInt(width, { min: 1 })) && validator.isURL(src))
        {
            if (typeof autoplay !== 'undefined' && autoplay == 'true')
                option_string = option_string + " autoplay";

            if (typeof loop !== 'undefined' && loop == 'true')
                option_string = option_string + " loop";

            if (typeof controls !== 'undefined' && controls == 'true')
                option_string = option_string + " controls";

            if (typeof muted !== 'undefined' && muted == 'true')
                option_string = option_string + " muted";

            // par defaut si la chaine est vide
            if (!src)
                src = "http://mazwai.com/system/posts/videos/000/000/220/preview_mp4_3/the_valley-graham_uheslki.mp4";

            html = "<video src='" + src + "' width='" + width + "' height='" + height + "'" + option_string + ">";

            res.status(200).json({"error" : false, "data" : html });
        }
        else
            res.status(400).json({"error" : true, "data" : false });
    },

    // GET /api/generate/shapes
    shapes: function (req, res) {
        var shapes = req.query.q;
        var code = null;

        // choix parmis les formes
        switch (shapes) {
            case "square":
                code = "<style>#square { width: 100px; height: 100px; background: red; }</style><div id='square'></div>";
                break;
            case "rectangle":
                code = "<style>#rectangle { width: 200px; height: 100px; background: red; }</style><div id='rectangle'></div>";
                break;
            case "circle":
                code = "<style>#circle { width: 100px; height: 100px; background: red; -moz-border-radius: 50px; -webkit-border-radius: 50px; border-radius: 50px; }</style><div id='circle'></div>";
                break;
            case "oval":
                code = "<style>#oval { width: 200px; height: 100px; background: red; -moz-border-radius: 100px / 50px; -webkit-border-radius: 100px / 50px; border-radius: 100px / 50px; }</style><div id='oval'></div>";
                break;
            case "triangle-up":
                code = "<style>#triangle-up { width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid red; }</style><div id='triangle-up'></div>";
                break;
            case "triangle-down":
                code = "<style>#triangle-down { width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-top: 100px solid red; }</style><div id='triangle-down'></div>";
                break;
            case "triangle-left":
                code = "<style>#triangle-left { width: 0; height: 0; border-top: 50px solid transparent; border-right: 100px solid red; border-bottom: 50px solid transparent; }</style><div id='triangle-left'></div>";
                break;
            case "triangle-right":
                code = "<style>#triangle-right { width: 0; height: 0; border-top: 50px solid transparent; border-left: 100px solid red; border-bottom: 50px solid transparent; } }</style><div id='triangle-right'></div>";
                break;
            case "triangle-topleft":
                code = "<style>#triangle-topleft { width: 0; height: 0; border-top: 100px solid red; border-right: 100px solid transparent; } }</style><div id='triangle-topleft'></div>";
                break;
            case "triangle-topright":
                code = "<style>#triangle-topright { width: 0; height: 0; border-top: 100px solid red; border-left: 100px solid transparent; }</style><div id='triangle-topright'></div>";
                break;
            case "triangle-bottomleft":
                code = "<style>#triangle-bottomleft { width: 0; height: 0; border-bottom: 100px solid red; border-right: 100px solid transparent; }</style><div id='triangle-bottomleft'></div>";
                break;
            case "triangle-bottomright":
                code = "<style>#triangle-bottomright { width: 0; height: 0; border-bottom: 100px solid red; border-left: 100px solid transparent; }</style><div id='triangle-bottomright'></div>";
                break;
            default:
                code = null;
        }

        res.status(200).json({"error" : true, "data" : code });
    }

};