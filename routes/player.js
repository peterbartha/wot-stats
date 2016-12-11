var authenticationMW = require('../middleware/generic/authentication');
var renderMW = require('../middleware/generic/render');

var getPlayerMW = require('../middleware/players/getPlayer');
var updatePlayerMW = require('../middleware/players/updatePlayer');
var deletePlayerMW = require('../middleware/players/deletePlayer');

var statisticsModel = require('../models/stats');
var userModel = require('../models/user');

module.exports = function (app) {

  var objectRepository = {
    userModel: userModel,
    statisticsModel: statisticsModel
  };


  /**
   * Edit the player info
   */
  app.use('/player/:nickname/edit',
    authenticationMW(objectRepository),
    getPlayerMW(objectRepository),
    updatePlayerMW(objectRepository),
    renderMW(objectRepository, 'edit-profile')
  );

  /**
   * Delete player
   * then redirect to '/'
   */
  app.use('/player/:nickname/delete',
    authenticationMW(objectRepository),
    getPlayerMW(objectRepository),
    deletePlayerMW(objectRepository),
    renderMW(objectRepository, 'delete-profile')
  );

  /**
   * Get player info
   */
  app.use('/player/:nickname',
    authenticationMW(objectRepository),
    getPlayerMW(objectRepository),
    renderMW(objectRepository, 'profile')
  );

};
