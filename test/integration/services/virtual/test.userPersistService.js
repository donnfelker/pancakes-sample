/**
 * Author: Jeff Whelpley
 * Date: 2/26/14
 *
 * Integration tests for the userPersistService
 */
var name            = 'userPersistService';
var taste           = require('pancakes-recipe').taste(require);
var persistService  = taste.flapjack(name);
var userService     = taste.flapjack('userService');
var userResource    = taste.flapjack('userResource');
var _               = require('lodash');

describe('INTEGRATION ' + name, function () {
    var caller = taste.caller.admin;
    var savedUser;

    describe('About this service', function () {
        it('should have all the methods defined in the resource', function () {
            taste.should.exist(userResource.methods, 'No methods in the user resource');
            taste.should.exist(userResource.methods.persist, 'No methods for persist in the user resource');
            _.each(userResource.methods.persist, function (method) {
                persistService.should.have.property(method);
                userService.should.have.property(method);
            });
        });

        it('should make sure that userService and persistService point to the same thing', function () {
            return taste.expect(userService === persistService).to.be.true;
        });
    });

    describe('create()', function () {
        it('should create a new user', function (done) {
            var username = 'jeff' + (new Date()).getTime();
            userService.create({
                caller: caller,
                data: {
                    username: username,
                    usernameLower: username
                }
            })
                .then(function (user) {
                    savedUser = user;
                    taste.should.exist(user);
                    taste.should.exist(user._id);
                    done();
                })
                .catch(function (err) {
                    done(err);
                });
        });
    });

    describe('find()', function () {
        it('should find a set of documents by details', function (done) {
            var promise = userService.find({ where: { usernameLower: savedUser.username } });
            taste.all([
                promise.should.be.fulfilled,
                promise.should.eventually.have.a.property('length').of.at.least(1)
            ], done);
        });
    });

    describe('findById()', function () {
        it('should find a set of documents by details', function (done) {
            var promise = userService.findById({ _id: savedUser._id });
            taste.all([
                promise.should.be.fulfilled,
                promise.should.eventually.have.a.property('_id').that.deep.equals(savedUser._id),
            ], done);
        });
    });

    describe('update()', function () {
        it('should update the test doc', function (done) {
            var newUsername = 'asdfasdf' + (new Date()).getTime();
            var where = { _id: savedUser._id };
            var updateData = { username: newUsername };
            var promise = userService.update({ caller: caller, where: where, data: updateData });
            taste.all([
                promise.should.be.fulfilled,
                promise.should.eventually.have.a.property('_id').that.deep.equals(savedUser._id),
                promise.should.eventually.have.a.property('username').that.equals(newUsername)
            ], done);
        });
    });

    describe('remove()', function () {
        it('should mark temp doc as deleted', function (done) {
            var promise = userService.remove({ caller: caller, _id: savedUser._id });
            taste.all([
                promise.should.be.fulfilled,
                promise.should.eventually.have.a.property('_id').that.deep.equals(savedUser._id)
            ], done);
        });
    });

    describe('removePermanently()', function () {
        it('should permanently delete the test visitor', function (done) {
            var where = { _id: savedUser._id };
            var promise = userService.removePermanently({
                caller: caller,
                where: where
            });
            taste.eventuallyFulfilled(promise, done);
        });
    });
});