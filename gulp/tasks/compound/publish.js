var gulp = require('gulp');

// Live build runs dev and then uploads, will change in future
gulp.task('publish', gulp.series('push:images', 'build', 'push:content'));