var MUsers = require('../models/users');
var MPref = require('../models/preferences');

module.exports = {

    // GET /api/preferences
    read: function(req, res)
    {
        var page = req.query.page;

        MUsers.Pref.find({ where: { user_id: req.user.id, page: page }}).then(function(pref)
        {
            res.status(200).json({"error" : true, "data" : pref, "message" : null });

        }).catch(function(e) {
            res.status(500).json({"error" : true, "data" : [], "message" : "Erreur dans la recherche des préférences." });
        });
    },

    // POST /api/preferences
    write: function(req, res)
    {
        var options = req.body.options;
        var page = req.query.page;

        if (typeof page !== 'undefined' && typeof options !== 'undefined')
        {
            MUsers.Pref.find({ where: { user_id: req.user.id, page: page }}).then(function(pref)
            {
                pref.update({
                    options: options
                }).then(function (result) {
                    res.status(200).json({"error" : false, "data" : [], "message" : "Sauvegardé !" });

                }).catch(function (e) {
                    res.status(200).json({"error" : true, "data" : [], "message" : "Error" });
                });

            }).catch(function(e) {
                res.status(500).json({"error" : true, "data" : [], "message" : "Erreur dans la recherche des préférences." });
            });
        }
        else
            res.status(200).json({"error" : true, "data" : [], "message" : "pas d'options" });
    }
};