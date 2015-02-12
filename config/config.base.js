/**
 * Author: Jeff Whelpley
 * Date: 1/14/15
 *
 * The primary configuration file for Backstage
 */
var nconf = require('nconf');

module.exports = {
    projectPrefix:      'ps',
    env:                process.env.NODE_ENV || 'dev',
    baseHost:           'dev.foo.com',                 // base host name for all hosts (all other host names built on this)
    i18nDebug:          false,
    defaultLang:        'en',                           // default language is english
    cookieDomain:       '.foo.com',                     // we want all cookies on a domain cookie
    sessionSecret:      nconf.get('SESSION_SECRET'),
    longStackSupport:   true,
    corsHosts:          ['*.foo.com'],
    staticVersion:      nconf.get('CLIENT_VERSION'),
    container:          nconf.get('CONTAINER'),
    useSSL:             false,
    api: {
        useSSL:         false,
        port:           nconf.get('API_PORT') || nconf.get('PORT') || 8889,
        host:           'api.foo.com',
        version:        'v1'
    },
    domains: {
        foo:             ''
    },
    webserver: {
        port:           nconf.get('WEB_PORT') || nconf.get('PORT') || 8182,
        defaultApp:     'foo'
    },
    logging: {
        level:          'debug',
        transport:      ['console']
    },
    staticFiles: {
        assets:         'assets.dev.foo.com/dist'
    },
    mongo: {
        debug:          nconf.get('DEBUG_MONGOOSE'),
        url:            nconf.get('MONGO_URL'),
        host:           nconf.get('MONGO_HOST'),
        database:       nconf.get('MONGO_DATABASE'),
        username:       nconf.get('MONGO_USERNAME'),
        password:       nconf.get('MONGO_PASSWORD'),
        archive:        nconf.get('MONGO_ARCHIVE')
    },
    security: {
        siteId:         nconf.get('SITE_ID'),
        siteSecret:     nconf.get('SITE_SECRET')
    }
};