var requireOption = require('../common').requireOption;
var mongoose = require('mongoose');

/**
 * Delete the player's statistics (local delete only)
 */
module.exports = function (objectRepository) {

  var statisticsModel = requireOption(objectRepository, 'statisticsModel');

  return function (req, res, next) {
    if (!res.tpl.user || !req.body.ok) {
      return next();
    }

    var id = new mongoose.Types.ObjectId(req.session.userid);
    statisticsModel.remove({ _user: id }, function (err) {
      if (err) {
        return next(err);
      }

      // redirect to home page
      res.redirect('/player/' + res.tpl.user.nickname);
    });
  };

};
