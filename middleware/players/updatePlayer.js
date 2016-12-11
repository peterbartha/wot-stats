var requireOption = require('../common').requireOption;
var pass = require('pwd');


/**
 * Update player if we have the data for it
 * update if we have a res.tpl.user, create if we don't have
 *  - if there is no nickname, set tpl.error
 *  - if everything is ok redirect to /players/:nickname
 */
module.exports = function (objectRepository) {

  var userModel = requireOption(objectRepository, 'userModel');

  return function (req, res, next) {
    if (!req.body.email || !req.body.password || !req.body.confirm) {
      return next();
    }

    if (req.body.password !== req.body.confirm) {
      res.tpl.error.push('Passwords are not identical!');
      return next();
    }

    var user = res.tpl.user;
    if (user) {
      user.email = req.body.email;
      pass.hash(req.body.password, function(err, salt, hash){
        user.salt = salt;
        user.hash = hash;

        user.save(function (err, result) {
          if (err) {
            return next(err);
          }
          res.tpl.error = [];
          return res.redirect('/player/' + user.nickname);
        });
      });

    }
  };

};
