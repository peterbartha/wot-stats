var renderMW = require('../middleware/generic/render');

module.exports = function (app) {

  /**
   * Index page
   * (without any kind of middlewares)
   */
  app.get('/', function(req, res) {
    res.render('index');
  });

};
