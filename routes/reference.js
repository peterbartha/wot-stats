var checkUserCredential = require('../middleware/generic/checkUserCredential');
var renderMW = require('../middleware/generic/render');

var getReferenceMW = require('../middleware/reference/getReference');
var getReferenceListMW = require('../middleware/reference/getReferenceList');

var referenceModel = {};
var userModel = require('../models/user');

module.exports = function (app) {

  var objectRepository = {
    userModel: userModel
  };


  /**
   * Get a reference by ID
   */
  app.use('/reference/:referenceId',
    checkUserCredential(objectRepository),
    getReferenceMW(objectRepository),
    renderMW(objectRepository, 'reference-details')
  );

  /**
   * List all references
   */
  app.use('/reference',
    checkUserCredential(objectRepository),
    getReferenceListMW(objectRepository),
    renderMW(objectRepository, 'reference')
  );

};
