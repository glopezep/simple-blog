const sequelize = require('./sequelize');
const co = require('co');

class Database {
  static setup() {
    co(function* () {
      try {
        yield sequelize.sync();
        return Promise.resolve('Setup completed');
      } catch (e) {
        return Promise.reject(e);
      }
    });
  }

  static dropTables() {
    co(function* () {
      try {
        yield sequelize.drop();
        return Promise.resolve('Drop tables completed');
      } catch (e) {
        return Promise.reject(e);
      }
    });
  }
}

module.exports = Database;
