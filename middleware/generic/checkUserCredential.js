var requireOption = require('../common').requireOption;

/**
 * Check user's login credentials
 */
module.exports = function (objectRepository) {

  return function (req, res, next) {
    return next();
  };

};
