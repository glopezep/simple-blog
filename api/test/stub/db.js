const fixtures = require('../fixtures');

class Database {
  static saveUser(user) {
    return Promise.resolve(user);
  }

  static getUserById(id) {
    const user = fixtures.getUser();
    user.id = id;
    return Promise.resolve(user);
  }

  static getUserByUsername(username) {
    const user = fixtures.getUser();
    user.username = username;
    return Promise.resolve(user);
  }

  static deleteUser(id) {
    const user = fixtures.getUser();
    user.id = id;
    return Promise.resolve(user);
  }

  static savePost(post) {
    return Promise.resolve(post);
  }

  static getPostById(id) {
    const post = fixtures.getPost();
    post.id = id;
    return Promise.resolve(post);
  }

  static listPosts() {
    const posts = fixtures.getPosts();
    return Promise.resolve(posts);
  }

  static listPostsByUser(id) {
    const posts = fixtures.getPosts();
    return Promise.resolve(posts);
  }

  static deletePost(id) {
    const post = fixtures.getPost();
    post.id = id;
    return Promise.resolve(post);
  }
}

module.exports = Database;
