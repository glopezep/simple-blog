const config = {
  endpoints: {
    users: 'http://api.simpleblog.com/user',
    posts: 'http://api.simpleblog.com/post',
  }
}

if (process.env.NODE_ENV === 'dev') {
  config.endpoints = {
    users: 'http://localhost:3002',
    posts: 'http://localhost:3003',
  }
}

module.exports = config;
