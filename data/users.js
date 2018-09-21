'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

function encrypt (password) {
  // encrypt password
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}

const users = [{
  url: '/students/axel',
  name: 'Axel',
  country: 'España',
  username: 'Axel',
  password: encrypt('Axel')
}, {
  url: '/students/barbara',
  name: 'Barbara',
  country: 'Deutschland',
  username: 'Barbara',
  password: encrypt('Barbara')
}, {
  url: '/students/caroline',
  name: 'Caroline',
  country: 'Brasil',
  username: 'Caroline',
  password: encrypt('Caroline')
}, {
  url: '/students/diana',
  name: 'Diana',
  country: 'Colombia',
  username: 'Diana',
  password: encrypt('Diana')
}, {
  url: '/students/francesca',
  name: 'Francesca',
  country: 'Italia',
  username: 'Francesca',
  password: encrypt('Francesca')
}, {
  url: '/students/gabriela',
  name: 'Gabriela',
  country: 'Ecuador',
  username: 'Gabriela',
  password: encrypt('Gabriela')
}, {
  url: '/students/jonathan',
  name: 'Jonathan',
  country: 'Deutschland',
  username: 'Jonathan',
  password: encrypt('Jonathan')
}, {
  url: '/students/maria-jose',
  name: 'Maria José',
  country: 'España',
  username: 'Maria José',
  password: encrypt('Maria José')
}, {
  url: '/students/yenderly',
  name: 'Yenderly',
  country: 'Venezuela',
  username: 'Yenderly',
  password: encrypt('Yenderly')
}];

module.exports = users;
