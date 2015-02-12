/**
 * Author: Jeff Whelpley
 * Date: 1/14/15
 *
 * Purpose of this file is to load the appropriate config file
 */
var lodash      = require('lodash');
var nconf       = require('nconf');
var environment = process.env.NODE_ENV || 'dev';

try {
    var env         = require('./env');
    var envVars     = lodash.extend({}, env.base, env[environment]);

    nconf.argv().env().defaults({ NODE_PATH: __dirname }).overrides(envVars);
    environment = environment || env.NODE_ENV;
}
catch (e) {
    nconf.argv().env().defaults({ NODE_PATH: __dirname });
}

module.exports  = require('./config.' + environment);