const co = require('co');
const Promise = require('bluebird');
const sequelize = require('./sequelize');
const models = require('../models');

class Database {
  static saveUser(user, callback) {
    const task = co.wrap(function* () {
      try {
        const created = yield models.User.create(user);
        return Promise.resolve(created);
      } catch (e) {
        return Promise.reject(e);
      }
    });
    return Promise.resolve(task()).asCallback(callback);
  }

  static getUserById(id, callback) {
    const task = co.wrap(function* () {
      try {
        const result = yield models.User.findOne({
          where: { id },
        });
        return Promise.resolve(result);
      } catch (e) {
        return Promise.reject(e);
      }
    });
    return Promise.resolve(task()).asCallback(callback);
  }

  static getUserByUsername(username, callback) {
    const task = co.wrap(function* () {
      try {
        const result = yield models.User.findOne({
          where: { username },
        });
        return Promise.resolve(result);
      } catch (e) {
        return Promise.reject(e);
      }
    });
    return Promise.resolve(task()).asCallback(callback);
  }

  static deleteUser(id, callback) {
    const getUserById = this.getUserById.bind(this);

    const task = co.wrap(function* () {
      try {
        const result = yield getUserById(id);
        const deleted = result.toJSON();

        yield result.destroy();

        return Promise.resolve(deleted);
      } catch (e) {
        return Promise.reject(e);
      }
    });
    return Promise.resolve(task()).asCallback(callback);
  }

  static savePost(post, callback) {
    const task = co.wrap(function* () {
      try {
        const created = yield models.Post.create(post);
        return Promise.resolve(created);
      } catch (e) {
        return Promise.reject(e);
      }
    });
    return Promise.resolve(task()).asCallback(callback);
  }

  static getPostById(id, callback) {
    const task = co.wrap(function* () {
      try {
        const result = yield models.Post.findOne({
          where: { id },
          include: [
            { model: models.User },
          ],
        });
        return Promise.resolve(result);
      } catch (e) {
        return Promise.reject(e);
      }
    });
    return Promise.resolve(task()).asCallback(callback);
  }

  static listPosts(callback) {
    const task = co.wrap(function* () {
      try {
        const result = yield models.Post.findAll({
          include: [
            { model: models.User },
          ],
        });
        return Promise.resolve(result);
      } catch (e) {
        return Promise.reject(e);
      }
    });
    return Promise.resolve(task()).asCallback(callback);
  }

  static listPostsByUser(id, callback) {
    const task = co.wrap(function* () {
      try {
        const result = yield models.Post.findAll({
          where: { userId: id },
          include: [
            { model: models.User },
          ],
        });
        return Promise.resolve(result);
      } catch (e) {
        return Promise.reject(e);
      }
    });
    return Promise.resolve(task()).asCallback(callback);
  }

  static setup(callback) {
    const task = co.wrap(function* () {
      try {
        yield sequelize.sync();
        return Promise.resolve('Setup completed');
      } catch (e) {
        return Promise.reject(e);
      }
    });
    return Promise.resolve(task()).asCallback(callback);
  }

  static dropTables(callback) {
    const task = co.wrap(function* () {
      try {
        yield sequelize.drop();
        return Promise.resolve('Drop tables completed');
      } catch (e) {
        return Promise.reject(e);
      }
    });
    return Promise.resolve(task()).asCallback(callback);
  }
}

module.exports = Database;
