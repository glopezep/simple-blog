import test from 'ava'; // eslint-disable-line
import Database from '../';
import fixtures from './fixtures';

test.before('Setup database', async () => {
  await Database.setup();
});

test.after.always('Cleanup database', async () => {
  await Database.dropTables();
});

test('Save user', async (t) => {
  t.is(typeof Database.saveUser, 'function', 'Should be a function');

  const user = fixtures.getUser();
  const created = await Database.saveUser(user);
  const result = created.toJSON();

  t.is(result.id, user.id);
  t.is(result.username, user.username);
  t.is(result.password, user.password);
});

test('Get user by id', async (t) => {
  t.is(typeof Database.getUserById, 'function', 'Should be a function');

  const user = fixtures.getUser();
  await Database.saveUser(user);
  const fetched = await Database.getUserById(user.id);
  const result = fetched.toJSON();

  t.is(result.id, user.id);
  t.is(result.username, user.username);
  t.is(result.password, user.password);
});

test('Get user by username', async (t) => {
  t.is(typeof Database.getUserById, 'function', 'Should be a function');

  const user = fixtures.getUser();
  await Database.saveUser(user);
  const fetched = await Database.getUserByUsername(user.username);
  const result = fetched.toJSON();

  t.is(result.id, user.id);
  t.is(result.username, user.username);
  t.is(result.password, user.password);
});

test('save Post', async (t) => {
  t.is(typeof Database.savePost, 'function', 'Should be a function.');

  const user = fixtures.getUser();
  const post = fixtures.getPost();

  post.userId = user.id;

  await Database.saveUser(user);
  const createdPost = await Database.savePost(post);
  const result = createdPost.toJSON();

  t.is(result.id, post.id);
  t.is(result.title, post.title);
  t.is(result.content, post.content);
  t.is(result.userId, post.userId);
});

test('List posts', async (t) => {
  t.is(typeof Database.listPosts, 'function', 'Should be a function');

  const user = fixtures.getUser();
  const posts = fixtures.getPosts();
  const savePosts = [];

  await Database.saveUser(user);

  posts.forEach((item) => {
    const post = Object.assign({}, item);
    post.userId = user.id;
    savePosts.push(Database.savePost(post));
  });

  await Promise.all(savePosts);

  const result = await Database.listPosts();
  t.truthy(result.length);
});

test('List post by user', async (t) => {
  t.is(typeof Database.getPostById, 'function', 'Should be a function');

  const user = fixtures.getUser();
  const posts = fixtures.getPosts();
  const savePosts = [];

  await Database.saveUser(user);

  posts.forEach((item) => {
    const post = Object.assign({}, item);
    post.userId = user.id;
    savePosts.push(Database.savePost(post));
  });

  await Promise.all(savePosts);

  const result = await Database.listPostsByUser(user.id);
  t.truthy(result.length);
});
