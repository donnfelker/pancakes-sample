/**
 * Author: Jeff Whelpley
 * Date: 2/4/15
 *
 * Build file for Backstage
 */
var gulp        = require('gulp');
var pancakes    = require('gulp-pancakes');
var taste       = require('taste');
var batter      = require('batter');
var syrup       = require('pancakes-syrup');
var ngPlugin    = require('pancakes-angular');
var mongo       = require('pancakes-mongo');
var ingredients = require('./config/pancakes.config');
var config      = require('./config');

// initialize pancakes with the config for gh
pancakes.init(ingredients);

// whip the batter (i.e. add all the tasks)
batter.whip(gulp, taste, {
    outputPrefix:       'bs',
    targetDir:          __dirname,
    config:             config,
    plugins:            [syrup, ngPlugin],
    pancakes:           pancakes,
    pancakesConfig:     ingredients,
    appConfigs:         pancakes.cook('appConfigs'),
    unitTargetCode:     ['middleware/*.js', 'utils/*.js', 'services/*.js'],
    intTargetCode:      ['app/**/*.js', 'batch/*.js', 'services/**/*.js'],
    intBefore:          function () { return mongo.connect(config.mongo.url); },
    intAfter:           mongo.disconnect,
    karmaTargetCode:    ['dist/js/bs.libs.js', 'dist/js/bs.common.js'],
    tasksets: {
        'devrefresh':   ['assets', 'jsbuild', 'cssbuild'],
        'default':      ['lint', 'test', 'devrefresh']
    },
    cssLibs: [],
    cssCommon: [
        'app/common/styles/gh.less',
        'app/common/layouts/*.less',
        'app/common/pages/*.page.less',
        'app/common/partials/*.partial.less'
    ],
    jsLibs: [],
    jsAssets: [
        'node_modules/angular*/*.map',
        'node_modules/angular/angular.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/jquery/dist/jquery.min.map'
    ]
});
