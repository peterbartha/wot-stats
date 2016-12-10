var renderMW = require('../middleware/generic/render');
var checkUserCredential = require('../middleware/generic/checkUserCredential');
var getStatisticsMW = require('../middleware/statistics/getStatistics');

var statisticsModel = require('../models/stats');
var userModel = require('../models/user');

module.exports = function (app) {

  var objectRepository = {
    statisticsModel: statisticsModel,
    userModel: userModel
  };

  /**
   * Get full statistics
   */
  app.use('/:nickname/statistics',
    checkUserCredential(objectRepository),
    getStatisticsMW(objectRepository),
    renderMW(objectRepository, 'statistics')
  );

};
