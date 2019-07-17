var path = require('path');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var es = require('event-stream');

var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var bourbon = require('node-bourbon').includePaths;
var neat = require('node-neat').includePaths;
var gulpif = require('gulp-if');
var browsersync = require('browser-sync');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var banner = require('../../banner');
var log = require('fancy-log');
var uglify = require('gulp-uglify');
var glob = require('glob');

var config = global.wikibrick;
var env = config.environment;
var srcs = config.targets.buildsrc;
var dests = config.targets.buildtarget;

var urlIsRelative = require('./relative2absolute').urlIsRelative;

var relative2absolute = function(css, opts) { // relative2absolute function for converting @font-face srcs
    var uploadmap = require('./relative2absolute').uploadmap();

    css.walkDecls(function(decl) {
        //console.log(decl);
        if (decl.prop === 'src' && urlIsRelative(decl.value)) {
            //console.log(decl.value.replace(/(url\("|"\))/gi,'')); 
            decl.value = 'url("' + uploadmap.file[path.parse(decl.value.replace(/(url\("|"\))/gi,''))] + '")'; // Remove url identifier for uploadmap
        }
    });
};

var importantify = function(css, opts) { // importantify adds !important to literally every CSS declaration. Yeah. I know.
    css.walkDecls(function (decl) {
        decl.value = decl.value + " !important";
    });
};

var postcssplugins = [
    autoprefixer(config.browserslist)
];

if (env.relative2absolute) {
    postcssplugins.push(relative2absolute);
}

if (env.importantify) {
    postcssplugins.push(importantify);
}

// Task to minify and stage our in-house JavaScript files.
// TODO: Fix JS minificatoin for in-house JS
// gulp + browserify + glob recipe courtesy of Hafiz Ismail
// https://wehavefaces.net/gulp-browserify-the-gulp-y-way-bb359b3f9623

gulp.task('build:js', function() {
    if (env.browserify) {
        return new Promise(function(resolve, reject) {
            glob(srcs.js, {}, function(err, files) {
                if (err) {reject(err);}

                var b = browserify({
                    debug: env.debug
                });
                files.forEach(function (file) {
                    b.add(file);
                });
                b.bundle()
                    .pipe(source('wiki.js'))
                    .pipe(buffer())
                    .pipe(gulpif(env.minify, uglify()))
                    .pipe(gulpif(env.banner, banner.js()))
                    .pipe(gulpif(env.serve, browsersync.stream()))
                    .pipe(gulp.dest(dests.js));
                resolve();
            });
        });
    }
    else {
        return gulp.src(srcs.js)
            .pipe(sourcemaps.init()) // Used for debugging
        //.pipe(uglify().on('error', log)) // Minification increases load speeds
            .pipe(gulpif(!env.noconcat, concat('wiki.js'))) // Note use of concat to compact all JS files into one
            .pipe(sourcemaps.write())
            .pipe(gulpif(env.banner, banner.js()))
            .pipe(gulpif(env.serve, browsersync.stream()))
            .pipe(gulp.dest(dests.js));
    }
});

// Task to minify and stage our in-house CSS stylesheets
// Optional: Include less() in pipeline before minifyCSS to use {less} CSS package
gulp.task('build:css', function() {
    return gulp.src(srcs.css)
        .pipe(postcss(postcssplugins))
        .pipe(gulpif(env.minify, minifyCSS())) // Minification increases load speeds
        .pipe(gulpif(env.banner, banner.css()))
        .pipe(gulpif(env.serve, browsersync.stream()))
        .pipe(gulp.dest(dests.css));
});

gulp.task('build:scss', function() {
    return gulp.src(srcs.scss)
        .pipe(sass({
                includePaths: [].concat(bourbon, neat)
            }) // Bourbon + neat includepaths
            .on('error', sass.logError))
        .pipe(postcss(postcssplugins))
        .pipe(gulpif(env.minify, minifyCSS())) // Minification increases load speeds
        .pipe(gulpif(env.banner, banner.css()))
        .pipe(gulpif(env.serve, browsersync.stream()))
        .pipe(gulp.dest(dests.css));
});

// Task to stage all images, .png or .jpg
gulp.task('build:images', function() {
    return gulp.src(srcs.images)
        .pipe(gulpif(env.minify, imagemin())) // Minification increases load speeds
        .pipe(gulpif(env.serve, browsersync.stream()))
        .pipe(gulp.dest(dests.images));
});

// Task to stage all images, .png or .jpg
gulp.task('build:fonts', function() {
    return gulp.src(srcs.fonts)
        .pipe(gulpif(env.serve, browsersync.stream()))
        .pipe(gulp.dest(dests.fonts));
});
