var requireOption = require('../common').requireOption;
var request = require('request');
var apiKey = require('../../config/api-keys').wot;

/**
 * Get the reference for the ID param
 * Load the newest version of reference params with the second newest,
 * and compare them to calculate deltas
 */
module.exports = function (objectRepository) {

  return function (req, res, next) {

    var referenceId = parseInt(req.params['referenceId'], 10);

    function roundTwoDecPlaces(number) {
      return Math.round(number * 100) / 100;
    }

    var optionsNewer = {
      url: 'http://www.wnefficiency.net/exp/expected_tank_values_28.json',
      json: true
    };

    request.get(optionsNewer, function(error, response, body) {
      var optionsOlder = {
        url: 'http://www.wnefficiency.net/exp/expected_tank_values_26.json',
        json: true
      };

      request.get(optionsOlder, function(error2, response2, body2) {

        var optionsForTanks = {
          url: 'https://api.worldoftanks.eu/wot/encyclopedia/tankinfo/?application_id=' + apiKey + '&tank_id=' + referenceId,
          json: true
        };

        request.get(optionsForTanks, function(error3, response3, body3) {
          var obj = body.data.find(function(ref) { return ref.IDNum === referenceId; });
          var old = body2.data.find(function(ref) { return ref.IDNum === referenceId; });
          if (!old) old = obj;  // for new tanks

          var tank = body3.data[referenceId];
          if (!tank) {  // removed tanks
            tank = {
              localized_name: 'NaN (removed)',
              level: 'NaN',
              nation_i18n: 'NaN',
              image: ''
            };
          }

          var info = {
            tank: tank.localized_name,
            expFrag: obj.expFrag,
            expDamage: obj.expDamage,
            expSpot: obj.expSpot,
            expDef: obj.expDef,
            expWinRate: obj.expWinRate,
            deltaFrag: roundTwoDecPlaces(obj.expFrag - old.expFrag * 100),
            deltaDamage: roundTwoDecPlaces(obj.expDamage - old.expDamage),
            deltaSpot: roundTwoDecPlaces(obj.expSpot - old.expSpot),
            deltaDef: roundTwoDecPlaces(obj.expDef - old.expDef),
            deltaWinRate: roundTwoDecPlaces(obj.expWinRate - old.expWinRate),
            tier: tank.level,
            nation: tank.nation_i18n,
            class: tank.type ? tank.type.replace('Tank', '') : 'NaN',
            img: tank.image
          };

          res.tpl.reference = {
            version: body.header.version,
            info: info
          };
          return next();
        });
      });
    });
  };

};
