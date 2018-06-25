var gulp = require('gulp');
var uglify = require('gulp-uglify');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');

var log = require('fancy-log');

var targets = require(global.targets);
var srcs = targets.buildsrc;
var dests = targets.buildtarget;

// Task to stage library JS, such as JQuery, Bootstrap and any future live dependencies.
// Note: See bower.json for exceptions important to successfully uploading bootstrap.
gulp.task('build:bower:js', () => gulp
    .src(mainBowerFiles('**/*.js'), {base: 'bower_components' })
    .pipe(uglify().on('error', log))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(dests.bowerjs))
);

// Task to stage library CSS, particularly Bootstrap.
gulp.task('build:bower:css', () => gulp
    .src(mainBowerFiles('**/*.css'), {base: 'bower_components' })
    .pipe(concat('vendor.css'))
    //.pipe(minifyCSS())
    .pipe(gulp.dest(dests.bowercss))
);