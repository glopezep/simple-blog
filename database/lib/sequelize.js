const Sequelize = require('sequelize');
const config = require('../config');

let { dbName } = config;
const { dbUsername, dbPassword } = config;

if (process.env.NODE_ENV === 'test') dbName = 'blog_test';

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, config.dbConfig);

module.exports = sequelize;
