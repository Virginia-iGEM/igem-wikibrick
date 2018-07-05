var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-csso');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var log = require('fancy-log');

var config = global.wikibrick;
var targets = config.targets;
var env = config.environment;
var srcs = targets.buildsrc;
var dests = targets.buildtarget;

// Task to stage library JS, such as JQuery, Bootstrap and any future live dependencies.
// Note: See bower.json for exceptions important to successfully uploading bootstrap.
gulp.task('build:bower:js', () => gulp
    .src(mainBowerFiles('**/*.js'), {base: 'bower_components' })
    .pipe(gulpif(env.minify, uglify().on('error', log)))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(dests.bowerjs))
);

// Task to stage library CSS, particularly Bootstrap.
gulp.task('build:bower:css', () => gulp
    .src(mainBowerFiles('**/*.css'), {base: 'bower_components' })
    .pipe(concat('vendor.css'))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulpif(env.minify, minifyCSS()))
    .pipe(gulp.dest(dests.bowercss))
);