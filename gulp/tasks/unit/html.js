var gulp = require('gulp');
var gulpif = require('gulp-if');
var markdown = require('gulp-markdown');
var cheerio = require('gulp-cheerio');
var Promise = require('bluebird');
var browsersync = require('browser-sync');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var _ = require('lodash');
var banner = require('../../banner');
var lazypipe = require('lazypipe');
var handlebars = require('gulp-compile-handlebars');
var pandoc = require('gulp-pandoc');
var glob = require('globby');
var tap = require('gulp-tap');

const path = require('path');
const url = require('url');
const fs = require('fs');

var config = global.wikibrick;
var targets = config.targets;
var env = config.environment;
var srcs = targets.buildsrc;
var dests = targets.buildtarget;

const urls = targets.urls;
const suffixes = targets.suffixes;

var urlIsRelative = (str) => {
    return !str.match(/^https?:\/\//);
}

relative2absolute = function($, file) {
    return new Promise((resolve, reject) => {

        // This part is synchronous and probably doesn't need to be
        var uploadmap = JSON.parse(fs.readFileSync('./build/uploadmap.json', 'utf8'));
        if(uploadmap == '' || uploadmap == null) {
            console.log("No uploadmap found, image paths will not be substituted. Run push:images to generate uploadmap.")
        }

        // Set absolute paths for images
        images =  $('img').each(function () {
            var img = $(this);
            var relname = img.attr('src');
            if (relname != null && urlIsRelative(relname) && uploadmap.hasOwnProperty(path.basename(relname))) { // Check to see if a map exists, otherwise do not change
                img.attr('src', uploadmap[path.basename(relname)]);
            }
        });

        // Set absolute path for stylesheets
        stylesheets = $('link[rel=stylesheet]', 'head').each(function () {
            var link = $(this);
            var relname = link.attr('href');
            if (relname != null && urlIsRelative(relname)) {
                link.attr('href', urls.css.concat(path.basename(relname).replace('.css', '')).concat(suffixes.css));
            }
        });

        // Set absolute paths for scripts
        scripts = $('script', 'head').each(function () {
            var script = $(this);
            var relname = script.attr('src');
            if (relname != null && urlIsRelative(relname)) {
                script.attr('src', urls.js.concat(path.basename(relname).replace('.js', '')).concat(suffixes.js));
            }
            
            if(script.text() != null) {
                urlReplace = /\.load\( *'(\.)?(\/)?(.*)\.html' *\);/gi;

                script.text(script.text().replace(urlReplace, function (match, $1, $2, $3, offest, original) {
                    return ".load('".concat(urls.template).concat(path.basename($3)).concat(targets.suffixes.js).concat("');");
                }));
            }
        });

        // Set absolute path for index
        index = $('a[href="/index.html"]').each(function () {
            var a = $(this);
            a.attr('href', urls.standard);
        });

        // Set absolute path for all internal links
        links = $('a').each(function () {
            var a = $(this);
            var relname = a.attr('href');
            if (relname != null && relname != "index.html" && urlIsRelative(relname)) {
                if (!relname.match(/^(\.)?(\/)?pages\//)) {
                    a.attr('href', urls.standard.concat(path.basename(a.attr('href')).replace('.html', '')));
                }
                else { //Todo: Make this support nested pages
                    a.attr('href', urls.standard.concat(path.basename(a.attr('href')).replace('.html', '')))
                }
            }
        })

        // Unwrap head and body elements
        unwrap = $('head, body').each(function () {
            var u = $(this);
            u.replaceWith(u.html());
        })

        // Remove iGEM Navbar Placeholder
        removeplaceholders = $('#igem-navbar-placeholder').replaceWith('');

        Promise.all([images, stylesheets, scripts, index, links, removeplaceholders]).then(resolve);
    });
}
// Function shared by all HTML processing tasks for development builds. 
// Currently just stages HTML files to build folder.

var prepHTML = lazypipe()
    .pipe(() => gulpif(env.relative2absolute, cheerio({
        run: relative2absolute,
        parserOptions: {
            decodeEntities: false
        }
    }))) // Think about using lazypipe here
    .pipe(() => gulpif(env.relative2absolute, replace(/<!DOCTYPE html>/g, '')))
    .pipe(() => gulpif(env.banner, banner.html()))
    .pipe(() => gulpif(env.serve, browsersync.stream()))

var renameToHTML = lazypipe()
    .pipe(rename, function(path) {
        path.extname = '.html';
    })

var prepHBS = lazypipe()
    .pipe(renameToHTML)
    .pipe(tap, function(file, t) {
        return t.through(handlebars, [{}, {
        ignorePartials: true,
        // The world's shittiest hack:tm: to get around the erorr thrown by gulp-compile-handlebars
        // when srcs.partials is empty and no batch files are available
        batch: function() {
            if (glob.sync(srcs.partials).length > 0) {
                return [srcs.partials];
            }
            else {
                return;
            }
        }(),
        helpers: config.handlebars.helpers(file, t)
    }])})


// TODO: Allow tasks to pass in a prepHTML function to support dev/live build differences

// Task to prep all non-home pages, I.E. Project Description, Team, etc.
gulp.task('build:html:pages', () =>
    gulp.src(srcs.htmlpages)
    .pipe(prepHTML())
    .pipe(gulp.dest(dests.pages))
);

// Task to prep all non-home pages, I.E. Project Description, Team, etc.
gulp.task('build:hbs:pages', () =>
    gulp.src(srcs.hbspages)
    .pipe(prepHBS())
    .pipe(prepHTML())
    .pipe(renameToHTML())
    .pipe(gulp.dest(dests.pages))
);

gulp.task('build:html:content', () =>
    gulp.src(srcs.htmlcontent)
    .pipe(prepHTML())
    .pipe(gulp.dest(dests.content))
);

gulp.task('build:markdown:content', () =>
    gulp.src(srcs.markdowncontent)
    .pipe(markdown())
    .pipe(prepHTML())
    .pipe(renameToHTML())
    .pipe(gulp.dest(dests.content))
);

gulp.task('build:docx:content', () =>
    gulp.src(srcs.docxcontent)
    .pipe(prepHTML())
    .pipe(pandoc({
        from: 'docx',
        to: 'html5',
        ext: '.html'
    }))
    .pipe(gulp.dest(dests.content))
);

// Task to prep templates like headers, footers, etc. that can be reused on many pages
gulp.task('build:templates', () =>
    gulp.src(srcs.templates)
    .pipe(prepHTML())
    .pipe(gulp.dest(dests.templates))
);