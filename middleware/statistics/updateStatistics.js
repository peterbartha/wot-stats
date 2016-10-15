var requireOption = require('../common').requireOption;

/**
 * Update statistics if we have the data for it
 *  - if there is no nickname, set tpl.error
 *  - if everything is ok redirect to /player/:nickname/statistics#summary
 */
module.exports = function (objectRepository) {

  var statisticsModel = requireOption(objectRepository, 'statisticsModel');

  return function (req, res, next) {
    return next();
  };

};
