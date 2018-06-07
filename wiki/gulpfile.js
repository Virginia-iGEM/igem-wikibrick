var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
//var upload = require('./upload');

// TODO: Insert Handlebars into pipeline to add successful templating
gulp.task('index', function() {
    return gulp.src('./index.html')
    .pipe(gulp.dest('build/'))
});

gulp.task('pages', function() {
    return gulp.src('./pages/*.html')
    .pipe(gulp.dest('build/pages'))
});

gulp.task('templates', function() {
    return gulp.src('./templates/*.html')
    .pipe(gulp.dest('build/templates'))
});

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