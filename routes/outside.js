var authRedirectionMW = require('../middleware/generic/authRedirection');
var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserCredential = require('../middleware/generic/checkUserCredential');
var renderMW = require('../middleware/generic/render');
var authenticationMW = require('../middleware/generic/authentication');
var signoutMW = require('../middleware/generic/signout');

var playerModel = {};

module.exports = function (app) {

  var objectRepository = {
    playerModel: playerModel
  };

  /**
   * Main page
   */
  app.get('/',
    authRedirectionMW(objectRepository)
  );

  /**
   * Sign in page
   */
  app.use('/signin',
    inverseAuthMW(objectRepository),
    checkUserCredential(objectRepository),
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
    checkUserCredential(objectRepository),
    renderMW(objectRepository, 'signup')
  );
  
};
