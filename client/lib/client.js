const Promise = require('bluebird');
const request = require('request-promise-native');

const defaults = {
  endpoints: {
    users: 'http://api.simpleblog.com/user',
    posts: 'http://api.simpleblog.com/post',
  },
};

class Client {
  constructor(options = defaults) {
    this.options = options;
  }

  saveUser(user, callback) {
    const options = {
      method: 'POST',
      uri: this.options.endpoints.users,
      body: user,
      json: true,
    };
    return Promise.resolve(request(options)).asCallback(callback);
  }

  getUserById(id, callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/${id}`,
      json: true,
    };
    return Promise.resolve(request(options)).asCallback(callback);
  }

  getUserByUsername(username, callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/search/${username}`,
      json: true,
    };
    return Promise.resolve(request(options)).asCallback(callback);
  }

  deleteUser(id, callback) {
    const options = {
      method: 'DELETE',
      uri: `${this.options.endpoints.users}/${id}`,
      json: true,
    };
    return Promise.resolve(request(options)).asCallback(callback);
  }

  savePost() {
    return this.options;
  }

  getPostById() {
    return this.options;
  }

  listPosts() {
    return this.options;
  }

  listPostsByUser() {
    return this.options;
  }

  deletePostById() {
    return this.options;
  }
}

module.exports = Client;
