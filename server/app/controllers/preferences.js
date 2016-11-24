var MUsers = require('../models/users');
var MPref = require('../models/preferences');

module.exports = {

    // GET /api/preferences
    read: function(req, res)
    {
        var page = req.query.page;

        // recherche dans la base MySQL de la preference de l'utilisateur
        MUsers.Pref.find({ where: { user_id: req.user.id, page: page }}).then(function(pref)
        {
            res.status(200).json({"error" : true, "data" : pref, "message" : null });
        }).catch(function(e) {
            res.status(400).json({"error" : true, "data" : [], "message" : "Erreur dans la recherche des préférences." });
        });
    },

    // POST /api/preferences
    write: function(req, res)
    {
        var options = req.body.options;
        var page = req.query.page;

        // on verifie si les params obligatoires sont la et rempli
        if (typeof page !== 'undefined' && typeof options !== 'undefined')
        {
            // on cherche si la preference n'existe
            MUsers.Pref.find({ where: { user_id: req.user.id, page: page }}).then(function(pref)
            {
                // on update les preferences preécedement enregistrée
                pref.update({
                    options: options
                }).then(function (result) {
                    res.status(200).json({"error" : false, "data" : [], "message" : "Sauvegardé !" });

                }).catch(function (e) {
                    res.status(500).json({"error" : true, "data" : [], "message" : "Error dans la mise à jour" });
                });

            }).catch(function(e)
            {
                // on cree la preference elle n'existe pas
                MUsers.Pref.create({ user_id: req.user.id, page: page, options: options }).then(function(result)
                {
                    res.status(201).json({"error" : false, "data" : [], "message" : "Préference sauvegardé !" });
                }).catch(function(e) {
                    res.status(500).json({"error" : true, "data" : [], "message" : "Erreur dans l'insertion de la preference !" });
                });
            });
        }
        else
            res.status(400).json({"error" : true, "data" : [], "message" : "Pas d'options" });
    }
};