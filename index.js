// Express application
var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');


// Configuring 'app'
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000
  },
  resave: true,
  saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  res.tpl = {
    isLoggedIn: false,
    user: null
  };
  res.tpl.error = [];

  return next();
});

// Routing
require('./routes/index')(app);
require('./routes/player')(app);
require('./routes/statistics')(app);
require('./routes/reference')(app);
require('./routes/outside')(app);

// Error handling
app.use(function (err, req, res, next) {
  res.status(500).send('Houston, we have a problem!');

  //Flush out the stack to the console
  console.error(err.stack);
});

// Server configuration
var server = app.listen(3000, function() {
    console.log('Server is running on port 3000.');
});

require('./scheduler/scheduler');
