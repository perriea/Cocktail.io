var Couleurs   = require("couleurs");
var FlatColors = require("flat-colors");
var fs         = require("fs");

var loremIpsum = require('lorem-ipsum');
var generator = require('generate-password');

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

        res.json({"error" : false, "data" : output });
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

        res.json({"error" : false, "data" : password });
    }

};