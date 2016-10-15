var requireOption = require('../common').requireOption;

/**
 * Get the reference for the ID param
 */
module.exports = function (objectRepository) {

  var referenceModel = requireOption(objectRepository, 'referenceModel');

  return function (req, res, next) {
    return next();
  };

};
