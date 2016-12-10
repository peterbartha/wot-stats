var requireOption = require('../common').requireOption;

/**
 * Sign out with current user
 */
module.exports = function (objectRepository) {

  return function (req, res, next) {
    req.session.destroy(function (err) {
      return next();
    });
  };

};
