var path = require('path');

var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-csso');
var mainNpmFiles = require('gulp-main-npm-files');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var filter = require('gulp-filter');

var log = require('fancy-log');

var config = global.wikibrick;
var targets = config.targets;
var env = config.environment;
var srcs = targets.buildsrc;
var dests = targets.buildtarget;

var npmoptions = {
    nodeModulesPath: path.join(targets.root, '/node_modules'),
    packageJsonPath: path.join(targets.root, '/package.json')
}
// Task to stage library JS, such as JQuery, Bootstrap and any future live dependencies.
// Note: See bower.json for exceptions important to successfully uploading bootstrap.
gulp.task('build:vendor:js', () => gulp
    .src(mainNpmFiles(npmoptions), {base: './'})
    .pipe(filter(['**/*.js']))
    .pipe(gulpif(env.minify, uglify().on('error', log)))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(dests.vendorjs))
);

// Task to stage library CSS, particularly Bootstrap.
gulp.task('build:vendor:css', () => gulp
    .src(mainNpmFiles(npmoptions), {base: './'})
    .pipe(filter(['**/*.css']))
    .pipe(concat('vendor.css'))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulpif(env.minify, minifyCSS()))
    .pipe(gulp.dest(dests.vendorcss))
);