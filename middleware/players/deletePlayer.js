var requireOption = require('../common').requireOption;
var mongoose = require('mongoose');

/**
 * Delete the player object
 */
module.exports = function (objectRepository) {

  var userModel = requireOption(objectRepository, 'userModel');
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

      res.tpl.user.remove(function (err) {
        if (err) {
          return next(err);
        }

        delete res.tpl.user;
        req.session.destroy(function (err) {});

        // redirect to home page
        res.redirect('/');
      });
    });
  };

};
