/**
 * Author: Jeff Whelpley
 * Date: 1/14/15
 *
 * The base environment variables for the Backstage apps
 */
module.exports = {

    base: {
        'DEBUG_MONGOOSE':           false,
        'MONGO_URL':                'mongodb://localhost:27017/sample',
        'MONGO_HOST':               'localhost:27017',
        'MONGO_DATABASE':           'gethuman',
        'MONGO_USERNAME':           '',
        'MONGO_PASSWORD':           '',
        'MONGO_ARCHIVE':            'mongodb://localhost:27017/archive',
        'SESSION_SECRET':           'blahblahblah',
        'SITE_ID':                  'blahblahblah',
        'SITE_SECRET':              'blahblahblah'
    },

    dev: {

    },

    staging: {
        'API_PORT':                 '80',
        'NODE_ENV':                 'staging'
    },

    production: {
        'API_PORT':                 '80',
        'NODE_ENV':                 'production'
    }
};