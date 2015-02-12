/**
 * Author: Jeff Whelpley
 * Date: 1/26/14
 *
 * This script will start the server (API or Web server)
 */
var panckesCfg  = require('./config/pancakes.config');
var pancakes    = require('pancakes');
var container   = (process.argv.length > 2 && process.argv[2]) || process.env.CONTAINER || 'api';

// set container in pancakes config and init pancakes
panckesCfg.container = container = container === 'web' ? 'webserver' : container;
pancakes.initContainer(panckesCfg);

// now we start
var log         = pancakes.cook('log', null);
var middleware  = pancakes.cook('middleware', null);

console.log('starting middleware...');

middleware.init(container)
    .then(function (ctx) {
        log.info(container + ' started at: ' + ctx.server.info.uri, null);
    })
    .catch(function (err) {
        log.error(err, null);
    });