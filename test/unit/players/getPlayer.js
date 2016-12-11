var expect = require('chai').expect;
var getPlayer = require('../../../middleware/players/getPlayer');

describe('getPlayer middleware ', function () {

  it('should return player', function (done) {
    var req = {
      session: {
        userid: '584c0fc51981101988011eb0'
      }
    };
    var res = {
      tpl: {}
    };
    var fakeUserModel = {
      findById: function (some, cb) {
        cb(undefined, {
          _id: '584c0fc51981101988011eb0',
          accountId: 526338883,
          hash: 'passwordHash',
          salt: 'passwordSalt',
          email: 'tony@stark.ai',
          nickname: 'ironman',
          __v: 0
        });
      }
    };

    getPlayer({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.user.nickname).to.eql('ironman');
      expect(res.tpl.user.accountId).to.eql(526338883);
      expect(res.tpl.user.email).to.eql('tony@stark.ai');
      expect(err).to.eql(undefined);
      done();
    });
  });

  it('should return error when db returns error', function (done) {
    var req = {
      session: {
        userid: '584c0fc51981101988011eb0'
      }
    };
    var fakeUserModel = {
      findById: function (some, cb) {
        cb('mérési hiba', undefined)
      }
    };

    getPlayer({
      userModel: fakeUserModel
    })(req, {}, function (err) {
      expect(err).to.eql('mérési hiba');
      done();
    });
  });

  it('should redirect to the sign in page when session returns with null', function (done) {
    var req = {
      session: {
        userid: null
      }
    };
    var nehivd = false;

    var fakeUserModel = {
      findOne: function (some, cb) {
        nehivd = true;
        cb(undefined, null);
      }
    };

    var res = {
      redirect: function (to) {
        expect(to).to.eql('/signin');
        done();
      }
    };

    getPlayer({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(nehivd).to.be.eql(false);
      expect(err).to.eql(undefined);
      done();
    });
  });
});
