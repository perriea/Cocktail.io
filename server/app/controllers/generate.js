var FlatColors = require("flat-colors");
var fs         = require("fs");

var loremIpsum = require('lorem-ipsum');
var generator = require('generate-password');
var generateName = require('sillyname');
var validator = require('validator');

module.exports = {

    // GET /api/generate/lorem
    lorem: function(req, res, next)
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
    password: function (req, res, next) {
        var count = req.query.count; // int
        var numbers = req.query.numbers; // bool
        var symbols = req.query.symbols; // bool
        var uppercase = req.query.uppercase; //bool

        var password = generator.generate({
            length: count,
            numbers: numbers,
            symbols: symbols,
            uppercase: uppercase
        });

        res.status(200).json({"error" : false, "data" : password });
    },

    // GET /api/generate/username
    username: function (req, res, next) {
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
    video: function (req, res, next) {
        var autoplay = req.body.autoplay; // bool
        var height = req.body.height; // int
        var width = req.body.width; // int
        var src = req.body.src; // string
        var autoplay_string = "";
        var html = "";

        if (typeof height !== 'undefined' && typeof width !== 'undefined'
            && typeof autoplay !== 'undefined')
        {
            console.log(autoplay);
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