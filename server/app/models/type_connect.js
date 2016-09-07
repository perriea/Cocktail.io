var db = require('../../config/db');

var sequelize = db.sequelize,
access = db.access;

var Type_connect = access.define('c_type_connect', {
	type: {
      	type: access.Sequelize.STRING(50),
      	allowNull: false
  	}
}, { timestamps: false });

module.exports = Type_connect;