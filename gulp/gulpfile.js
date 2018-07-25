var gulp = require('gulp');
var HubRegistry = require('gulp-hub');
var path = require('path');

module.exports = function(config) {
  var targets = config.targets;
  var hub = new HubRegistry([
    './tasks/unit/*js'
  ]);

  gulp.registry(hub);

  const prebuildtasks = ['build:images', 'build:fonts'];
  const buildtasks = [ 'build:html:pages', 'build:hbs:pages', 'build:html:content', 'build:markdown:content', 'build:docx:content', 'build:templates', 'build:scss', 'build:css', 'build:js', 'build:bower:js', 'build:bower:css'];

  // Default task runs both dev and live build
  gulp.task('partialbuild', gulp.parallel(buildtasks));
  gulp.task('prebuild', gulp.parallel(prebuildtasks));
  gulp.task('build', gulp.series('prebuild', 'partialbuild'));

  // Live build runs dev and then uploads, will change in future
  gulp.task('publish', gulp.series('prebuild', 'push:files', 'partialbuild', 'push:all'));

  gulp.task('serve', gulp.series('build', gulp.parallel('browsersync', function() {
    gulp.watch(targets.buildsrc.htmlpages, gulp.series('build:html:pages'));
    gulp.watch(targets.buildsrc.hbspages, gulp.series('build:hbs:pages'));
    gulp.watch(targets.buildsrc.htmlcontent, gulp.series('build:html:content'));
    gulp.watch(targets.buildsrc.markdowncontent, gulp.series('build:markdown:content'));
    gulp.watch(targets.buildsrc.docxcontent, gulp.series('build:docx:content'));
    gulp.watch(targets.buildsrc.templates, gulp.series('build:templates'));
    gulp.watch(targets.buildsrc.scss, gulp.series('build:scss'));
    gulp.watch(targets.buildsrc.css, gulp.series('build:css'));
    gulp.watch(targets.buildsrc.js, gulp.series('build:js'));
    gulp.watch(targets.buildsrc.images, gulp.series('build:images'));
    gulp.watch(targets.buildsrc.fonts, gulp.series('build:fonts'));
  })));

  // Dev task is currently analagous to default, will change in future
  gulp.task('default', gulp.series('serve'));
  
  return gulp;
}
