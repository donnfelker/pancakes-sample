/**
 * Author: Jeff Whelpley
 * Date: 2/12/15
 *
 * App configuration file for the foo app
 */
module.exports = function () {
    return {
        defaultLayout:          'default',
        clientDependencies:     ['splCommonApp'],
        routes: [
            {
                urls:   ['/'],
                name:   'foo.home'
            }
        ]
    };
};