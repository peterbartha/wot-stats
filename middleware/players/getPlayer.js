var requireOption = require('../common').requireOption;

/**
 * Get the player for the nickname param
 */
module.exports = function (objectRepository) {

  var playerModel = requireOption(objectRepository, 'playerModel');

  return function (req, res, next) {
    return next();
  };

};
