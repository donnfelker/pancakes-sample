/**
 * Author: Jeff Whelpley
 * Date: 2/12/15
 *
 * Simple layout which is really just a div with the page content inside
 */
module.exports = {
    view: function (div, pageContent) {
        return div(
            div('default layout'),
            div({ 'ui-view':  null }, pageContent)
        );
    }
};