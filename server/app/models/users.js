var db = require('../../config/db');
var Type_connect = require('./type_connect');
var Role = require('./role');
var Page = require('./page');
var Pref = require('./preferences');

var bcrypt = require('bcrypt');

var sequelize = db.sequelize,
access = db.access;

var methods = { generateHash: null, validPassword: null }; 

var TUsers = access.define('c_users', {

    authenticate_id: {
        type: access.Sequelize.INTEGER(1),
        allowNull: false,
    },
    role_id: {
        type: access.Sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: 4,
    },
  	email: {
      	type: access.Sequelize.STRING(200),
      	allowNull: false,
      	unique: true,
        validate: {
            isEmail: true
        }
  	},
  	password: {
      	type: access.Sequelize.STRING(255),
      	allowNull: true
  	}
}, { timestamps: false });

// methods ======================
// generating a hash
methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
methods.validPassword = function(password, user) {
	return bcrypt.compareSync(password, user.password, null);
};

Role.hasOne(TUsers, { foreignKey : 'role_id', onDelete: 'NO ACTION' });
Type_connect.hasOne(TUsers, { foreignKey : 'authenticate_id', onDelete: 'NO ACTION' });
//Pref.hasMany(TUsers, { foreignKey: "user_id" });
Page.hasOne(Pref, { foreignKey: 'page_id', onDelete: 'NO ACTION'});


Type_connect.sync();
Role.sync();
Page.sync();
Pref.sync();
TUsers.sync();

module.exports = { TUsers, Pref, Type_connect, Role, Page, methods };