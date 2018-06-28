var gulp = require('gulp');
var markdown = require('gulp-markdown');
var rename = require('gulp-rename');

var targets = require(global.targets);
var srcs = targets.buildsrc;
var dests = targets.buildtarget;

//task that uses markdown to convert text blocks from Markdown to HTML easily
gulp.task('markdown', function() {
	gulp.src(srcs.markdownpages) //what files to use for the task, pulled from the srcs array
    .pipe(markdown()) //using the markdown program
    .pipe(rename(function (path) {
        path.extname = '.html'
    }))
	.pipe(gulp.dest(dests.markdownpages)) //where to output the files once the task is complete, pulled from dests array
});