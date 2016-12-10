var db = require('../config/db');

var User = db.model('User', {
  nickname: String,
  email: String,
  password: String,
  accountId: Number
});

module.exports = User;
