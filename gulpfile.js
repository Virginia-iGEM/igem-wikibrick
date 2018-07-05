var gulp = require('gulp');
var hub = require('gulp-hub');
var path = require('path');

global.wikibrick = require('./config')(path.resolve(__dirname)); // Pass in local directory name

var config = global.wikibrick;

// Require unit tasks
hub([config.gulp.unit]);

// Require compound tasks once unit tasks are defined
hub([config.gulp.compound])