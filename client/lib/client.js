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

  savePost(post, callback) {
    const options = {
      method: 'POST',
      uri: this.options.endpoints.posts,
      body: post,
      json: true,
    };
    return Promise.resolve(request(options)).asCallback(callback);
  }

  getPostById(id, callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.posts}/${id}`,
      json: true,
    };
    return Promise.resolve(request(options)).asCallback(callback);
  }

  listPosts(callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.posts}/list`,
      json: true,
    };
    return Promise.resolve(request(options)).asCallback(callback);
  }

  listPostsByUser(id, callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.posts}/list/${id}`,
      json: true,
    };
    return Promise.resolve(request(options)).asCallback(callback);
  }

  deletePostById(id, callback) {
    const options = {
      method: 'DELETE',
      uri: `${this.options.endpoints.posts}/${id}`,
      json: true,
    };
    return Promise.resolve(request(options)).asCallback(callback);
  }
}

module.exports = Client;
