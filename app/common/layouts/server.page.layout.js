/**
 * Author: Jeff Whelpley
 * Date: 4/8/14
 *
 * This is the primer page that is used for every page on the site
 */
module.exports = {

    view: function (html, head, base, meta, title, link, div, script, body, jif, model, config, pageContent) {
        var htmlOptions = { lang: model.lang };
        var app = model.appName;

        if (!model.serverOnly) { htmlOptions['ng-app'] = model.clientApp; }  // if server only, don't add angular
        model.pageHead = model.pageHead || {};

        var useSSL = (config[app] && config[app].useSSL !== undefined) ?
            config[app].useSSL : config.useSSL;
        var staticFileRoot = (useSSL ? 'https://' : 'http://') + config.staticFiles.assets + '/';
        var cssFile = model.versioningEnabled ?
        staticFileRoot + 'css/spl.all.'  + model.staticVersion + '.css' :
        staticFileRoot + 'css/spl.all.css';

        return html(htmlOptions, [
            head([
                base({ href: '/' }),
                meta({ charset: 'utf-8' }),

                // title and description unique for each page
                title(model.pageHead.title),
                meta({ name: 'description', content: model.pageHead.description }),
                meta({ name: 'keywords', content: model.pageHead.keywords }),

                // we have a responsive design, so no need to resize
                meta({ name: 'viewport', content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no' }),
                link({ rel: 'shortcut icon', href: staticFileRoot + 'img/ghicon.ico' }),

                //// tracking code will only get inserted for production
                //jif(model.env === 'production',
                //    script('var _gaq = _gaq || []; ' +
                //    '_gaq.push(["_setAccount", "' + model.gaTrackingCode + '"]); ' +
                //    '_gaq.push(["_setSiteSpeedSampleRate", 100]); ' +
                //    '_gaq.push(["_trackPageview"]); ' +
                //    '(function() { ' +
                //    'var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true; ' +
                //    'ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js"; ' +
                //    'var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s); ' +
                //    '})();')
                //),

                // all css is combined into one file
                link({ rel: 'stylesheet', href: cssFile }),

                // this will help with older IE versions
                '<!--[if lt IE 10]>',
                script({ src: 'http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js' }),
                '<![endif]-->'
            ]),
            body([

                // this is the core HTML content for an app
                pageContent,

                // only include javascript if we are doing client and server
                jif(!model.serverOnly, [

                    // this is all the data loaded by the server that the client needs (i.e. config, user data, etc.)
                    script('var clientData = ' + JSON.stringify(model.clientData)),

                    // we try to utilize the google CDN, but if that isn't available, get JS locally (as a fall back)
                    /* jshint quotmark:false */
                    script({ src: '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js' }),
                    script(" window.jQuery || document.write(unescape('%3Cscript src=\"" + staticFileRoot + "js/jquery.min.js\"%3E%3C/script%3E')) "),
                    script({ src: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.13/angular.min.js' }),
                    script(" window.angular || document.write(unescape('%3Cscript src=\"" + staticFileRoot + "js/angular.min.js\"%3E%3C/script%3E')) "),

                    // we have a JS lib file for 3rd party JS that doesn't change often and our 1 main custom JS file

                    jif(model.versioningEnabled, [
                        script({ src: staticFileRoot + 'js/spl.common.' + model.staticVersion + '.js' }),
                        script({ src: staticFileRoot + 'js/spl.' + app + '.' + model.staticVersion + '.js' })
                    ]),
                    jif(!model.versioningEnabled, [
                        script({ src: staticFileRoot + 'js/spl.libs.js' }),
                        script({ src: staticFileRoot + 'js/spl.common.js' }),
                        script({ src: staticFileRoot + 'js/spl.' + app + '.js' })
                    ])
                ])
            ])
        ]);
    }
};
