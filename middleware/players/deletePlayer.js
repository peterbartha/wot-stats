var requireOption = require('../common').requireOption;

/**
 * Delete the player object
 */
module.exports = function (objectRepository) {

  var playerModel = requireOption(objectRepository, 'playerModel');

  return function (req, res, next) {
    return next();
  };

};
