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
