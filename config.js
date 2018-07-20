const path = require('path');
var format = require('string-format');
format.extend(String.prototype, {})

var argv = require('yargs')
.boolean(['--dev', '-d'])
.boolean(['--live', '-l'])
.argv;

module.exports = function(root) {

    var app = path.join(root, '/app/');
    var build = path.join(root, '/build/');

    // Teaminfo. Duh.
    const teaminfo = {
        year: 2018,
        teamName: 'Virginia'
    }

    // Listed file sources for all tasks. Note use of glob patterns and wildcarding.
    // Used by any build tasks.
    var buildsrc = {
        htmlpages: [path.join(app, '**/*.html'), path.join('!', app, '{templates,partials,content}/**/*.html')],
        hbspages: [path.join(app, '**/*.hbs'), path.join('!', app, '{templates,partials,content}/**/*.hbs')],
        htmlcontent: path.join(app, 'content/**/*.html'),
        markdowncontent: path.join(app, 'content/**/*.md'),
        docxcontent: path.join(app, 'content/**/*.docx'),
        //drivecontent: TODO,
        partials: path.join(app, 'partials/'),
        templates: path.join(app, 'templates/**/*.html'),
        css: path.join(app, 'styles/**/*.css'),
        scss: path.join(app, 'styles/**/*.scss'),
        js: path.join(app, 'scripts/**/*.js'),
        images: path.join(app, 'images/**/*.{png,jpg}'),
    }

    // Destination directory for build, source directories for upload.
    // Used by any build tasks.
    var buildtarget = {
        pages: build,
        templates: path.join(build, 'templates/'),
        content: path.join(build, 'content/'),
        css: path.join(build, 'css/'),
        js: path.join(build, 'js/'),
        bowerjs: path.join(build, 'dist/js/'),
        bowercss: path.join(build, 'dist/css/'),
        images: path.join(build, 'images/'),
    }

    // Used by push.js. Note that for the most part, 
    // upload srcs are the same as built targets.
    var uploadsrc = {
        index: path.join(buildtarget.pages, 'index.html'),
        pages: [path.join(buildtarget.pages, '*.html'), path.join('!', buildtarget.pages, 'index.html')],
        templates: path.join(buildtarget.templates, '*.html'),
        content: path.join(buildtarget.content, '*.html'),
        css: path.join(buildtarget.css, '*.css'),
        js: path.join(buildtarget.js, '*.js'),
        bowerjs: buildtarget.bowerjs.concat('**/*.js'),
        bowercss: buildtarget.bowercss.concat('**/*.css'),
        images: path.join(buildtarget.images, buildsrc.images),
    }

    // URLs used by realtive2absolute
    var urls = {
        standard: 'http://{0}.igem.org/Team:{1}/'.format(teaminfo.year, teaminfo.teamName),
        template: 'http://{0}.igem.org/Template:{1}/'.format(teaminfo.year, teaminfo.teamName),
        js: 'http://{0}.igem.org/Template:{1}/js/'.format(teaminfo.year, teaminfo.teamName),
        css: 'http://{0}.igem.org/Template:{1}/css/'.format(teaminfo.year, teaminfo.teamName),
        images: 'http://{0}.igem.org/File:T--{1}--{0}'.format(teaminfo.year, teaminfo.teamName)
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

    var handlebarsHelpers = function(file, t) {

        return {
            contentpath: function(context) {
                return path.posix.join('/content/', path.basename(file.path));
            }
        }
    }
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
            clean: [path.join(build, '/**'), '!' + build, '!' + path.join(build, '/imagemap.json')], // Clean directives; kill everything but imagemap.json
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
                server: build,
                port: 9999
            }
        },
        handlebars: {
            helpers: handlebarsHelpers
        },
        browserslist: ["defaults"]
    }
};
