var renderMW = require('../middleware/generic/render');
var checkUserCredential = require('../middleware/generic/checkUserCredential');
var getStatisticsMW = require('../middleware/statistics/getStatistics');
var deleteStatistics = require('../middleware/statistics/deleteStatistics');

var statisticsModel = require('../models/stats');
var userModel = require('../models/user');

module.exports = function (app) {

  var objectRepository = {
    statisticsModel: statisticsModel,
    userModel: userModel
  };

  /**
   * Delete statistics
   */
  app.use('/:nickname/statistics/delete',
    checkUserCredential(objectRepository),
    deleteStatistics(objectRepository),
    renderMW(objectRepository, 'delete-stats')
  );

  /**
   * Get full statistics
   */
  app.use('/:nickname/statistics',
    checkUserCredential(objectRepository),
    getStatisticsMW(objectRepository),
    renderMW(objectRepository, 'statistics')
  );

};
