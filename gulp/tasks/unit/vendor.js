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

console.log(mainBowerFiles('**/*.js'));
console.log(mainBowerFiles('**/*.css'));

// Task to stage library JS, such as JQuery, Bootstrap and any future live dependencies.
// Note: See bower.json for exceptions important to successfully uploading bootstrap.
gulp.task('build:bower:js', () => {
    var src = mainBowerFiles('**/*.js')

    if (src.length == 0) {
        return Promise.resolve();
    }
    else {
        return gulp.src(src, {base: 'bower_components' })
        .pipe(gulpif(env.minify, uglify().on('error', log)))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(dests.bowerjs))
    }
});

// Task to stage library CSS, particularly Bootstrap.
gulp.task('build:bower:css', () => {
    var src = mainBowerFiles('**/*.css');

    if (src.length == 0) {
        return Promise.resolve();
    }
    else {
        return gulp.src(src, {base: 'bower_components' })
        .pipe(postcss([ autoprefixer(config.browserslist) ]))
        .pipe(gulpif(env.minify, minifyCSS()))
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(dests.bowercss))
    }
});