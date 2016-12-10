var renderMW = require('../middleware/generic/render');
var checkUserCredential = require('../middleware/generic/checkUserCredential');

var userModel = require('../models/user');

module.exports = function (app) {

  var objectRepository = {
    userModel: userModel
  };

  /**
   * Index page
   */
  app.get('/',
    checkUserCredential(objectRepository),
    renderMW(objectRepository, 'index')
  );

};
