var gulp = require('gulp');
var del = require('del');

var targets = global.wikibrick.targets;

gulp.task('clean', function(done) {
    return del(targets.clean, done);
});