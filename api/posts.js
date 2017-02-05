const { send, json } = require('micro');
const HttpHash = require('http-hash');
const DatabaseStub = require('./test/stub/db');
let Database = require('../database');

const hash = HttpHash();

if (process.env.NODE_ENV === 'test') Database = DatabaseStub;

hash.set('POST /save', async (req, res) => {
  const post = await json(req);
  const created = await Database.savePost(post);
  send(res, 201, created);
});

hash.set('GET /list', async (req, res) => {
  const posts = await Database.listPosts();
  send(res, 200, posts);
});

hash.set('GET /list/:userId', async (req, res, params) => {
  const id = params.userId;
  const posts = await Database.listPostsByUser(id);
  send(res, 200, posts);
});


hash.set('GET /:id', async (req, res, params) => {
  const id = params.id;
  const post = await Database.getPostById(id);
  send(res, 200, post);
});

hash.set('DELETE /:id', async (req, res, params) => {
  const id = params.id;
  const post = await Database.deletePost(id);
  send(res, 200, post);
});

async function main(req, res) {
  const { method, url } = req;
  const route = hash.get(`${method.toUpperCase()} ${url}`);

  if (route.handler) {
    try {
      await route.handler(req, res, route.params);
    } catch (e) {
      send(res, 500, { err: e.message });
    }
  } else {
    send(res, 404, { err: 'route not found' })
  }
}

module.exports = main;
