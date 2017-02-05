const Sequelize = require('sequelize');
const sequelize = require('../lib/sequelize');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.CHAR(36),
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      unique: true,
      fields: ['username'],
    },
  ],
});

User.sync();
module.exports = User;
