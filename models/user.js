var db = require('../config/db');

var User = db.model('User', {
  nickname: String,
  email: String,
  password: String,
});

module.exports = User;
