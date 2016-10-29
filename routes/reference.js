var authenticationMW = require('../middleware/generic/authentication');
var renderMW = require('../middleware/generic/render');

var getReferenceMW = require('../middleware/reference/getReference');
var getReferenceListMW = require('../middleware/reference/getReferenceList');
var updateReferenceMW = require('../middleware/reference/updateReference');
var referenceModel = {};

module.exports = function (app) {

  var objectRepository = {
    referenceModel: referenceModel
  };

  /**
   * List all references
   */
  app.use('/reference',
    authenticationMW(objectRepository),
    getReferenceListMW(objectRepository),
    renderMW(objectRepository, 'reference')
  );

  /**
   * Get a reference by ID
   */
  app.use('/reference/:id',
    authenticationMW(objectRepository),
    getReferenceMW(objectRepository),
    renderMW(objectRepository, 'reference')
  );

  /**
   * Check for reference updates
   */
  app.use('/reference/check-for-updates',
    authenticationMW(objectRepository),
    updateReferenceMW(objectRepository),
    renderMW(objectRepository, 'updatereferences')
  );

};
