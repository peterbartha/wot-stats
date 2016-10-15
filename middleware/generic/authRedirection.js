/**
 * When the user visits the / main page, should be redirected to
 *   - /login when not signed in
 *   - /inventory when signed in
 */
module.exports = function (objectRepository) {

  return function (req, res, next) {
    return next();
  };

};
