'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../lib/sequelize');

const user = sequelize.define('user', {
	id: {
		type:sequelize.CHAR(36)
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4,
	},
	username: {
		type: sequelize.STRING,
    allowNull: false,
	},
	password: {
		type: sequelize.STRING,
    allowNull: false,
	}
}, {
  timestamps: true,
  paranoid: true,
});

module.exports = user;