var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var log = require('fancy-log');
var uglify = require('gulp-uglify');
var mainBowerFiles = require('main-bower-files');

//var upload = require('./upload');

function prepHTML(src, dest) {
    return function() {
        gulp.src(src)
    .pipe(gulp.dest(dest))
    }
}

const srcs = {
    index: './index.html',
    pages: './pages/*.html',
    templates: './templates/*.html',
    css: './styles/*.css',
    js: './scripts/*.js',
}

const dests = {
    index: './build/',
    pages: './build/pages/',
    templates: './build/templates/',
    css: './build/css/',
    js: './build/js/',
    bowerjs: './build/dist/js/',
    bowercss: './build/dist/css/'
}

// TODO: Insert Handlebars into pipeline to add successful templating
gulp.task('index', prepHTML(srcs.index, dests.index));

gulp.task('pages', prepHTML(srcs.pages, dests.pages));

gulp.task('templates', prepHTML(srcs.templates, dests.templates));

// Optional: Include less() in pipeline before minifyCSS
gulp.task('css', function(){
    return gulp.src(srcs.css)
    .pipe(minifyCSS())
    .pipe(gulp.dest(dests.css))
});

//.pipe(uglify().on('error', log))
gulp.task('js', function(){
    return gulp.src(srcs.js)
    .pipe(sourcemaps.init())
    .pipe(concat('wiki.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dests.js))
});

gulp.task('bower:js', () => gulp
    .src(mainBowerFiles('**/*.js'), {base: './bower_components' })
    .pipe(concat('vendor.js'))
    .pipe(uglify().on('error', log))
    .pipe(gulp.dest(dests.bowerjs))
);

gulp.task('bower:css', () => gulp
    .src(mainBowerFiles('**/*.css'), {base: './bower_components' })
    .pipe(concat('vendor.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(dests.bowercss))
);

/*
gulp.task('push', function(){
    upload()
});
*/

//gulp.task('publish', ['default', 'push']);

gulp.task('default', [ 'index', 'pages', 'templates', 'css', 'js', 'bower:js', 'bower:css' ]);
