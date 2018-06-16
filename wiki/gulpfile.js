// See https://github.com/Mantissa-23/VGEM-2018/tree/master/wiki for descriptions of packages
const gulp = require('gulp');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const log = require('fancy-log');
const uglify = require('gulp-uglify');
const mainBowerFiles = require('main-bower-files');
const imagemin = require('gulp-imagemin');
const runsequence = require('run-sequence');
const gulpif = require('gulp-if');
const cheerio = require('gulp-cheerio');
const markdown = require('gulp-markdown');
const environments = require('gulp-environments');
const sass = require('gulp-sass');
const bourbon = require('node-bourbon').includePaths;
const neat = require('node-neat').includePaths;
const browsersync = require('browser-sync');
const rename = require('gulp-rename');
const del = require('del');

const targets = require('./js/targets.js');
const relative2absolute = require('./relative2absolute.js');
const upload = require('./upload.js');

const dev = environments.make('dev');
const live = environments.make('live');

gulp.task('dev', dev.task);
gulp.task('live', live.task);

srcs = targets.buildsrc;
dests = targets.buildtarget;

// Function shared by all HTML processing tasks for development builds. 
// Currently just stages HTML files to build folder.
function prepHTML(src, dest) {
    return function() {
        gulp.src(src)
        .pipe(gulpif(live(), cheerio({
            run: relative2absolute,
            parserOptions: {
                decodeEntities: false
            }
        })))
        .pipe(gulp.dest(dest));
    }
};

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
    //.pipe(minifyCSS()) // Minification increases load speeds
    .pipe(gulp.dest(dests.css));
});

gulp.task('sass', function(){
    return gulp.src(srcs.scss)
    .pipe(sass({
        includePaths: bourbon, 
        includePaths: neat})
        .on('error', sass.logError)) // Minification increases load speeds
    .pipe(gulp.dest(dests.css));
});

// Task to minify and stage our in-house JavaScript files.
// TODO: Fix JS minificatoin for in-house JS
gulp.task('js', function(){
    return gulp.src(srcs.js)
    .pipe(sourcemaps.init()) // Used for debugging
    //.pipe(uglify().on('error', log)) // Minification increases load speeds
    .pipe(concat('wiki.js')) // Note use of concat to compact all JS files into one
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dests.js));
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
    //.pipe(minifyCSS())
    .pipe(gulp.dest(dests.bowercss))
);

// Task to stage all images, .png or .jpg
gulp.task('images', function() {
    return gulp.src(srcs.images)
    .pipe(imagemin()) // Minification increases load speeds
    .pipe(gulp.dest(dests.images));
});

// Special task that calls upload.js, which pushes all files with a compatible mapping
// staged in the build folder to the iGEM Wiki. Not entirely automatic; requires credentials.
gulp.task('pushcontent', function(done){
    upload.uploadContent().then(done);
});

gulp.task('pushimages', function(done) {
    upload.uploadImages(done).then(done);
});

gulp.task('browsersync', function() {
    browsersync({
        server: {
            baseDir: './build'
        }
    })
});

const buildtasks = [ 'index', 'pages', 'templates', 'sass', 'js', 'images', 'bower:js', 'bower:css' , 'markdown'];

// Default task runs both dev and live build
gulp.task('build', function(done) {
    if (!live()) {
        runsequence(
        buildtasks,
        //'browsersync',
        done);
    }
    else {
        runsequence(buildtasks, done);
    }
});

// Dev task is currently analagous to default, will change in future
gulp.task('default', ['build']);

// Live build runs dev and then uploads, will change in future
gulp.task('publish', function(done) {
    runsequence('pushimages', 'dev', 'pushcontent', done);
});

gulp.task('clean', function(done) {
    del('./build', done);
});

//task that uses markdown to convert text blocks from Markdown to HTML easily
gulp.task('markdown', function() {
	gulp.src(srcs.markdownpages) //what files to use for the task, pulled from the srcs array
    .pipe(markdown()) //using the markdown program
    .pipe(rename(function (path) {
        path.extname = '.html'
    }))
	.pipe(gulp.dest(dests.markdownpages)) //where to output the files once the task is complete, pulled from dests array
});
