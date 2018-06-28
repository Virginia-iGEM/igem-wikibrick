var gulp = require('gulp');
var del = require('del');

var targets = require(global.targets);

gulp.task('clean', function(done) {
    return del(targets.build, done);
});