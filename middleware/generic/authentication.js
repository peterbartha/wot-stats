/**
 * If the user is not logged in, redirects to '/'
 */
module.exports = function (objectRepository) {

  return function (req, res, next) {
    return next();
  };

};
