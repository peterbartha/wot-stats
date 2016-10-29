var authenticationMW = require('../middleware/generic/authentication');
var renderMW = require('../middleware/generic/render');

var getStatisticsMW = require('../middleware/statistics/getStatistics');
var updateStatisticsMW = require('../middleware/statistics/updateStatistics');
var deleteStatisticsMW = require('../middleware/statistics/deleteStatistics');
var statisticsModel = {};

module.exports = function (app) {

  var objectRepository = {
    statisticsModel: statisticsModel
  };

  /**
   * Get full statistics
   */
  app.use('/:nickname/statistics',
    authenticationMW(objectRepository),
    getStatisticsMW(objectRepository),
    renderMW(objectRepository, 'statistics')
  );

  /**
   * Update selected player's statistics
   */
  app.use('/:nickname/statistics/update',
    authenticationMW(objectRepository),
    updateStatisticsMW(objectRepository),
    renderMW(objectRepository, 'updatedstats')
  );

  /**
   * Delete previous statistics (local only)
   * then fetch the latest statistics via API
   */
  app.use('/inventory/:itemid/delete',
    authenticationMW(objectRepository),
    deleteStatisticsMW(objectRepository),
    updateStatisticsMW(objectRepository),
    function (req, res, next) {
      return res.redirect('/:nickname/statistics');
    }
  );

};
