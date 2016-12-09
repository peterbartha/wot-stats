/**
 * If the user is logged in, redirects to '/'
 */
module.exports = function (objectRepository) {

  console.log(objectRepository);

  return function (req, res, next) {
    return next();
  };

};
