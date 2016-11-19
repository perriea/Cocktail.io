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

        if ((typeof req.query.count !== 'undefined' && validator.isInt(count, { min: 0, max: 25000 })) &&
            (typeof req.query.paragraphs !== 'undefined' && validator.isInt(paragraphs, { min: 0, max: 25 })))
        {
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

            res.status(200).json({"error" : false, "data" : output });
        }
        else
            res.status(200).json({"error" : true, "data" : [] });
    },

    // GET /api/generate/password
    password: function (req, res) {
        var numbers = false;
        var symbols = false;
        var uppercase = false;

        if ((typeof req.query.count !== 'undefined' && validator.isInt(req.query.count, { min: 1, max: 200 })))
            count = req.query.count;
        else
            count = 10;

        if ((typeof req.query.numbers !== 'undefined' && validator.isBoolean(req.query.numbers)) && req.query.numbers == 1)
            numbers = true;

        if ((typeof req.query.symbols !== 'undefined' && validator.isBoolean(req.query.symbols)) && req.query.symbols == 1)
            symbols = true;

        if ((typeof req.query.uppercase !== 'undefined' && validator.isBoolean(req.query.uppercase)) && req.query.uppercase == 1)
            uppercase = true;

        var password = generator.generate({
            length: count,
            numbers: numbers,
            symbols: symbols,
            uppercase: uppercase
        });

        res.status(200).json({"error" : false, "data" : password });
    },

    // GET /api/generate/username
    username: function (req, res) {
        var sillyName = [];
        var count = req.query.count;
        var strings = "";
        var output = [];

        if (validator.isInt(count, { min: 1, max: 100 }))
        {
            for (var i = 0; i < count; i++)
            {
                strings = "";

                strings = generateName();
                output = strings.split(' ');
                sillyName[i] = output[0];
            }

            res.status(200).json({"error" : false, "data" : sillyName });
        }
        else
            res.status(200).json({"error" : true, "data" : [], "message" : "Nombre trop grand ou trop petit" });
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

        if (typeof height !== 'undefined' && typeof width !== 'undefined')
        {
            if ((validator.isInt(height) && height > 0) && (validator.isInt(width) && width > 0)
                && validator.isURL(src))
            {
                if (typeof autoplay !== 'undefined' && autoplay == 'true')
                    option_string = option_string + " autoplay";

                if (typeof loop !== 'undefined' && loop == 'true')
                    option_string = option_string + " loop";

                if (typeof controls !== 'undefined' && controls == 'true')
                    option_string = option_string + " controls";

                if (typeof muted !== 'undefined' && muted == 'true')
                    option_string = option_string + " muted";

                if (!src)
                    src = "http://mazwai.com/system/posts/videos/000/000/220/preview_mp4_3/the_valley-graham_uheslki.mp4";

                html = "<video src='" + src + "' width='" + width + "' height='" + height + "'" + option_string + ">";

                res.status(200).json({"error" : false, "data" : html });
            }
            else
                res.status(400).json({"error" : true, "data" : false });
        }
        else
            res.status(400).json({"error" : true, "data" : false });

    },

};