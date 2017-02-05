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
}

module.exports = Database;
