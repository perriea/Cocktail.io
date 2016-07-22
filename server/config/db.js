// config/database.js
var Sequelize = require('sequelize');

var sequelize = new Sequelize('cocktail_io', 'root', '', { 
	host: 'localhost', 
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