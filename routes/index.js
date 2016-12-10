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

  app.post('/',
    function (req, res, next) {
      var nickname = req.body.nickname;
      return res.redirect('/' + nickname + '/statistics');
    }
  );
};
