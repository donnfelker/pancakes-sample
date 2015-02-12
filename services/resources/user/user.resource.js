/**
 * Author: Jeff Whelpley
 * Date: 2/5/15
 *
 * The user that will be
 */
module.exports = function () {
    return {
        name: 'user',
        adapters: {
            api:        'persist',
            batch:      'persist',
            webserver:  'restapi',
            browser:    'restapi'
        },
        methods: {
            persist:    ['find', 'findById', 'create', 'update', 'remove', 'removePermanently'],
            restapi:    ['find', 'findById', 'create', 'update', 'remove']
        },
        params: {
            find:               { required: ['where'], optional: ['select', 'skip', 'limit', 'sort', 'findOne'] },
            findById:           { required: ['_id'], optional: ['select'] },
            create:             { required: ['data'] },
            update:             { eitheror: ['where', '_id'], required: ['data'], optional: ['select', 'multi', 'noaudit'] },
            remove:             { required: ['_id'] },
            removePermanently:  { eitheror: ['where', '_id'], optional: ['multi'] }
        },
        api: {
            GET: {
                '/users':       'find',
                '/users/{_id}': 'findById'
            },
            POST: {
                '/users':       'createUser'
            },
            PUT: {
                '/users/{_id}': 'update'
            },
            DELETE: {
                '/users/{_id}': 'remove'
            }
        },
        fields: {
            username: {
                ui:         true,
                type:       String,
                required:   true,
                match:      /^[a-zA-Z0-9\-_]+$/,
                matchDesc:  'Letters, numbers, - or _',
                minSize:    4,
                maxSize:    24
            },
            usernameLower:  { type: String, required: true }
        },
        indexes: [
            {
                fields:     { usernameLower: 1 },
                options:    { name: 'usernameLower_1', unique: true }
            }
        ],
        acl: {
            create: {
                access:         ['admin']
            },
            find: {
                access:         ['admin', 'user', 'visitor'],
                select: {
                    restricted: {
                        user:    ['authType', 'authToken', 'authId', 'authData'],
                        visitor: ['authType', 'authToken', 'authId', 'authData']
                    },
                    'default': {
                        user:   '-modifyDate -modifyUserId -modifyUserType -password -failedPasswordAttempts'
                    }
                },
                where: {
                    allowed:    ['_id', 'username', 'usernameLower', 'authToken', 'email', 'createDate', 'role', 'createUserId', 'modifyUserId']
                },
                sort: {
                    allowed:    ['createDate'],
                    'default':  '-createDate'
                }
            },
            findById: {
                access:         ['admin', 'user', 'visitor'],
                select: {
                    restricted: {
                        user:   ['authType', 'authToken', 'authId', 'authData']
                    },
                    'default': {
                        user:   '-modifyDate -modifyUserId -modifyUserType'
                    }
                },
                where: {
                    allowed:    ['_id']
                }
            },
            update: {
                access:         ['admin', 'user'],
                onlyMine:       ['user'],
                restricted: {
                    user:       ['role', 'auth', 'failedPasswordAttempts', 'actions']
                }
            },
            remove: {
                access:         ['admin']
            },
            removePermanently: {
                access:         ['admin']
            }
        }
    };
};