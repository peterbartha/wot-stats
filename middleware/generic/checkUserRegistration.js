var requireOption = require('../common').requireOption;
var api = require('../utils/api');
var pass = require('pwd');

/**
 * Check if the email address is already registered, if not
 * create the user (no extra checks on password)
 */
module.exports = function (objectrepository) {

  var UserModel = requireOption(objectrepository, 'userModel');

  return function (req, res, next) {

    // not enough parameter
    if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
      (typeof req.body.password === 'undefined') || (typeof req.body.confirm === 'undefined')) {
      return next();
    }

    // get player id by the given nickname from WoT WebAPI
    return api.getPlayerId(req.body.nickname).then(function (body) {
      if (body.status === 'error') {
        res.tpl.error.push('Player not found in WoT database.');
        return next();
      }
      if (body.data.length) {
        //lets find the user
        UserModel.findOne({
          email: req.body.email
        }, function (err, result) {
          if ((err) || (result !== null)) {
            res.tpl.error.push('Your email address is already registered!');
            return next();
          }

          if (req.body.password !== req.body.confirm) {
            res.tpl.error.push('Passwords are not identical!');
            return next();
          }

          //create user
          var newUser = new UserModel();
          newUser.nickname = req.body.nickname;
          newUser.email = req.body.email;
          newUser.accountId = body.data[0].account_id;

          pass.hash(req.body.password, function(err, salt, hash){
            newUser.salt = salt;
            newUser.hash = hash;

            newUser.save(function (e) {
              return res.redirect('/signin');
            });
          });
        });
      } else {
        res.tpl.error.push('Player not found in WoT database.');
        return next();
      }
    }, function (e) {
      console.log(e);
      return next();
    });
  };
};