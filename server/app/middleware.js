// =====================================
// MIDDLEWARE FUNCTIONS ================
// =====================================
module.exports = {

    // fonction de verification si le user est connecté
    isLoggedIn: function(req, res, next) 
    {
        if (req.isAuthenticated())
            return next();

        res.status(401).send({ error: true, message: "Unauthorized, authentification required" });
    },

    // fonction de verification si le user est connecté + au grade d'Admin
    isAdminIn: function(req, res, next)
    {
        if (req.isAuthenticated()) {
            MUsers.TUsers.find({where: { authenticate_type: 1, id: req.session.passport }}).then(function (user) {
                if (user)
                    return next();
            }).catch(function (e) {
                res.status(500).send({ error: true, message: "Fatal error" });
            });
        }

        res.status(401).send({ error: true, message: "Unauthorized, authentification required and admin." });
    }
};