var requireOption = require('../common').requireOption;
var request = require('request');
var apiKey = require('../../config/api-keys').wot;

/**
 * Get the reference list
 */
module.exports = function (objectRepository) {

  return function (req, res, next) {

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
          url: 'https://api.worldoftanks.eu/wot/encyclopedia/tanks/?application_id=' + apiKey,
          json: true
        };

        request.get(optionsForTanks, function(error3, response3, body3) {
          var result = body.data.map(function (obj) {
            var tank = body3.data[obj.IDNum];
            if (!tank) {
              tank = {
                name_i18n: 'NaN (removed)',
                level: 'NaN',
                nation: 'NaN'
              };
            }

            var old = body2.data.find(function(ref) { return ref.IDNum === obj.IDNum; });
            if (!old) old = obj;  // for new tanks

            return {
              id: obj.IDNum,
              tank: tank.name_i18n,
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
              nation: tank.nation,
              class: tank.type ? tank.type.replace('Tank', '') : 'NaN'
            };
          });

          res.tpl.reference = {
            version: body.header.version,
            list: result
          };
          return next();
        });
      });
    });
  };

};
