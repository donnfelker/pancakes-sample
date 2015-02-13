/**
 * Author: Jeff Whelpley
 * Date: 2/12/15
 *
 * Page cache
 */
module.exports = function () {
    return {
        name:           'page',
        adapters: {
            api:        'cache',
            batch:      'cache',
            webserver:  'cache'
        },
        methods: {
            cache:      ['get', 'set', 'clear']
        },
        params: {
            get:        { required: ['key'] },
            set:        { required: ['key', 'value' ]},
            clear:      {}
        },
        acl: {
            get: {
                access: ['admin', 'user', 'device', 'visitor', 'partner']
            },
            set: {
                access: ['admin', 'user', 'device', 'visitor', 'partner']
            },
            clear: {
                access: ['admin', 'user', 'device', 'visitor', 'partner']
            }
        }
    };
};
