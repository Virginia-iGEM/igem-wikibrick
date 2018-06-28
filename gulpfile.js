var gulp = require('gulp');
var hub = require('gulp-hub');
var path = require('path');
var environments = require('gulp-environments');
var browsersync = require('browser-sync');

var dev = environments.make('dev');
var live = environments.make('live');

gulp.task('dev', function(done) {
    dev.task();
    done();
});
gulp.task('live', function(done) {
    live.task();
    done();
});

global.dev = dev;
global.live = live;

// Set up project root filename
global.buildRoot = path.resolve(__dirname);
global.targets = path.join(path.resolve(__dirname), 'targets').toString();

// Require all tasks in gulp/tasks, including subfolders
hub(['./gulp/tasks/**/*.js']);

// Tell gulp to use tasks just loaded
//gulp.registry(hub);

const buildtasks = [ 'index', 'pages', 'templates', 'sass', 'js', 'images', 'bower:js', 'bower:css'];

// Default task runs both dev and live build
gulp.task('build', gulp.parallel(buildtasks));

// Dev task is currently analagous to default, will change in future
gulp.task('default', gulp.series('dev', 'build'));

// Live build runs dev and then uploads, will change in future
gulp.task('publish', gulp.series('pushimages', 'dev', 'pushcontent'));

var target = require(global.targets).browsersync.development;

gulp.task('browsersync', function() {
    browsersync(target);
})