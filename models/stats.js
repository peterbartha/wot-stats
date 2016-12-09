var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('Stats', {
  wn7: number,
  wn8: number,
  efficiency: number,
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = User;
