var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');

//var upload = require('./upload');

function prepHTML(src, dest) {
    return gulp.src(src)
    .pipe(gulp.dest(dest));
}

// TODO: Insert Handlebars into pipeline to add successful templating
gulp.task('index', prepHTML('./index.html', 'build/'));

gulp.task('pages', prepHTML('./pages/*.html', 'build/pages'));

gulp.task('templates', prepHTML('./templates/*.html', 'build/templates'));

// Optional: Include less() in pipeline before minifyCSS
gulp.task('css', function(){
    return gulp.src('styles/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
});

gulp.task('js', function(){
    return gulp.src('scripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('wiki.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
});

/*
gulp.task('push', function(){
    upload()
});
*/

//gulp.task('publish', ['default', 'push']);

gulp.task('default', [ 'index', 'pages', 'templates', 'css', 'js' ]);
