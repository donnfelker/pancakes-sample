/**
 * Author: Jeff Whelpley
 * Date: 2/12/15
 *
 *
 */
module.exports = function () {
    return {
        name: 'visitor',
        adapters: {
            api:        'persist',
            batch:      'persist',
            webserver:  'restapi',
            browser:    'restapi'
        },
        methods: {
            persist:    ['find', 'findById', 'create', 'update', 'remove', 'removePermanently'],
            restapi:    ['find', 'findById', 'create', 'update', 'remove'],
            cache:      ['get', 'set', 'clear']
        },
        params: {
            count:              { required: ['where'] },
            find:               { required: ['where'], optional: ['select', 'skip', 'limit', 'sort', 'findOne'] },
            findById:           { required: ['_id'], optional: ['select'] },
            create:             { required: ['data'], optional: ['_id'] },
            update:             { eitheror: ['where', '_id'], required: ['data'], optional: ['select', 'multi', 'noaudit', 'upsert'] },
            remove:             { required: ['_id'] },
            removePermanently:  { required: ['where'], optional: ['multi'] },
            get:                { required: ['key'] },
            set:                { required: ['key', 'value' ]},
            clear:              {}
        },
        api: {
            GET: {
                '/visitors/{_id}':  'findById'
            },
            POST: {
                '/visitors':        'create',
                '/visitors/{_id}':  'create'
            },
            PUT: {
                '/visitors/{_id}':  'update'
            }
        },
        fields: {
            ips:            [ String ],
            name:           String
        },
        acl: {
            create: {
                access:         ['admin'],
                noblock: {
                    admin:      ['_id']
                }
            },
            find: {
                access:         ['admin'],
                where: {
                    allowed:    ['_id', 'createUserId', 'modifyUserId']
                },
                sort: {
                    allowed:    ['createDate'],
                    'default':  '-createDate'
                }
            },
            findById: {
                access:         ['admin'],
                where: {
                    allowed:    ['_id']
                }
            },
            update: {
                access:         ['admin']
            },
            remove: {
                access:         ['admin']
            },
            removePermanently: {
                access:         ['admin']
            },
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