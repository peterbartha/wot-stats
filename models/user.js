var db = require('../config/db');

var User = db.model('User', {
  nickname: String,
  email: String,
  hash: String,
  salt: String,
  accountId: Number
});

module.exports = User;
