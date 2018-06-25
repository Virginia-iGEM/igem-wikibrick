var gulp = require('gulp');
var gulpif = require('gulp-if');
var markdown = require('gulp-markdown');
var cheerio = require('gulp-cheerio');
var Promise = require('bluebird');
var browsersync = require('browser-sync');
var replace = require('gulp-replace');

const path = require('path');
const url = require('url');
const fs = require('fs');

const targets = require(global.targets);
var srcs = targets.buildsrc;
var dests = targets.buildtarget;

const urls = targets.urls;
const suffixes = targets.suffixes;

relative2absolute = function($, file) {
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

        // Unwrap head and body elements
        unwrap = $('head, body').each(function () {
            var u = $(this);
            u.replaceWith(u.html());
        })

        Promise.all([images, stylesheets, scripts, index, links]).then(resolve);
    });
}
// Function shared by all HTML processing tasks for development builds. 
// Currently just stages HTML files to build folder.

function prepHTML(src, dest) {
    return function() {
        return gulp.src(src)
        /*.pipe(markdown()) // Run file through the markdown processor ony if it is a markdown file
        .pipe(rename(function (path) {
            path.extname = '.html';
        }))*/
        .pipe(gulpif(global.live(), cheerio({
            run: relative2absolute,
            parserOptions: {
                decodeEntities: false
            }
        }))) // Think about using lazypipe here
        .pipe(gulpif(global.live(), replace(/<!DOCTYPE html>/g, '')))
        .pipe(gulpif(global.serve(), browsersync.stream()))
        .pipe(gulp.dest(dest));
    }
};

// TODO: Allow tasks to pass in a prepHTML function to support dev/live build differences

// Task to prep index.html which is uploaded as the home page
gulp.task('build:index', prepHTML(srcs.index, dests.index));

// Task to prep all non-home pages, I.E. Project Description, Team, etc.
gulp.task('build:pages', prepHTML(srcs.pages, dests.pages));

// Task to prep templates like headers, footers, etc. that can be reused on many pages
gulp.task('build:templates', prepHTML(srcs.templates, dests.templates));