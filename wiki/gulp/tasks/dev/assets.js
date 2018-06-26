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

var targets = require(global.targets);
var srcs = targets.buildsrc;
var dests = targets.buildtarget;

// Task to minify and stage our in-house JavaScript files.
// TODO: Fix JS minificatoin for in-house JS
gulp.task('build:js', function(){
    return gulp.src(srcs.js)
    .pipe(sourcemaps.init()) // Used for debugging
    //.pipe(uglify().on('error', log)) // Minification increases load speeds
    .pipe(concat('wiki.js')) // Note use of concat to compact all JS files into one
    .pipe(sourcemaps.write())
    .pipe(gulpif(global.serve, browsersync.stream()))
    .pipe(gulp.dest(dests.js));
});

// Task to minify and stage our in-house CSS stylesheets
// Optional: Include less() in pipeline before minifyCSS to use {less} CSS package
gulp.task('build:css', function(){
    return gulp.src(srcs.css)
    .pipe(postcss([ autoprefixer() ]))
    .pipe(minifyCSS()) // Minification increases load speeds
    .pipe(gulpif(global.serve, browsersync.stream()))
    .pipe(gulp.dest(dests.css));
});

gulp.task('build:sass', function(){
    return gulp.src(srcs.scss)
    .pipe(sass({includePaths: [].concat(bourbon, neat)})
        .on('error', sass.logError)) // Minification increases load speeds
    .pipe(gulpif(global.serve, browsersync.stream()))
    .pipe(gulp.dest(dests.css));
});

// Task to stage all images, .png or .jpg
gulp.task('build:images', function() {
    return gulp.src(srcs.images)
    .pipe(imagemin()) // Minification increases load speeds
    .pipe(gulpif(global.serve, browsersync.stream()))
    .pipe(gulp.dest(dests.images));
});