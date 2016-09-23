var FlatColors = require("flat-colors");
var fs         = require("fs");

var loremIpsum = require('lorem-ipsum');
var generator = require('generate-password');
var generateName = require('sillyname');
var validator = require('validator');

module.exports = {

    // POST /api/generate/lorem
    lorem: function(req, res, next)
    {
        var count = req.body.count;

        output = loremIpsum({
            count: count,
            units: 'word',
            format: 'plain',
            random: Math.random
        });

        res.status(200).json({"error" : false, "data" : output });
    },

    // POST /api/generate/password
    password: function (req, res, next) {
        var count = req.body.count; // int
        var numbers = req.body.numbers; // bool
        var symbols = req.body.symbols; // bool
        var uppercase = req.body.uppercase; //bool

        var password = generator.generate({
            length: count,
            numbers: numbers,
            symbols: symbols,
            uppercase: uppercase
        });

        res.status(200).json({"error" : false, "data" : password });
    },

    // POST /api/generate/username
    username: function (req, res, next) {
        var sillyName = [];
        var count = req.body.count;

        for (var i = 0; i < count; i++)
            sillyName[i] = generateName();

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