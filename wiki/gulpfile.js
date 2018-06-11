var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var log = require('fancy-log');
var uglify = require('gulp-uglify');
var mainBowerFiles = require('main-bower-files');
var imagemin = require('gulp-imagemin');
var runsequence = require('run-sequence');

var upload = require('./upload.js');

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
    images: './images/*{png,jpg}'
}

const dests = {
    index: './build/',
    pages: './build/pages/',
    templates: './build/templates/',
    css: './build/css/',
    js: './build/js/',
    bowerjs: './build/dist/js/',
    bowercss: './build/dist/css/',
    images: './build/images/'
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
    .pipe(uglify().on('error', log))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(dests.bowerjs))
);

gulp.task('bower:css', () => gulp
    .src(mainBowerFiles('**/*.css'), {base: './bower_components' })
    .pipe(concat('vendor.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(dests.bowercss))
);

gulp.task('images', function() {
    return gulp.src(srcs.images)
    .pipe(imagemin())
    .pipe(gulp.dest(dests.images))
})

gulp.task('push', function(){
    upload()
});

//gulp.task('publish', ['default', 'push']);

gulp.task('default', [ 'index', 'pages', 'templates', 'css', 'js', 'images', 'bower:js', 'bower:css' ]);
gulp.task('dev', ['default']);
gulp.task('live', function(done) {
    runsequence('default', 'push');
});