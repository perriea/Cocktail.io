var request = require('request');
var validator = require('validator');

module.exports = {

    // GET /api/template/search
    search: function(req, res)
    {
        var library = req.query.library;
        var version = req.query.version;
        var file_type_min = req.query.min;

        var data_out = [];
        var last = null;
        var url = "https://cdn.jsdelivr.net/";
        var filename = null;
        var file_type = null;
        var file_test_min = false;
        var u = 0;

        // on verifie que le parametre est bien rempli
        if (typeof library !== 'undefined')
        {
            // on requete l'API externe
            request('http://api.jsdelivr.com/v1/jsdelivr/libraries/' + library, function (error, response, body) {
                console.log(error);
                if (!error && response.statusCode == 200)
                {
                    var output = JSON.parse(body);
                    filename = output[0].mainfile;

                    // on regarde si une version est demandeé pour le user
                    // sinon on prend la derniere par defaut
                    if (typeof version !== 'undefined')
                        last = version;
                    else
                        last = output[0].lastversion;

                    // on recherche la version demandée
                    for (var i = 0; i < output[0].assets.length; i++)
                    {
                        if (last == output[0].assets[i].version)
                        {
                            // on regarde les elements un par un
                            // on recupere leur type
                            for (var k = 0; k < output[0].assets[i].files.length; k++)
                            {
                                file_type = (output[0].assets[i].files[k]).match(/\.[0-9a-z]+$/i);

                                // on regarde si l'utilisateur demande des fichiers minimisés
                                // ou non
                                // s'il ne precise pas on affiche les deux
                                if (typeof file_type_min !== 'undefined' && file_type_min == true)
                                {
                                    // les fichiers min consernent seulement les fichier JS, CSS et MAP
                                    if (file_type == ".js" || file_type == ".css" || file_type == ".map")
                                    {
                                        if ((/\.(min.js|min.css|min.map)$/i).test(output[0].assets[i].files[k]))
                                        {
                                            data_out[u] = [
                                                file_type[0].substring(1),
                                                url + library + "/" + last + "/" + output[0].assets[i].files[k]
                                            ];

                                            u++;
                                        }
                                    }
                                    // les autres on les affiche
                                    else
                                    {
                                        data_out[u] = [
                                            file_type[0].substring(1),
                                            url + library + "/" + last + "/" + output[0].assets[i].files[k]
                                        ];

                                        u++;
                                    }

                                }
                                else if (typeof file_type_min !== 'undefined' && file_type_min == false)
                                {
                                    //console.log("toto");
                                    if (file_type == ".js" || file_type == ".css" || file_type == ".map")
                                    {
                                        //console.log(output[0].assets[i].files[k]);
                                        //console.log((/\(^[^.]+$|\.(?!(min.js|min.css|min.map)$)([^.]+$)/i).test(output[0].assets[i].files[k]));
                                        console.log((/\.(min.js|min.css|min.map)$/i).test(output[0].assets[i].files[k]));
                                        if (!(/\.(min.js|min.css|min.map)$/i).test(output[0].assets[i].files[k]))
                                        {
                                            data_out[u] = [
                                                file_type[0].substring(1),
                                                url + library + "/" + last + "/" + output[0].assets[i].files[k]
                                            ];

                                            u++;
                                        }
                                    }
                                    else
                                    {
                                        data_out[u] = [
                                            file_type[0].substring(1),
                                            url + library + "/" + last + "/" + output[0].assets[i].files[k]
                                        ];

                                        u++;
                                    }
                                }
                                else
                                {
                                    data_out[u] = [
                                        file_type[0].substring(1),
                                        url + library + "/" + last + "/" + output[0].assets[i].files[k]
                                    ];

                                    u++;
                                }

                                file_type = null;
                                file_test_min = false;

                            }
                        }

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