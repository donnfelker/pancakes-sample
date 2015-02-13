/**
 * Author: Jeff Whelpley
 * Date: 2/18/14
 *
 * A simple adapter to call out to API from another node process
 */
module.exports = function (Q, _, request, config, mongo, cls) {

    var admin = {
        _id:  mongo.newObjectId('000000000000000000000000'),
        name: 'systemAdmin',
        type: 'user',
        role: 'admin'
    };
    var useSSL = (config.api && config.api.serverUseSSL !== undefined) ?
        config.api.serverUseSSL : config.useSSL;
    var headers = {
        'x-partner-id':       config.security.siteId,
        'x-partner-secret':   config.security.siteSecret
    };
    var baseUrl = (useSSL ? 'https://' : 'http://') + config.api.host;

    var port = config.api.port;
    if (port !== 80 && port !== 443) {
        baseUrl += ':' + port;
    }
    baseUrl += '/' + config.api.version;

    /**
     * Initialize the methods for this interface using the resource. This will
     * loop through the routes defined in the api section of the resource file
     * and auto generate method interfaces which all end up make REST API calls.
     *
     * @param resource
     * @constructor
     */
    var RestapiAdapter = function (resource) {
        this.admin = admin;
        this.resource = resource || {};

        // loop through API interface for resource to get methods to expose
        var me = this;
        _.each(resource.api, function (methodInfo, httpMethod) {
            _.each(methodInfo, function (operation, path) {
                me[operation] = function (req) {
                    return me.send(httpMethod, path, req);
                };
            });
        });
    };

    /**
     * Send the request to the restful endpoint
     * @param httpMethod
     * @param path
     * @param req
     */
    RestapiAdapter.prototype.send = function (httpMethod, path, req) {
        req = req || {};
        httpMethod = httpMethod.toUpperCase();

        var deferred = Q.defer();
        var url = baseUrl + path;
        var data = req.data || {};          // separate out data from request
        delete req.data;

        var isAdmin = req.caller && req.caller.role === 'admin';
        delete req.caller;

        var id = req._id || data._id;       // get id from request or data
        if (req._id) { delete req._id; }    // delete id from request so no dupe

        var session = cls.getNamespace('appSession');
        var caller = session && session.get('caller');
        if (caller && !isAdmin) {
            _.extend(req, {                 // onBehalfOf used by API to know who is the caller
                onBehalfOfType: caller.type,
                onBehalfOfId:   caller._id + '',
                onBehalfOfRole: caller.role,
                onBehalfOfName: caller.name,
                onBehalfOfVisitorId: caller.visitorId + ''
            });
        }

        _.each(req, function (val, key) {
            if (!_.isString(val)) { req[key] = JSON.stringify(val); }
        });

        var reqConfig = {
            headers:    headers,
            url:        url.replace('{_id}', id + ''),
            method:     httpMethod,
            qs:         _.isEmpty(req) ? undefined : req,
            json:       _.isEmpty(data) ? true : data
        };

        request(reqConfig, function (err, resp, obj) {
            if (err)                            { deferred.reject(err); }
            else if (resp.statusCode !== 200)   { deferred.reject(obj); }
            else                                { deferred.resolve(obj); }
        });

        return deferred.promise;
    };

    // return the class
    return RestapiAdapter;
};
