var request = require('request');
var validator = require('validator');

module.exports = {

    // GET /api/template/search
    search: function(req, res)
    {
        var library = req.query.library;
        var version = req.query.version;
        var data_out = null;
        var last = null;
        var url = "https://cdn.jsdelivr.net/";
        var filename = null;

        if (typeof library !== 'undefined')
        {
            request('http://api.jsdelivr.com/v1/jsdelivr/libraries/' + library, function (error, response, body) {
                if (!error && response.statusCode == 200)
                {
                    var output = JSON.parse(body);
                    filename = output[0].mainfile;
                    if (typeof version !== 'undefined')
                        last = version;
                    else
                        last = output[0].lastversion;

                    for (var i = 0; i < output[0].assets.length; i++)
                    {
                        if (last == output[0].assets[i].version)
                            data_out = url + library + "/" + last + "/" + filename;
                    }

                    if (data_out != null)
                        res.status(200).send({"error" : false, "data" : data_out });
                    else
                        res.status(404).send({"error" : true, "data" : "", "message": "Package non trouvé !" });
                }
                else
                    res.status(500).send({ "error" : true, "data" : [], "message": "Erreur pendant la recherche" });
            });

        }
        else
            res.status(400).send({"error" : true, "data" : [], "message": "Il manque un paramètre" });
    }
};