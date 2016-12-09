var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wot');

module.exports = mongoose;
