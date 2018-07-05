var gulp = require('gulp');

var targets = global.wikibrick.targets;

gulp.task('serve', gulp.series('build', gulp.parallel('browsersync', function() {
  gulp.watch(targets.buildsrc.index, gulp.series('build:index'));
  gulp.watch(targets.buildsrc.pages, gulp.series('build:pages'));
  gulp.watch(targets.buildsrc.templates, gulp.series('build:templates'));
  gulp.watch(targets.buildsrc.scss, gulp.series('build:sass'));
  gulp.watch(targets.buildsrc.js, gulp.series('build:js'));
  gulp.watch(targets.buildsrc.images, gulp.series('build:images'));
})));