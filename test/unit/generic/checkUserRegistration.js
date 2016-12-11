var expect = require('chai').expect;
var checkUserRegistration = require('../../../middleware/generic/checkUserRegistration');


describe('checkUserRegistration middleware ', function () {
  this.timeout(5000); // API Calls

  describe('should call next when', function () {
    it('no post parameter is given', function (done) {
      var nehivd = false;

      var fakeUserModel = {
        findOne: function (some, cb) {
          nehivd = true;
          cb();
        }
      };

      checkUserRegistration({
        userModel: fakeUserModel
      })({}, {}, function (err) {
        expect(nehivd).to.be.eql(false);
        expect(err).to.eql(undefined);
        done();
      });
    });

    it('no password parameter is given', function (done) {
      var req = {
        body: {
          email: 'tony@stark.ai'
        }
      };
      var nehivd = false;

      var fakeUserModel = {
        findOne: function (some, cb) {
          nehivd = true;
          cb();
        }
      };

      checkUserRegistration({
        userModel: fakeUserModel
      })(req, {}, function (err) {
        expect(nehivd).to.be.eql(false);
        expect(err).to.eql(undefined);
        done();
      });
    });

    it('no email parameter is given', function (done) {
      var req = {
        body: {
          password: 'boo'
        }
      };
      var nehivd = false;

      var fakeUserModel = {
        findOne: function (some, cb) {
          nehivd = true;
          cb();
        }
      };

      checkUserRegistration({
        userModel: fakeUserModel
      })(req, {}, function (err) {
        expect(nehivd).to.be.eql(false);
        expect(err).to.eql(undefined);
        done();
      });
    });

    it('passwords are not identical', function (done) {
      var req = {
        body: {
          password: 'asd',
          confirm: 'dsa',
          email: 'tony@stark.ai',
          nickname: 'ironman'
        }
      };
      var nehivd = false;

      var res = {
        tpl: {
          error :[]
        }
      };
      var fakeUserModel = {
        findOne: function (some, cb) {
          nehivd = true;
          cb(undefined, null);
        }
      };

      checkUserRegistration({
        userModel: fakeUserModel
      })(req, res, function (err) {
        expect(res.tpl.error.length).to.be.above(0);
        expect(nehivd).to.be.eql(true);
        expect(err).to.eql(undefined);
        done();
      });
    });

  });

  it('should register new user if everything is ok', function (done) {
    var req = {
      body: {
        password: 'WARMACHINROX',
        confirm: 'WARMACHINROX',
        email: 'tony@stark.ai',
        nickname: 'ironman'
      }
    };

    var res = {
      redirect: function (to) {
        expect(to).to.eql('/signin');
        done();
      }
    };


    var fakeUserModel = function () {
    };

    fakeUserModel.findOne = function (some, cb) {
      return cb(undefined, null);
    };

    fakeUserModel.prototype.save = function (cb) {
      return cb(undefined);
    };

    checkUserRegistration({
      userModel: fakeUserModel
    })(req, res, function (err) {
      console.log(err);
      expect(true).to.eql(false);
      done();
    });
  });

  it('should return error when name is less then 3 characters', function (done) {
    var req = {
      body: {
        password: 'WARMACHINROX',
        confirm: 'WARMACHINROX',
        email: 'tony@stark.ai',
        nickname: 'i'
      }
    };

    var res = {
      tpl: {
        error :[]
      }
    };

    var fakeUserModel = function () {
    };

    fakeUserModel.findOne = function (some, cb) {
      return cb(undefined, null);
    };

    checkUserRegistration({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.error.length).to.be.above(0);
      expect(err).to.eql(undefined);
      done();
    });
  });

  it('should return error when db returns error', function (done) {
    var req = {
      body: {
        password: 'WARMACHINROX',
        confirm: 'WARMACHINROX',
        email: 'tony@stark.ai',
        nickname: 'ironman'
      }
    };

    var res = {
      tpl: {
        error :[]
      }
    };

    var fakeUserModel = function () {
    };

    fakeUserModel.findOne = function (some, cb) {
      return cb(undefined, true);
    };

    checkUserRegistration({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.error.length).to.be.above(0);
      expect(err).to.eql(undefined);
      done();
    });
  });
});
