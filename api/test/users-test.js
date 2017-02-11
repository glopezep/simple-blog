import 'babel-register'; // eslint-disable-line
import test from 'ava'; // eslint-disable-line
import micro from 'micro';
import listen from 'test-listen'; // eslint-disable-line
import request from 'request-promise-native';
import users from '../users';
import fixtures from './fixtures';

test.beforeEach(async (t) => {
  const srv = micro(users);
  t.context.url = await listen(srv); // eslint-disable-line
});

test('POST /save', async (t) => {
  const user = fixtures.getUser();
  const url = t.context.url;

  const options = {
    method: 'POST',
    uri: url,
    body: user,
    json: true,
    resolveWithFullResponse: true,
  };

  const response = await request(options);

  delete user.password;

  t.is(response.statusCode, 201);
  t.deepEqual(response.body, user);
});

test('GET /:id', async (t) => {
  const user = fixtures.getUser();
  const url = t.context.url;

  const options = {
    method: 'GET',
    uri: `${url}/${user.id}`,
    json: true,
    resolveWithFullResponse: true,
  };

  const response = await request(options);

  delete user.password;

  t.is(response.statusCode, 200);
  t.deepEqual(response.body.id, user.id);
});

test('GET /search/:username', async (t) => {
  const user = fixtures.getUser();
  const url = t.context.url;

  const options = {
    method: 'GET',
    uri: `${url}/search/${user.username}`,
    json: true,
    resolveWithFullResponse: true,
  };

  const response = await request(options);

  delete user.password;

  t.is(response.statusCode, 200);
  t.deepEqual(response.body.username, user.username);
});

test('DELETE /:id', async (t) => {
  const user = fixtures.getUser();
  const url = t.context.url;

  const options = {
    method: 'DELETE',
    uri: `${url}/${user.id}`,
    json: true,
    resolveWithFullResponse: true,
  };

  const response = await request(options);

  delete user.password;

  t.is(response.statusCode, 200);
  t.deepEqual(response.body.id, user.id);
});
