/**
 * Author: Jeff Whelpley
 * Date: 1/14/15
 *
 * Configuration file for production
 */
var _           = require('lodash');
var configBase  = require('./config.base');

module.exports = _.merge(configBase, {
    baseHost:           'foo.com',
    cookieDomain:       '.foo.com',
    longStackSupport:   false
});
