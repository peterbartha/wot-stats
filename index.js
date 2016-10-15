// Express application
var express = require('express');
var app = express();
var fs = require('fs');
var staticDir = __dirname + '/static';

// Friendly URL
app.use(function(req, res, next) {
  if (req.path.indexOf('.') === -1) {
    var file = staticDir + req.path + '.html';
    fs.exists(file, function(exists) {
      if (exists) req.url += '.html';
      next();
    });
  } else next();
});

require('./routes/player')(app);
require('./routes/statistics')(app);
require('./routes/reference')(app);
require('./routes/outside')(app);

// Server configuration
app.use(express.static('static'));
var server = app.listen(3000, function() {
    console.log('Server is running on port 3000.');
});
