var requireOption = require('../common').requireOption;

/**
 * Update reference if we have the data for it
 *  - if there is no ID, set tpl.error
 *  - if everything is ok redirect to /reference
 */
module.exports = function (objectRepository) {

  var referenceModel = requireOption(objectRepository, 'referenceModel');

  return function (req, res, next) {
    return next();
  };

};
