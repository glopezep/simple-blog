const express = require('express');
const bodyParser = require('body-parser')
const simpleblog = require('../client');
const config = require('./config');

const app = express();
const client = simpleblog.createClient(config);
const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/user/save', (req, res) => {
  const user = req.body;

  client.saveUser(user, (err, usr) => {
    if (err) return res.json(err);
    res.json(usr);
  });
});

app.get('/api/user/username/:username', (req, res) => {
  const username = req.params.username;

  client.getUserByUsername(username, (err, user) => {
    if (err) return res.json(err);
    res.json(user);
  });
});

app.get('/api/user/:id', (req, res) => {
  const id = req.params.id;

  client.getUserById(id, (err, user) => {
    if (err) return res.json(err);
    res.json(user);
  });
});

app.delete('/api/user/:id', (req, res) => {
  const id = req.params.id;

  client.deleteUser(id, (err, user) => {
    if (err) return res.json(err);
    res.json(user);
  });
});

app.post('/api/post/save', (req, res) => {
  const post = req.body;

  client.savePost(post, (err, post) => {
    if (err) return res.json(err);
    res.json(post);
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
