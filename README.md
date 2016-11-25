# Cocktail.io

## Client 

- Avoir node.js d'installé et la commande npm d'utilisable.
- Avoir fait un checkout du projet
- Se situer dans ` /le_nom_de_votre_checkout/client `
- Lancer les commandes suivantes :
```
npm install -g npm && npm install -g bower && npm install -g gulp
npm install && bower install && gulp serve
```

Pour juste mettre à jours les packages :
```
gulp clean && rm -rf bower_components/ node_modules/ && npm install && bower install
```

## Serveur

- Avoir node.js, MySQL d'installé (MAMP || WAMP || XAMP feront l'affaire si vous êtes chaud : MariaDB ou Percona) et la commande npm d'utilisable.

- Avoir fait un checkout du projet
- Se situer dans ` /le_nom_de_votre_checkout/serveur `
- Lancer la commande suivante pour installer les dépendances :
```
npm install
```

### MySQL

Avec un client MySQL (SequelPro, MySQL WorkBench etc...), créer une base ` cocktail_io `.

Si vous avez des paramètres differents tel que un mot de passe, un utilisateur ou un port différent pour accéder à MySQL modifiez le dans fichier si dessous.
Ne pas toucher ce qu'il y a dans pool pour le moment svp.

` /le_nom_de_votre_checkout/serveur/config/db.js `
```javascript
// config/db.js
var Sequelize = require('sequelize');

var sequelize = new Sequelize('cocktail_io', 'root', '', {
	host: 'localhost',
	port: 3306,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

var db = {};
db.access = sequelize;
db.sequelize = Sequelize;

module.exports = db;
```

- Démarrer MySQL puis lancer le serveur avec la commande ` npm start `


## RAML

### Installation

Dans le terminal ou le cmd :
```
npm install raml2html -g
```

### Execution

Dans le dossier `/server/doc/`
```
raml2html api.raml > index.html
```

Cela créera un ficher ` index.html `, ouvrez le pour l'afficher sur n'importe quel navigateur Web.