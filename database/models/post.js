const Sequelize = require('sequelize');
const sequelize = require('../lib/sequelize');

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.CHAR(36),
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  userId: {
    type: Sequelize.CHAR(36),
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      fields: ['userId'],
    },
  ],
});

module.exports = Post;
