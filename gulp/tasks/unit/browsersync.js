var gulp = require('gulp');
var browsersync = require('browser-sync');

var config = global.wikibrick;

gulp.task('browsersync', function() {
    browsersync(config.browsersync.development);
});