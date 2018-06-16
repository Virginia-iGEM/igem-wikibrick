const path = require('path');
const url = require('url');
const fs = require('fs');

const targets = require('./js/targets.js');

const urls = targets.urls;
const suffixes = targets.suffixes;

module.exports = function($, file) {
    return new Promise((resolve, reject) => {

        // This part is synchronous and probably doesn't need to be
        var imagemap = JSON.parse(fs.readFileSync('./build/imagemap.json', 'utf8'));

        // Set absolute paths for images
        images =  $('img').each(function () {
            var img = $(this);
            img.attr('src', imagemap[path.basename(img.attr('src'))]);
        });

        // Set absolute path for stylesheets
        stylesheets = $('link[rel=stylesheet]', 'head').each(function () {
            var link = $(this);
            link.attr('href', urls.css.concat(path.basename(link.attr('href')).replace('.css', '')).concat(suffixes.css));
        });

        // Set absolute paths for scripts
        scripts = $('script', 'head').each(function () {
            var script = $(this);
            if (script.attr('src') != null) {
                script.attr('src', urls.js.concat(path.basename(script.attr('src')).replace('.js', '')).concat(suffixes.js));
            }
            
            /*
            if(script.text() != null) {
                urlReplace = new RegExp("\\.load\\( *'\\.\\/(.*)\\.html' *\\);", 'g');

                script.text(script.text().replace(urlReplace, function (match, $1, offest, original) {
                    return ".load('".concat(urls.template).concat(path.basename($1)).concat("');");
                }));
            }
            */
        });

        // Set absolute path for index
        index = $('a[href="index.html"]').each(function () {
            var a = $(this);
            a.attr('href', urls.standard);
        });

        // Set absolute path for all internal links
        links = $('a[class=internal]').each(function () {
            var a = $(this);
            a.attr('href', urls.standard.concat(path.basename(a.attr('href')).replace('.html', '')));
        })

        Promise.all([images, stylesheets, scripts, index, links]).then(resolve);
    });
}