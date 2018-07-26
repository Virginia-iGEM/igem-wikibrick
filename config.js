const path = require('path');

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
    name: 'Virginia'
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
    fonts: path.join(app, 'fonts/**/*.{ttf,otf,woff}')
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
    fonts: path.join(build, 'fonts/')
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
    files: [path.join(build, 'images/**/*.{png,jpg}'), path.join(build, 'fonts/**/*.{ttf,otf,woff}')]
  }

  var secure = ''; // Change to 's' to enable secure html
  // URLs used by realtive2absolute
  var urls = {
    standard: `http${secure}://${teaminfo.year}.igem.org/Team:${teaminfo.name}/`,
    template: `http${secure}://${teaminfo.year}.igem.org/Template:${teaminfo.name}/`,
    js: `http${secure}://${teaminfo.year}.igem.org/Template:${teaminfo.name}/js/`,
    css: `http${secure}://${teaminfo.year}.igem.org/Template:${teaminfo.name}/css/`,
    files: `http${secure}://${teaminfo.year}.igem.org/File:T--${teaminfo.name}--{0}`,
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

  const glossary = {
    "quorum sensing": "Def1"
  }

  var handlebarsHelpers = function(file, t) {

    return {
      contentpath: function(context) {
        return path.posix.join('/content/', path.basename(file.path));
      },
      define: function(context) {
        if (context in glossary) {
          var word_definition = glossary[context];
          return `<span class="tooltip">${context}<span class="tooltiptext">${word_definition}</span> </span>`;
        }
        else {
          return context;
        }
      }
    }
  }

  var markdownOptions = {
    sanitize: false
  }
  return {
    teaminfo: teaminfo,
    uploadmap: path.join(root, 'uploadmap.json'),
    gulp: {
      unit: './gulp/tasks/unit/*.js',
      compound: './gulp/tasks/compound/*.js'
    },
    environment: environment, // Default to development environment, otherwise whatever is passed in
    environments: environments,
    targets: {
      root: root,
      clean: path.join(build, '/**'),
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
    markdown: {
      options: markdownOptions
    },
    browserslist: ["defaults"]
  }
};
