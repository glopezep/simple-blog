const User = require('./user');
const Post = require('./post');

User.hasMany(Post);
Post.belongsTo(User);

module.exports = {
  User,
  Post,
};
