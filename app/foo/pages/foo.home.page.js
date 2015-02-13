/**
 * Author: Jeff Whelpley
 * Date: 2/12/15
 *
 * Simple home page for foo
 */
module.exports = {
    model: function () {
        return { moo: 'choo' };
    },

    view: function (div) {
        return div(
            div({ 'ng-bind': 'moo' }),
            div('hello, world'),
            div({ 'spl-something': null }),
            div({ 'ng-bind': 'wu' })
        );
    },

    controller: function ($scope) {
        $scope.wu = 'sasa';
    }
};