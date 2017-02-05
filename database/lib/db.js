const co = require('co');
const Promise = require('bluebird');
const sequelize = require('./sequelize');
const models = require('../models');

class Database {
  static saveUser(user, callback) {
    const tasks = co.wrap(function* () {
      try {
        const created = yield models.User.create(user);
        return Promise.resolve(created);
      } catch (e) {
        return Promise.reject(e);
      }
    });
    return Promise.resolve(tasks()).asCallback(callback);
  }

  static savePost(post, callback) {
    const task = co.wrap(function* () {
      try {
        const createdPost = yield models.Post.create(post);
        return Promise.resolve(createdPost);
      } catch (e) {
        return Promise.reject(e);
      }
    });
    return Promise.resolve(task()).asCallback(callback);
  }

  static setup(callback) {
    co(function* () {
      try {
        yield models.User.sync();
        yield models.Post.sync();
        return Promise.resolve('Setup completed').asCallback(callback);
      } catch (e) {
        return Promise.reject(e).asCallback(callback);
      }
    });
  }

  static dropTables(callback) {
    co(function* () {
      try {
        yield sequelize.drop();
        return Promise.resolve('Drop tables completed').asCallBack(callback);
      } catch (e) {
        return Promise.reject(e).asCallBack(callback);
      }
    });
  }
}

module.exports = Database;
