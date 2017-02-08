import test from 'ava'; // eslint-disable-line
import nock from 'nock';
import simpleblog from '../';
import fixtures from './fixtures';

const options = {
  endpoints: {
    users: 'http://simpleblog.test/user',
    posts: 'http://simpleblog.test/post',
  },
};

test.beforeEach((t) => {
  t.context.client = simpleblog.createClient(options); // eslint-disable-line
});

test('Client methods', (t) => {
  const client = t.context.client;

  t.is(typeof client.saveUser, 'function', 'Should be a function');
  t.is(typeof client.getUserById, 'function', 'Should be a function');
  t.is(typeof client.getUserByUsername, 'function', 'Should be a function');
  t.is(typeof client.deleteUser, 'function', 'Should be a function');
  t.is(typeof client.savePost, 'function', 'Should be a function');
  t.is(typeof client.getPostById, 'function', 'Should be a function');
  t.is(typeof client.listPosts, 'function', 'Should be a function');
  t.is(typeof client.listPostsByUser, 'function', 'Should be a function');
  t.is(typeof client.deletePostById, 'function', 'Should be a function');
});

test('Save user', async (t) => {
  const client = t.context.client;
  const user = fixtures.getUser();

  nock(options.endpoints.users)
    .post('', user)
    .reply('201', user);

  const result = await client.saveUser(user);
  t.deepEqual(result, user);
});

test('Get user by id', async (t) => {
  const client = t.context.client;
  const user = fixtures.getUser();

  nock(options.endpoints.users)
    .get(`/${user.id}`)
    .reply(200, user);

  const result = await client.getUserById(user.id);

  t.deepEqual(result, user);
});

test('Get user by username', async (t) => {
  const client = t.context.client;
  const user = fixtures.getUser();

  nock(options.endpoints.users)
    .get(`/search/${user.username}`)
    .reply(200, user);

  const result = await client.getUserByUsername(user.username);

  t.deepEqual(result, user);
});

test('Delete user', async (t) => {
  const client = t.context.client;
  const user = fixtures.getUser();

  nock(options.endpoints.users)
    .delete(`/${user.id}`)
    .reply(200, user);

  const result = await client.deleteUser(user.id);

  t.deepEqual(result, user);
});

test('Save post', async (t) => {
  const client = t.context.client;
  const post = fixtures.getPost();

  nock(options.endpoints.posts)
    .post('', post)
    .reply('201', post);

  const result = await client.savePost(post);
  t.deepEqual(result, post);
});

test('Get post by id', async (t) => {
  const client = t.context.client;
  const post = fixtures.getPost();

  nock(options.endpoints.posts)
    .get(`/${post.id}`)
    .reply(200, post);

  const result = await client.getPostById(post.id);

  t.deepEqual(result, post);
});

test('List posts', async (t) => {
  const client = t.context.client;
  const posts = fixtures.getPosts();

  nock(options.endpoints.posts)
    .get('/list')
    .reply(200, posts);

  const result = await client.listPosts();

  t.deepEqual(result, posts);
});

test('List posts by user', async (t) => {
  const client = t.context.client;
  const user = fixtures.getUser();
  const posts = fixtures.getPosts();

  nock(options.endpoints.posts)
    .get(`/list/${user.id}`)
    .reply(200, posts);

  const result = await client.listPostsByUser(user.id);

  t.deepEqual(result, posts);
});

test('Delete post', async (t) => {
  const client = t.context.client;
  const post = fixtures.getPost();

  nock(options.endpoints.posts)
    .delete(`/${post.id}`)
    .reply(200, post);

  const result = await client.deletePostById(post.id);

  t.deepEqual(result, post);
});
