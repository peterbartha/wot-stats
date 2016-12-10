var authRedirectionMW = require('../middleware/generic/authRedirection');
var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserCredential = require('../middleware/generic/checkUserCredential');
var checkUserLoginMW = require('../middleware/generic/checkUserLogin');
var renderMW = require('../middleware/generic/render');
var checkUserRegistrationMW = require('../middleware/generic/checkUserRegistration');
var signoutMW = require('../middleware/generic/signout');

var userModel = require('../models/user');

module.exports = function (app) {

  var objectRepository = {
    userModel: userModel
  };

  /**
   * Sign in page
   */
  app.use('/signin',
    inverseAuthMW(objectRepository),
    checkUserLoginMW(objectRepository),
    renderMW(objectRepository, 'signin')
  );

  /**
   * Sign out page
   */
  app.get('/signout',
    signoutMW(objectRepository),
    function(req, res, next) {
      res.redirect('/');
    }
  );
  
  /**
   * Sign up page
   */
  app.use('/signup',
    inverseAuthMW(objectRepository),
    checkUserRegistrationMW(objectRepository),
    renderMW(objectRepository, 'signup')
  );
  
};
