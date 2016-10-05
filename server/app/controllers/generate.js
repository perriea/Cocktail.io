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
    },

    // GET /api/generate/password
    password: function (req, res) {
        var count = req.query.count; // int
        var numbers = false;
        var symbols = false;
        var uppercase = false;

        if (typeof req.query.numbers !== 'undefined' && req.query.numbers == 1)
            numbers = true;

        if (typeof req.query.symbols !== 'undefined' && req.query.symbols == 1)
            symbols = true;

        if (typeof req.query.uppercase !== 'undefined' && req.query.uppercase == 1)
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

        for (var i = 0; i < count; i++)
        {
            strings = "";

            strings = generateName();
            output = strings.split(' ');
            sillyName[i] = output[0];
        }

        res.status(200).json({"error" : false, "data" : sillyName });
    },

    // POST /api/generate/video
    video: function (req, res) {
        var autoplay = req.body.autoplay;
        var height = req.body.height;
        var width = req.body.width;
        var src = req.body.src;
        var autoplay_string = "";
        var html = "";

        if (typeof height !== 'undefined' && typeof width !== 'undefined'
            && typeof autoplay !== 'undefined')
        {
            if (validator.isInt(height) && validator.isInt(width)
                && validator.isBoolean(autoplay))
            {
                if (typeof height !== 'undefined')
                    autoplay_string = " autoplay";

                if (!src)
                    src = "http://mazwai.com/system/posts/videos/000/000/220/preview_mp4_3/the_valley-graham_uheslki.mp4";

                html = "<video src='" + src + "' width='" + width + "' height='" + height + "' controls" + autoplay_string + ">";

                res.status(200).json({"error" : false, "data" : html });
            }
            else
                res.status(400).json({"error" : true, "data" : false });
        }
        else
            res.status(400).json({"error" : true, "data" : false });

    },

};