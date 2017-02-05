import test from 'ava'; // eslint-disable-line
import Database from '../';

test.before('Setup database', async () => {
  await Database.setup();
});

test.after.always('Cleanup database', async () => {
  await Database.dropTables();
});

test('Pass', async (t) => {
  t.pass();
});
