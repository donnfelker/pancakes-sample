/**
 * Author: Jeff Whelpley
 * Date: 2/12/15
 *
 * An in memory cache
 */
module.exports = function (Q, _, lruCache) {

    // during init() we will set all the remote caches; local ones added ad hoc in set()
    var caches = {};

    /**
     * Create local cache with same interface as remote
     * @returns {{get: Function, set: *}}
     */
    function createLocalCache() {
        var localCache = lruCache({ max: 100, maxAge: 60000 });
        return {
            get: function (key) {
                return new Q(localCache.get(key));
            },
            set: function (key, value) {
                localCache.set(key, value);
            }
        };
    }

    /**
     * Creating a new cache adapter.
     * @constructor
     */
    function CacheAdapter(resource) {
        this.name = resource.name;
    }

    // add static functions to the class
    _.extend(CacheAdapter, {
        caches: caches  // exposing for testing purposes
    });

    /**
     * Get a value from cache
     * @param req
     */
    CacheAdapter.prototype.get = function get(req) {
        var cache = caches[this.name];
        return cache ? cache.get(req.key) : new Q(null);
    };

    /**
     * Set a value in the cache
     * @param req
     */
    CacheAdapter.prototype.set = function set(req) {
        var cache = caches[this.name];
        if (!cache) {
            cache = caches[this.name] = createLocalCache();
        }

        cache.set(req.key, req.value);
    };

    // return the class
    return CacheAdapter;
};