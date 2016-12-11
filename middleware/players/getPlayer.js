var requireOption = require('../common').requireOption;
var mongoose = require('mongoose');

/**
 * Get the player for the nickname param
 */
module.exports = function (objectRepository) {

  var userModel = requireOption(objectRepository, 'userModel');

  return function (req, res, next) {
    if (req.session.userid) {
      var id = new mongoose.Types.ObjectId(req.session.userid);

      // lets find the user
      userModel.findById({
        '_id': id
      }, function (err, result) {
        if ((err) || (!result)) {
          return next();
        }

        res.tpl.isLoggedIn = true;
        res.tpl.user = result;

        return next();
      });
    } else {
      return res.redirect('/signin');
    }
  };

};
