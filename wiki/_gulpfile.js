// See https://github.com/Mantissa-23/VGEM-2018/tree/master/wiki for descriptions of packages
var environments = require('gulp-environments');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon').includePaths;
var neat = require('node-neat').includePaths;
var browsersync = require('browser-sync');

var relative2absolute = require('gulp/helpers/relative2absolute.js');
var upload = require('gulp/helpers/upload.js');
