const Post = require('./post');
const User = require('./user');

//  Association is established between the models
User.hasMany(Post);
Post.belongsTo(User);
//  ----------------------------------------

//  The table is created if it does not exist
Post.sync();
User.sync();
//  --------------------------------------------------
module.exports = {
  Post,
  User,
};
