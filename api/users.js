const { send, json } = require('micro');
const HttpHash = require('http-hash');
const DatabaseStub = require('./test/stub/db');
let Database = require('../database');

const hash = HttpHash();

if (process.env.NODE_ENV === 'test') Database = DatabaseStub;

hash.set('POST /save', async (req, res) => {
  const user = await json(req);
  const created = await Database.saveUser(user);
  delete created.password;
  send(res, 201, created);
});

hash.set('GET /username/:username', async (req, res, params) => {
  const username = params.username;
  const user = await Database.getUserByUsername(username);
  delete user.password;
  send(res, 200, user);
});

hash.set('GET /:id', async (req, res, params) => {
  const id = params.id;
  const user = await Database.getUserById(id);
  delete user.password;
  send(res, 200, user);
});

hash.set('DELETE /:id', async (req, res, params) => {
  const id = params.id;
  const user = await Database.deleteUser(id);
  delete user.password;
  send(res, 200, user);
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
    send(res, 404, { err: 'route not found' });
  }
}

module.exports = main;
