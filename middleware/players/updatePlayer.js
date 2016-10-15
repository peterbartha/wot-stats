var requireOption = require('../common').requireOption;

/**
 * Create (or update) player if we have the data for it
 * update if we have a res.tpl.player, create if we don't have
 *  - if there is no nickname, set tpl.error
 *  - if everything is ok redirect to /players/:nickname
 */
module.exports = function (objectRepository) {

  var playerModel = requireOption(objectRepository, 'playerModel');

  return function (req, res, next) {
    return next();
  };

};
