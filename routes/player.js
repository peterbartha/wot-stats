var authenticationMW = require('../middleware/generic/authentication');
var renderMW = require('../middleware/generic/render');

var getPlayerMW = require('../middleware/players/getPlayer');
var updatePlayerMW = require('../middleware/players/updatePlayer');
var deletePlayerMW = require('../middleware/players/deletePlayer');
var playerModel = {};

module.exports = function (app) {

  var objectRepository = {
    playerModel: playerModel
  };

  /**
   * Get player info
   */
  app.use('/player/:nickname',
    authenticationMW(objectRepository),
    getPlayerMW(objectRepository),
    renderMW(objectRepository, 'player')
  );

  /**
   * Add new player
   */
  app.use('/player/:nickname/new',
    authenticationMW(objectRepository),
    updatePlayerMW(objectRepository),
    renderMW(objectRepository, 'newplayer')
  );

  /**
   * Edit the player info
   */
  app.use('/player/:nickname/edit',
    authenticationMW(objectRepository),
    getPlayerMW(objectRepository),
    updatePlayerMW(objectRepository),
    renderMW(objectRepository, 'newplayer')
  );

  /**
   * Delete player
   * then redirect to '/'
   */
  app.use('/player/:nickname/delete',
    authenticationMW(objectRepository),
    getPlayerMW(objectRepository),
    deletePlayerMW(objectRepository),
    function (req, res, next) {
      return res.redirect('/');
    }
  );

};
