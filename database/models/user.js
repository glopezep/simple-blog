"use strict"

const sequelize = require("sequelize")

let user = sequelize.define("user", {
	username: {
		type: sequelize.STRING
	},
	password: {
		type: sequelize.STRING
	}
} )
