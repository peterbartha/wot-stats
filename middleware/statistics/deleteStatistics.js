var requireOption = require('../common').requireOption;

/**
 * Delete the player's statistics (local delete only)
 */
module.exports = function (objectRepository) {

  var statisticsModel = requireOption(objectRepository, 'statisticsModel');

  return function (req, res, next) {
    return next();
  };

};
