var argv = require('yargs')
.boolean(['--dev', '-d'])
.boolean(['--live', '-l'])
.argv;

const path = require('path');
const header = require('gulp-header');

// Format function
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

module.exports = function(root) {

    var app = root + '/app/';
    var build = root + '/build/';

    // Teaminfo. Duh.
    const teaminfo = {
        year: 2018,
        teamName: 'Virginia'
    }

    // Listed file sources for all tasks. Note use of glob patterns and wildcarding.
    // Used by any build tasks.
    var buildsrc = {
        index: app + 'index.html',
        pages: app + 'pages/**/*.html',
        templates: app + 'templates/**/*.html',
        css: app + 'css/**/*.css',
        scss: app + 'scss/**/*.scss',
        js: app + 'js/**/*.js',
        images: app + 'images/**/*.{png,jpg}',
        markdownpages: app + 'pages/**/*.md'
    }

    // Destination directory for build, source directories for upload.
    // Used by any build tasks.
    var buildtarget = {
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

    // Used by push.js. Note that for the most part, 
    // upload srcs are the same as built targets.
    var uploadsrc = {
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

    // URLs used by realtive2absolute
    var urls = {
        standard: 'http://{0}.igem.org/Team:{1}/'.format([teaminfo.year, teaminfo.teamName]),
        template: 'http://{0}.igem.org/Template:{1}/'.format([teaminfo.year, teaminfo.teamName]),
        js: 'http://{0}.igem.org/Template:{1}/js/'.format([teaminfo.year, teaminfo.teamName]),
        css: 'http://{0}.igem.org/Template:{1}/css/'.format([teaminfo.year, teaminfo.teamName]),
        images: 'http://{0}.igem.org/File:T--{1}--{0}'.format([teaminfo.year, teaminfo.teamName])
    }

    // Suffixes used by relative2absolute
    var suffixes = {
        js: '?action=raw&ctype=text/javascript',
        css: '?action=raw&ctype=text/css'
    }

    var environments = {
        dev: {
            banner: false,
            minify: false,
            relative2absolute: false,
            serve: true
        },
        live: {
            banner: true,
            minify: true,
            relative2absolute: true,
            serve: false
        }
    }

    var shortflag;
    if (argv.l) {
        shortflag = 'live'
    }
    else if (argv.d) {
        shortflag = 'dev'
    }

    var userenv = argv.env || shortflag || 'dev'; // Try env variable, else fallback on shortflag, else assume we're in dev
    var environment = Object.assign(environments[userenv], {name: userenv});

    return {
        teaminfo: teaminfo,
        gulp: {
            unit: './gulp/tasks/unit/*.js',
            compound: './gulp/tasks/compound/*.js'
        },
        environment: environment, // Default to development environment, otherwise whatever is passed in
        environments: environments,
        targets: {
            root: root,
            clean: [build + '/**', '!' + build, '!' + build + '/imagemap.json'], // Clean directives; kill everything but imagemap.json
            app: app,
            build: build,
            buildsrc: buildsrc, 
            buildtarget: buildtarget, 
            uploadsrc: uploadsrc, 
            urls: urls,
            suffixes: suffixes,
        },
        browsersync: {
            development: {
                server: './build',
                port: 9999
            }
        },
        browserslist: ["defaults"]
    }
};