// See https://github.com/Mantissa-23/VGEM-2018/tree/master/wiki for descriptions of packages
var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var log = require('fancy-log');
var uglify = require('gulp-uglify');
var mainBowerFiles = require('main-bower-files');
var imagemin = require('gulp-imagemin');
var runsequence = require('run-sequence');
var gulpif = require('gulp-if');
var cheerio = require('gulp-cheerio');
var markdown = require('gulp-markdown');

var upload = require('./upload.js');

// Function shared by all HTML processing tasks for development builds. 
// Currently just stages HTML files to build folder.
function prepHTML(src, dest) {
    return function() {
        gulp.src(src)
        .pipe(gulpif(livebuild, cheerio(function ($, file) {
            // Insert HTML parsing here
        })))
        .pipe(gulp.dest(dest))
    }
}

// TODO: Add prepHTMLLive function for live builds

// Listed file sources for all tasks. Note use of glob patterns and wildcarding.
const srcs = {
    index: './index.html',
    pages: './pages/*.html',
    templates: './templates/*.html',
    css: './styles/*.css',
    js: './scripts/*.js',
    images: './images/*.{png,jpg}'
}

// Listed destination directories for all builds.
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

// TODO: Allow tasks to pass in a prepHTML function to support dev/live build differences

// Task to prep index.html which is uploaded as the home page
gulp.task('index', prepHTML(srcs.index, dests.index));

// Task to prep all non-home pages, I.E. Project Description, Team, etc.
gulp.task('pages', prepHTML(srcs.pages, dests.pages));

// Task to prep templates like headers, footers, etc. that can be reused on many pages
gulp.task('templates', prepHTML(srcs.templates, dests.templates));

// Task to minify and stage our in-house CSS stylesheets
// Optional: Include less() in pipeline before minifyCSS to use {less} CSS package
gulp.task('css', function(){
    return gulp.src(srcs.css)
    .pipe(minifyCSS()) // Minification increases load speeds
    .pipe(gulp.dest(dests.css))
});

// Task to minify and stage our in-house JavaScript files.
// TODO: Fix JS minificatoin for in-house JS
gulp.task('js', function(){
    return gulp.src(srcs.js)
    .pipe(sourcemaps.init()) // Used for debugging
    //.pipe(uglify().on('error', log)) // Minification increases load speeds
    .pipe(concat('wiki.min.js')) // Note use of concat to compact all JS files into one
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dests.js))
});

// Task to stage library JS, such as JQuery, Bootstrap and any future live dependencies.
// Note: See bower.json for exceptions important to successfully uploading bootstrap.
gulp.task('bower:js', () => gulp
    .src(mainBowerFiles('**/*.js'), {base: './bower_components' })
    .pipe(uglify().on('error', log))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(dests.bowerjs))
);

// Task to stage library CSS, particularly Bootstrap.
gulp.task('bower:css', () => gulp
    .src(mainBowerFiles('**/*.css'), {base: './bower_components' })
    .pipe(concat('vendor.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(dests.bowercss))
);

// Task to stage all images, .png or .jpg
gulp.task('images', function() {
    return gulp.src(srcs.images)
    .pipe(imagemin()) // Minification increases load speeds
    .pipe(gulp.dest(dests.images))
})

// Special task that calls upload.js, which pushes all files with a compatible mapping
// staged in the build folder to the iGEM Wiki. Not entirely automatic; requires credentials.
gulp.task('push', function(){
    upload()
});

// Default task runs both dev and live build
gulp.task('default', [ 'index', 'pages', 'templates', 'css', 'js', 'images', 'bower:js', 'bower:css' ]);

// Dev task is currently analagous to default, will change in future
gulp.task('dev', ['default']);

// Live build runs dev and then uploads, will change in future
gulp.task('live', function(done) {
    runsequence('default', 'push');
});

//task that uses markdown to convert text blocks from Markdown to HTML easily
//FIX LATER
gulp.task('markdown', function() {
	gulp.src('test.md') //what files to use for the task
	.pipe(markdown())
	.pipe(gulp.dest('dist')) //where to output the files once the task is complete
});