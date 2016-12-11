/**
 * Common
 */
function roundTwoDecPlaces(number) {
  return Math.round(number * 100) / 100;
}

function avgByBattle(number, battles) {
  var n = number / battles;
  return roundTwoDecPlaces(n);
}

function percByBattle(number, battles) {
  var n = number / battles * 100;
  return roundTwoDecPlaces(n);
}

/**
 * Calculate player's WN8
 * For more information, please check: http://wiki.wnefficiency.net/pages/WN8
 */
function calculateWN8(tanks, expected, battles, avgDmg, avgSpot, avgFrag, avgDef, avgWinRate) {
  var statArr = [];
  for (var i=0; i < tanks.length; i++) {
    var tank = tanks[i];
    for (var j=0; j < expected.length; j++) {
      var stat = expected[j];
      if (tank.tank_id === stat.IDNum) {
        stat.expDamage = stat.expDamage * tank.statistics.battles;
        stat.expDef = stat.expDef * tank.statistics.battles;
        stat.expFrag = stat.expFrag * tank.statistics.battles;
        stat.expSpot = stat.expSpot * tank.statistics.battles;
        stat.expWinRate = (stat.expWinRate * tank.statistics.battles * 100) / 100.0;
        statArr.push(stat);
      }
    }
  }
  var expectedAvg = calculateExpectedAvg(statArr, battles);
  var avg = { avgDmg: avgDmg, avgSpot: avgSpot, avgFrag: avgFrag, avgDef: avgDef, avgWinRate: avgWinRate };
  return calculateWN8Ratios(avg, expectedAvg);
}

function calculateExpectedAvg(statArr, battles) {
  var expDmg = 0;
  var expSpot = 0;
  var expFrag = 0;
  var expDef = 0;
  var expWinRate = 0;

  for (var i=0; i < statArr.length; i++) {
    var avg = statArr[i];
    expDmg += avg.expDamage;
    expSpot += avg.expSpot;
    expFrag += avg.expFrag;
    expDef += avg.expDef;
    expWinRate += avg.expWinRate;
  }

  return {
    expDmg: expDmg / battles,
    expSpot: expSpot / battles,
    expFrag: expFrag / battles,
    expDef: expDef / battles,
    expWinRate: expWinRate / battles
  }
}

function calculateWN8Ratios(avg, expected) {
  var rDAMAGE = avg.avgDmg     / expected.expDmg;
  var rSPOT   = avg.avgSpot    / expected.expSpot;
  var rFRAG   = avg.avgFrag    / expected.expFrag;
  var rDEF    = avg.avgDef     / expected.expDef;
  var rWIN    = avg.avgWinRate / expected.expWinRate;

  var rWINc    = Math.max(0,                          (rWIN    - 0.71) / (1 - 0.71) );
  var rDAMAGEc = Math.max(0,                          (rDAMAGE - 0.22) / (1 - 0.22) );
  var rFRAGc   = Math.max(0, Math.min(rDAMAGEc + 0.2, (rFRAG   - 0.12) / (1 - 0.12)));
  var rSPOTc   = Math.max(0, Math.min(rDAMAGEc + 0.1, (rSPOT   - 0.38) / (1 - 0.38)));
  var rDEFc    = Math.max(0, Math.min(rDAMAGEc + 0.1, (rDEF    - 0.10) / (1 - 0.10)));

  return 980*rDAMAGEc + 210*rDAMAGEc*rFRAGc + 155*rFRAGc*rSPOTc + 75*rDEFc*rFRAGc + 145*Math.min(1.8, rWINc);
}

/**
 * Battles / tank levels
 */
function battlesByTier(playerTanks, tanks) {
  var perLevel = {};
  for (var i = 0; i < playerTanks.length; i++) {
    var playerTank = playerTanks[i];
    var tank = tanks[playerTank.tank_id];
    if (tank) {
      if (perLevel[tank.level]) {
        perLevel[tank.level] += playerTank.statistics.battles;
      } else {
        perLevel[tank.level] = playerTank.statistics.battles;
      }
    }
  }
  return perLevel;
}

/**
 * Calculate player's efficiency
 * For more information, please check: http://www.modxvm.com/en/faq/how-is-player-efficiency-rating-calculated/
 */
function calculateEfficiency(playerTanks, tanks, battles, avgDmg, avgSpot, avgFrag, avgDef, avgCap) {
  var perLevel = battlesByTier(playerTanks, tanks);
  var sum = 0;
  for (var level in perLevel) {
    var z = perLevel[level];
    var j = parseInt(level, 10);
    sum += z*j;
  }
  var avgTier = sum / battles;
  return avgDmg * (10 / (avgTier + 2)) * (0.23 + 2*avgTier / 100) +
         avgFrag * 250 +
         avgSpot * 150 +
         Math.log(avgCap + 1) / Math.log(1.732) * 150 +
         avgDef * 150;
}

/**
 * Export public functions
 */
module.exports.roundTwoDecPlaces = roundTwoDecPlaces;
module.exports.avgByBattle = avgByBattle;
module.exports.percByBattle = percByBattle;
module.exports.calculateWN8 = calculateWN8;
module.exports.calculateEfficiency = calculateEfficiency;
module.exports.battlesByTier = battlesByTier;