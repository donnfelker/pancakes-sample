/**
 * Author: Jeff Whelpley
 * Date: 1/14/15
 *
 * Initialize pancakes for Backstage
 */
var PancakesAngular = require('pancakes-angular');
var PancakesHapi    = require('pancakes-hapi');
var MongoAdapter    = require('pancakes-mongo').Adapter;
var originalRecipe  = require('pancakes-recipe');
var path            = require('path');

// most of the config values
module.exports = {
    debug:              false,
    preload:            ['utils'],
    rootDir:            path.join(__dirname, '/..'),
    require:            require,
    clientPlugin:       PancakesAngular,
    serverPlugin:       PancakesHapi,
    modulePlugins:      [originalRecipe],
    componentPrefix:    'ps',
    pluginOptions: {    // these are used for the pancakes plugin to gen client side code
        prefix:         'ps',
        clientType:     'ng',
        ngType:         'factory',
        transformer:    'basic',
        appName:        'common',
        clientAliases: {
            Q:          '$q',
            tokens:     '$stateParams'
        }
    },
    adapterMap: {
        persist:        'mongo'
    },
    adapters: {
        mongo:          MongoAdapter
    },
    serverAliases: {
        cls:            'continuation-local-storage',
        mongo:          'pancakes-mongo'
    }
};