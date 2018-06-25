const path = require('path');

String.prototype.format = function (args) {
			var str = this;
			return str.replace(String.prototype.format.regex, function(item) {
				var intVal = parseInt(item.substring(1, item.length - 1));
				var replace;
				if (intVal >= 0) {
					replace = args[intVal];
				} else if (intVal === -1) {
					replace = "{";
				} else if (intVal === -2) {
					replace = "}";
				} else {
					replace = "";
				}
				return replace;
			});
		};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

function assembleUploadSrc(srcitem, targetitem) {
    return path.join(targetitem, path.basename(srcitem));
}

const teaminfo = {
    year: 2018,
    teamName: 'Virginia'
}

const src = global.buildRoot + '/app/';
const build = global.buildRoot + '/build/';

// Listed file sources for all tasks. Note use of glob patterns and wildcarding.
const buildsrc = {
    index: src + 'index.html',
    pages: src + 'pages/**/*.html',
    templates: src + 'templates/**/*.html',
    css: src + 'css/**/*.css',
    scss: src + 'scss/**/*.scss',
    js: src + 'js/**/*.js',
    images: src + 'images/**/*.{png,jpg}',
	markdownpages: src + 'pages/**/*.md'
}

// Destination directory for build, source directories for upload
const buildtarget = {
    index: build,
    pages: build + 'pages/',
    templates: build + 'templates/',
    css: build + 'css/',
    js: build + 'js/',
    bowerjs: build + 'dist/js/',
    bowercss: build + 'dist/css/',
    images: build + 'images/',
	markdownpages: build + 'pages/'
}

const uploadsrc = {
    index: assembleUploadSrc('index.html', buildtarget.index),
    pages: assembleUploadSrc(buildsrc.pages, buildtarget.pages),
    templates: assembleUploadSrc(buildsrc.templates, buildtarget.templates),
    css: assembleUploadSrc(buildsrc.css, buildtarget.css),
    js: assembleUploadSrc(buildsrc.js, buildtarget.js),
    bowerjs: buildtarget.bowerjs.concat('**/*.js'),
    bowercss: buildtarget.bowercss.concat('**/*.css'),
    images: assembleUploadSrc(buildsrc.images, buildtarget.images),
    markdownpages: assembleUploadSrc(buildsrc.markdownpages, buildtarget.markdownpages)
}

const urls = {
    standard: 'http://{0}.igem.org/Team:{1}/'.format([teaminfo.year, teaminfo.teamName]),
    template: 'http://{0}.igem.org/Template:{1}/'.format([teaminfo.year, teaminfo.teamName]),
    js: 'http://{0}.igem.org/Template:{1}/js/'.format([teaminfo.year, teaminfo.teamName]),
    css: 'http://{0}.igem.org/Template:{1}/css/'.format([teaminfo.year, teaminfo.teamName]),
    images: 'http://{0}.igem.org/File:T--{1}--{0}'.format([teaminfo.year, teaminfo.teamName])
}

const suffixes = {
    js: '?action=raw&ctype=text/javascript',
    css: '?action=raw&ctype=text/css'
}

module.exports = {
    src: src,
    build: build,
    teaminfo: teaminfo, 
    buildsrc: buildsrc, 
    buildtarget: buildtarget, 
    uploadsrc: uploadsrc, 
    urls: urls, 
    suffixes: suffixes,
    browsersync: {
        development: {
            server: './build',
            port: 9999
        }
    }
};