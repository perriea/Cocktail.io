var cdnjs = require('cdnjs');
var util  = require('util');

module.exports = {

    // GET /api/cdnjs/search/{name}
    cdnjs: function (req, res, next) {
        var name = req.params.name;

        var output = cdnjs.search(name, function (err, packages) {
            console.log(util.inspect(packages, {
                depth: null,
                colors: false
            }));
        });

        res.json({"error": false, "data": output});
    },
};
