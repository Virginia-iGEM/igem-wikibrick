var gulp = require('gulp');
var HubRegistry = require('gulp-hub');
var path = require('path');

global.wikibrick = require('./config')(path.resolve(__dirname)); // Pass in local directory name

var config = global.wikibrick;
var targets = config.targets;

var hub = new HubRegistry([
  'node_modules/igem-wikibrick/gulp/tasks/unit/*.js',
  config.gulp.unit
]);

//console.log(hub);

gulp.registry(hub);

const buildtasks = [ 'build:index', 'build:pages', 'build:templates', 'build:sass', 'build:js', 'build:images', 'build:bower:js', 'build:bower:css'];

// Default task runs both dev and live build
gulp.task('build', gulp.parallel(buildtasks));

// Live build runs dev and then uploads, will change in future
gulp.task('publish', gulp.series('push:images', 'build', 'push:content'));


gulp.task('serve', gulp.series('build', gulp.parallel('browsersync', function() {
  gulp.watch(targets.buildsrc.index, gulp.series('build:index'));
  gulp.watch(targets.buildsrc.pages, gulp.series('build:pages'));
  gulp.watch(targets.buildsrc.templates, gulp.series('build:templates'));
  gulp.watch(targets.buildsrc.scss, gulp.series('build:sass'));
  gulp.watch(targets.buildsrc.js, gulp.series('build:js'));
  gulp.watch(targets.buildsrc.images, gulp.series('build:images'));
})));

// Dev task is currently analagous to default, will change in future
gulp.task('default', gulp.series('serve'));

/*
// Require default igem-wikibrick tasks
hub(['./node_modules/igem-wikibrick/gulp/unit'])
hub(['./node_modules/igem-wikibrick/gulp/compound'])

// Require unit tasks
hub([config.gulp.unit]);

// Require compound tasks once unit tasks are defined
hub([config.gulp.compound]);
*/