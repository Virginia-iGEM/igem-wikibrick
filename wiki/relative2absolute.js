module.exports = function($, file) {
    const path = require('path');
    const url = require('url');
    const fs = require('fs');

    const urls = {
        standard: 'http://2018.igem.org/Team:Virginia/',
        template: 'http://2018.igem.org/Template:Virginia/',
        js: 'http://2018.igem.org/Template:Virginia/js/',
        css: 'http://2018.igem.org/Template:Virginia/css/',
        images: 'http://2018.igem.org/File:T--Virginia--2018_'
    }

    // This part is synchronous and probably doesn't need to be
    var imagemap = JSON.parse(fs.readFileSync('./build/imagemap.json', 'utf8'));

    const suffixes = {
        js: '?action=raw&ctype=text/javascript',
        css: '?action=raw&ctype=text/css'
    }

    // Set absolute paths for images
    $('img').each(function () {
        var img = $(this);
        img.attr('src', imagemap[path.basename(img.attr('src'))]);
    });

    // Set absolute path for stylesheets
    $('link[rel=stylesheet]', 'head').each(function () {
        var link = $(this);
        link.attr('href', urls.css.concat(path.basename(link.attr('href')).replace('.css', '')).concat(suffixes.css));
    });

    // Set absolute paths for scripts
    $('script', 'head').each(function () {
        var script = $(this);
        script.attr('src', urls.js.concat(path.basename(script.attr('src')).replace('.js', '')).concat(suffixes.js));
    });

    // Set absolute path for index
    $('a[href="index.html"]').each(function () {
        var a = $(this);
        a.attr('href', urls.standard);
    });

    // Set absolute path for all internal links
    $('a[class=internal]').each(function () {
        var a = $(this);
        a.attr('href', urls.standard.concat(path.basename(a.attr('href')).replace('.html', '')));
    })
}