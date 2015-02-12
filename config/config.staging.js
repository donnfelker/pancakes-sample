/**
 * Author: Jeff Whelpley
 * Date: 1/14/15
 *
 * Config for CI environment
 */
var _           = require('lodash');
var configBase  = require('./config.base');

module.exports = _.merge(configBase, {
    baseHost:           '-staging.foo.com',
    cookieDomain:       '.foo.com',
    longStackSupport:   false
});
