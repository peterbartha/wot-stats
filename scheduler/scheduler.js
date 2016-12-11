var schedule = require('node-schedule');
var parser = require('cron-parser');


var utils = require('../middleware/utils/utils');
var api = require('../middleware/utils/api');
var userModel = require('../models/user');
var statsModel = require('../models/stats');

/**
 * Calculate the registered player main statistics (WN8, EFFICIENCY, WIN RATE)
 */
function getUserStats(accountId) {
  return api.getPlayerInfo(accountId).then(function (body2) {
    var player = body2.data[accountId];
    var stats = player.statistics.all;

    var playerTanksPromise = api.getPlayerTanks(accountId);
    var expectedPromise = api.getReferenceList();
    var tanksPromise = api.getTanks();

    return Promise.all([playerTanksPromise, expectedPromise, tanksPromise]).then(function (response) {
      var playerTanks = response[0].data[accountId];
      var expectedList = response[1].data;
      var tanks = response[2].data;

      var avgDmg = stats['damage_dealt'] / stats.battles;
      var avgSpot = stats.spotted / stats.battles;
      var avgFrag = stats.frags / stats.battles;
      var avgDef = stats['dropped_capture_points'] / stats.battles;
      var avgWinRate = stats.wins / stats.battles * 100;
      var avgCap = stats['capture_points'] / stats.battles;

      var wn8 = utils.calculateWN8(playerTanks, expectedList, stats.battles, avgDmg, avgSpot, avgFrag, avgDef, avgWinRate);
      var eff = utils.calculateEfficiency(playerTanks, tanks, stats.battles, avgDmg, avgSpot, avgFrag, avgDef, avgCap);

      return {
        wn8: utils.roundTwoDecPlaces(wn8),
        eff: utils.roundTwoDecPlaces(eff),
        winrate: utils.roundTwoDecPlaces(avgWinRate)
      }
    });
  }, function (e) {
    console.log(e);
  });
}

/**
 * Schedules a query job
 * It will query the recent statistics from WoT Web API every day (at 7.30 am)
 */
var job = schedule.scheduleJob('0 30 7 * * *', function () {
// var job = schedule.scheduleJob('*/30 * * * *', function () {  // testing
// console.log('tick');
  userModel.find({}, function (err, results) {
    if (err) {
      throw new Error(err);
    }
    var promiseArr = [];
    for (var i = 0; i < results.length; i++) {
      var user = results[i];
      var promise = getUserStats(user.accountId).then(function (stats) {
        var newStats = new statsModel();
        newStats.eff = stats.eff;
        newStats.wn8 = stats.wn8;
        newStats.winrate = stats.winrate;
        newStats._user = user;
        newStats.save(function (e) {
          if (e) {
            console.error(e);
          }
        });
      });
      promiseArr.push(promise);
    }

    // Execute all promises
    Promise.all(promiseArr).then(function () {
      // console.log('finished');
    }, function (e) {
      console.error(e);
    });
  });
});
