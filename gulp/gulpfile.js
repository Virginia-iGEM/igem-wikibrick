var gulp = require('gulp');
var HubRegistry = require('gulp-hub');
var path = require('path');

module.exports = function(config) {
  var targets = config.targets;
  var hub = new HubRegistry([
    './tasks/unit/*js'
  ]);

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
  
  return gulp;
}