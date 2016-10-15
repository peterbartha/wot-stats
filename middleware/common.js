/**
 * Load a dependency from an object repository
 * @param {Object} objectRepository object repository
 * @param {string} propertyName dependency name
 * @returns {*}
 */
function requireOption(objectRepository, propertyName) {
  if (objectRepository && Object.prototype.hasOwnProperty.call(objectRepository, propertyName)) {
    return objectRepository[propertyName];
  }
  throw new TypeError(propertyName + ' required');
}

module.exports.requireOption = requireOption;
