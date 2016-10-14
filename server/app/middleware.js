// =====================================
// MIDDLEWARE FUNCTIONS ================
// =====================================

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.status(401).send({ error: true, message: "Unauthorized, authentification required" });
}

function isAdminIn(req, res, next)
{
    console.log(req.session.passport);
    if (req.isAuthenticated()) {
        MUsers.TUsers.find({where: { authenticate_type: 1, id: req.session.passport }}).then(function (user) {
            if (user)
                return next();
        }).catch(function (e) {
            console.log("isAdminIn : Erreur dans la requête.");
        });
    }

    res.status(401).send({ error: true, message: "Unauthorized, authentification required and admin." });
}