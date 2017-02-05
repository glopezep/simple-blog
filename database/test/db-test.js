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
