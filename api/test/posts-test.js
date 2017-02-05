import 'babel-register';
import test from 'ava';
import micro from 'micro';
import listen from 'test-listen';
import request from 'request-promise-native';
import posts from '../posts';
import fixtures from './fixtures';

test.beforeEach(async (t) => {
  const srv = micro(posts);
  t.context.url = await listen(srv); // eslint-disable-line
});

test('POST /save', async (t) => {
  const post = fixtures.getPost();
  const url = t.context.url;
  const options = {
    method: 'POST',
    uri: `${url}/save`,
    body: post,
    json: true,
    resolveWithFullResponse: true,
  };

  const response = await request(options);

  t.is(response.statusCode, 201);
  t.deepEqual(response.body, post);
});

test('GET /list', async (t) => {
  const postsFixture = fixtures.getPosts();
  const url = t.context.url;
  const options = {
    method: 'GET',
    uri: `${url}/list`,
    json: true,
    resolveWithFullResponse: true,
  };

  const response = await request(options);

  t.is(response.statusCode, 200);
  t.deepEqual(response.body.length, postsFixture.length);
});

test('GET /list/:id', async (t) => {
  const user = fixtures.getUser();
  const url = t.context.url;
  const options = {
    method: 'GET',
    uri: `${url}/list/${user.id}`,
    json: true,
    resolveWithFullResponse: true,
  };

  const response = await request(options);

  t.is(response.statusCode, 200);
  t.truthy(response.body.length);
});

test('GET /:id', async (t) => {
  const post = fixtures.getPost();
  const url = t.context.url;
  const options = {
    method: 'GET',
    uri: `${url}/${post.id}`,
    json: true,
    resolveWithFullResponse: true,
  };

  const response = await request(options);

  t.is(response.statusCode, 200);
  t.deepEqual(response.body.id, post.id);
});

test('DELETE /:id', async (t) => {
  const post = fixtures.getPost();
  const url = t.context.url;
  const options = {
    method: 'DELETE',
    uri: `${url}/${post.id}`,
    json: true,
    resolveWithFullResponse: true,
  };

  const response = await request(options);

  t.is(response.statusCode, 200);
  t.deepEqual(response.body.id, post.id);
});
