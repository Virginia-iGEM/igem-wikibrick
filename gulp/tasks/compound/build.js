var gulp = require('gulp');

const buildtasks = [ 'build:index', 'build:pages', 'build:templates', 'build:sass', 'build:js', 'build:images', 'build:bower:js', 'build:bower:css'];

// Default task runs both dev and live build
gulp.task('build', gulp.parallel(buildtasks));