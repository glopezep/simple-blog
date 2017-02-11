const Database = require('./');

Database.setup((data) => {
  console.log(data);
  process.exit();
});
