var requireOption = require('../common').requireOption;
var utils = require('../utils/utils');
var api = require('../utils/api');
var mongoose = require('mongoose');
var moment = require('moment');


/**
 * Get the statistics for the nickname param
 */
module.exports = function (objectRepository) {

  var statisticsModel = requireOption(objectRepository, 'statisticsModel');
  var userModel = requireOption(objectRepository, 'userModel');

  return function (req, res, next) {

    var nickname = req.params['nickname'];
    var graph = [];

    userModel.findOne({
      nickname: nickname
    }, function (err, result) {
      if (result) {
        var id = new mongoose.Types.ObjectId(result._id);
        statisticsModel.find({
          _user: id
        }, function (err, result) {
          if (result) {
            var lastTenRes = result.slice(Math.max(result.length - 10, 0));
            graph = lastTenRes.map(function (stat) {
              return {
                winrate: stat.winrate,
                wn8: stat.wn8,
                eff: stat.eff,
                date: moment(stat.date).format('MMM Do')
              };
            });
          }
        });
      }
    });

    api.getPlayerId(nickname).then(function (body) {

      if (!body.data[0]) {
        res.tpl.error.push('There is no player with name:' + nickname);
        return res.redirect('/');
      }
      var accountId = body.data[0]['account_id'];

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

          var change = graph.length ? utils.roundTwoDecPlaces(wn8 - graph[graph.length - 1].wn8) : 0;

          /**
           * Summary
           */
          var main = {
            wn8: utils.roundTwoDecPlaces(wn8),
            wn8Change: (change > 0 ? '+'+change : change),
            eff: utils.roundTwoDecPlaces(eff)
          };

          var summary = {
            battles: stats.battles,
            battlesPerc: '-',
            victories: stats.wins,
            victoriesPerc: utils.percByBattle(stats.wins, stats.battles),
            draws: stats.draws,
            drawsPerc: utils.percByBattle(stats.draws, stats.battles),
            defeats: stats.losses,
            defeatsPerc: utils.percByBattle(stats.losses, stats.battles),
            survived: stats['survived_battles'],
            survivedPerc: utils.percByBattle(stats['survived_battles'], stats.battles),
            deaths: stats.battles - stats['survived_battles'],
            deathsPerc: utils.percByBattle(stats.battles - stats['survived_battles'], stats.battles),

            frags: stats.frags,
            fragsAvg: utils.avgByBattle(stats.frags, stats.battles),
            damageDealt: stats['damage_dealt'],
            damageDealtAvg: utils.avgByBattle(stats['damage_dealt'], stats.battles),
            tanksSpotted: stats.spotted,
            tanksSpottedAvg: utils.avgByBattle(stats.spotted, stats.battles),
            capturePoints: stats['capture_points'],
            capturePointsAvg: utils.avgByBattle(stats['capture_points'], stats.battles),
            droppedCapturePoints: stats['dropped_capture_points'],
            droppedCapturePointsAvg: utils.avgByBattle(stats['dropped_capture_points'], stats.battles),
            experience: stats.xp,
            experienceAvg: utils.avgByBattle(stats.xp, stats.battles)
          };

          /**
           * Graphs
           */
          graph.push({
            winrate: utils.roundTwoDecPlaces(avgWinRate),
            wn8: utils.roundTwoDecPlaces(wn8),
            eff: utils.roundTwoDecPlaces(eff),
            date: moment().format('MMM Do')
          });

          var wn8Stats = {
            labels: graph.map(function (gs) { return '\''+gs.date+'\''; }),
            data: graph.map(function (gs) { return gs.wn8; })
          };
          var winrateStats = {
            labels: graph.map(function (gs) { return '\''+gs.date+'\''; }),
            data: graph.map(function (gs) { return gs.winrate; })
          };
          var byTier = utils.battlesByTier(playerTanks, tanks);
          var battlesOnly = [];
          for (var i in byTier) {
            var val = byTier[i];
            battlesOnly.push(val);
          }
          var battlesByTier = {
            data: battlesOnly
          };

          res.tpl.stats = {
            main: main,
            summary: summary,
            graph: {
              wn8: wn8Stats,
              winrate: winrateStats,
              battlesByTier: battlesByTier
            }
          };
          return next();
        });
      });
    }, function (e) {
      console.log(e);
    });
  };

};
