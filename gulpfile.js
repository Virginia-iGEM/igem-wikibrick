var gulp = require('gulp');
var hub = require('gulp-hub');
var path = require('path');

global.wikibrick = require('./config')(path.resolve(__dirname)); // Pass in local directory name

var config = global.wikibrick;

// Require default igem-wikibrick tasks
hub(['./node_modules/igem-wikibrick/gulp/unit'])
hub(['./node_modules/igem-wikibrick/gulp/compound'])

// Require unit tasks
hub([config.gulp.unit]);

// Require compound tasks once unit tasks are defined
hub([config.gulp.compound]);