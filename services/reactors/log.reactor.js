/**
 * Author: Jeff Whelpley
 * Date: 2/12/15
 *
 *
 */
module.exports = function (_, eventBus, config) {

    /**
     * Add the event handlers to the event bus
     */
    function init() {

        var handlers = ['log.critical'];
        var level = config.logging.level;

        if (level === 'error') {
            handlers = handlers.concat(['log.error']);
        }
        else if (level === 'info') {
            handlers = handlers.concat(['log.error', 'log.info']);
        }
        else if (level === 'debug') {
            handlers = handlers.concat(['log.error', 'log.info', 'log.debug']);
        }

        /* jshint newcap:false */
        eventBus.addHandlers(handlers, function (logData) {
            var len = 10;
            var pad = ' ';
            var standardFields = ['msg', 'level', 'source', 'stack', 'inner'];
            var msg = logData.msg;

            console.log('----');
            console.log('message:' + Array(len - 8).join(pad) + msg);
            console.log('level:' + Array(len - 6).join(pad) + logData.level);
            console.log('source:' + Array(len - 7).join(pad) + logData.source);

            _.each(logData, function (val, key) {
                if (standardFields.indexOf(key) < 0) {  // if not a standard field
                    console.log(key + ':' + Array(len - 1 - key.length).join(pad) + val);
                }
            });

            if (logData.stack) {
                console.log('stack:' + Array(len - 6).join(pad) + logData.stack);
            }

            if (logData.inner) {
                console.log('inner:' + Array(len - 6).join(pad) + logData.inner);
            }

            console.log('----');

        });
    }

    // expose functions
    return {
        init: init
    };
};