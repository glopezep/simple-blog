const uuid = require('uuid/v4'); // eslint-disable-line

function getUser() {
  const id = uuid();
  return {
    id,
    username: `Jhon-${id}`,
    password: '123456',
  };
}

function getPost() {
  const id = uuid();
  return {
    id,
    userId: uuid(),
    title: 'Lorem ipsum dolor',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed.',
  };
}

function getUsers() {
  return [
    getUser(),
    getUser(),
    getUser(),
  ];
}

function getPosts() {
  return [
    getPost(),
    getPost(),
    getPost(),
  ];
}

module.exports = {
  getUser,
  getPost,
  getUsers,
  getPosts,
};
