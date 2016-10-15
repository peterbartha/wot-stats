var requireOption = require('../common').requireOption;

/**
 * Get the statistics for the nickname param
 */
module.exports = function (objectRepository) {

  var statisticsModel = requireOption(objectRepository, 'statisticsModel');

  return function (req, res, next) {
    return next();
  };

};
