var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('Stats', {
  date: {
    type: Date,
    default: Date.now
  },
  winrate: Number,
  wn8: Number,
  eff: Number,
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = User;
