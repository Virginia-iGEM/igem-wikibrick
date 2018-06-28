var gulp = require('gulp');
var hub = require('gulp-hub');
var path = require('path');
var environments = require('gulp-environments');
var browsersync = require('browser-sync');

var dev = environments.make('dev');
var live = environments.make('live');
var serve = environments.make('serve');

gulp.task('dev', function(done) {
    dev.task();
    done();
});
gulp.task('live', function(done) {
    live.task();
    done();
});

global.dev = dev;
global.serve = serve;
global.live = live;

// Set up project root filename
global.buildRoot = path.resolve(__dirname);
global.targets = path.join(path.resolve(__dirname), 'targets').toString();

var targets = require(global.targets);

// Require all tasks in gulp/tasks, including subfolders
hub(['./gulp/tasks/**/*.js']);

// Tell gulp to use tasks just loaded
//gulp.registry(hub);

const buildtasks = [ 'build:index', 'build:pages', 'build:templates', 'build:sass', 'build:js', 'build:images', 'build:bower:js', 'build:bower:css'];

// Default task runs both dev and live build
gulp.task('build', gulp.parallel(buildtasks));

// Dev task is currently analagous to default, will change in future
gulp.task('default', gulp.series('dev', 'build'));

// Live build runs dev and then uploads, will change in future
gulp.task('publish', gulp.series('live', 'push:images', 'build', 'push:content'));

gulp.task('browsersync', function() {
    browsersync(targets.browsersync.development);
});

gulp.task('serve', gulp.series('build', gulp.parallel('browsersync', function() {
  serve.task()
  gulp.watch(targets.buildsrc.index, gulp.series('build:index'));
  gulp.watch(targets.buildsrc.pages, gulp.series('build:pages'));
  gulp.watch(targets.buildsrc.templates, gulp.series('build:templates'));
  gulp.watch(targets.buildsrc.scss, gulp.series('build:sass'));
  gulp.watch(targets.buildsrc.js, gulp.series('build:js'));
  gulp.watch(targets.buildsrc.images, gulp.series('build:images'));
})));
