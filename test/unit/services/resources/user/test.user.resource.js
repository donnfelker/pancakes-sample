/**
 * Author: Jeff Whelpley
 * Date: 2/11/15
 *
 * Testing the userresource. This is a dumb test and is just
 * used to make sure the mocha unit tests are working at some level
 */
var name    = 'services/resources/user/user.resource';
var taste   = require('pancakes-recipe').taste(require);
var target  = taste.flapjack(name);

describe('UNIT ' + name, function () {
    it('should have a username field', function () {
        taste.should.exist(target.fields.username);
    });
});