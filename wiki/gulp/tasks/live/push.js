// See https://github.com/Mantissa-23/VGEM-2018/tree/master/wiki for descriptions of packages
var gulp = require('gulp');

// Core node, https://nodejs.org/api/path.html
const path = require('path')
const fs = require('fs');

const targets = require(global.targets);

const igemwiki = require('igemwiki-api')(targets.teaminfo)
const Promise = require('bluebird')
const globby = require ('globby')
const _ = require('lodash')

const imagemapfilename = path.join(global.buildRoot, 'build/imagemap.json').toString();

var loggedin = false;
var loginjar;

// Split off login into a separate function so that the user does not have to login more than once
// If we need to grab credentials, ask for them in console. Otherwise just continue on.
// Call it a lazy login.
login = function() {
    return new Promise((resolve, reject) => {
        if (!loggedin) {
            loggedin = true;
            igemwiki.login().then(function(jar) {
                loginjar = jar;
                resolve();
            })
            .catch(console.error);
        }
        else {
            resolve();
        }
    })
}

// Mapping for index (home) page
const index = [{
    type: 'page',
    fileName: path.resolve(__dirname, targets.uploadsrc.index),
    page: 'INDEX'
}];

// Mapping for all standard HTML pages. Note use of Globby wildcards to find files.
const getPages = globby([ targets.uploadsrc.pages ]).then(function (pages) {
    return pages.map(function (page) {
        return {
            type: 'page',
            fileName: path.resolve(__dirname, page),
            page: path.basename(page).replace('.html', '')
        }
    })
})

// Mapping for templates.
const getTemplates = globby([ targets.uploadsrc.templates ]).then(function (templates) {
    return templates.map(function (template) {
        return {
            type: 'template',
            fileName: path.resolve(__dirname, template),
            page: path.basename(template).replace('.html', '')
        }
    })
})

// Mapping for CSS
const getCSS = globby([ targets.uploadsrc.css ]).then((stylesheets) => {
    return stylesheets.map((stylesheet) => {
        return {
            type: 'stylesheet',
            fileName: path.resolve(__dirname, stylesheet),
            page: (path.basename(stylesheet).replace('.css', ''))
        }
    })
})

// Mapping for Javascript
const getJS = globby([ targets.uploadsrc.js ]).then(scripts => scripts.map(script => ({
    type: 'script',
    fileName: path.resolve(__dirname, script),
    page: path.basename(script).replace('.js', '')
})))

// Mapping for images
const getImages = globby([ targets.uploadsrc.images ]).then(images => images.map(image => ({
    type: 'image',
    fileName: path.resolve(__dirname, image),
    page: path.basename(image)
})))

// Drop-in replacement for igemwiki.upload under `upload`
var retryUpload = function(conf, retries) {
    return new Promise((resolve, reject) => {
        igemwiki.upload(conf).catch(error => {
            retries--;
            if (retries > 0) {
                console.log("Upload failed, retrying upload...");
                retryUpload(conf, retries);
            }
            else{
                console.log("Retry count exceeded.")
                throw error;
                reject();
            }
        })
        .then(resolve)
    })
}

// Uploads a bunch of files one-by-one to the igemwiki following their mappings
upload = function(promises) {
    return new Promise((resolve, reject) => {
        // Run all mapping functions asynchronously with bluebird, 
        // generating an actual map list from the patterns we specified.
        Promise.all(promises).then((confs) => {
            confs = _.flatten(confs);
            var imagemap = new Object(); // We don't necessarily need this for every kind of upload,
            // but it's there for image uploads.

            // Encapsulate files in a configuration file compatible with igemwiki-api
            login(() => {}).then((jar) => {
                confs = confs.map(c => ({
                    jar: loginjar,
                    type: c.type, // Type is a switch that determines how igemwiki-api uploads files
                    dest: c.page, //Send files to the page specified under mapping
                    source: c.fileName, // Take from the source specified in fileName
                    // force: true
                }))
                var imageupload = false;
                Promise.map(confs, conf => retryUpload(conf, 5) // Do the actual upload, retry 5 times upon failure
                .then(results => { // Generate imagemaps if we're uploading any images
                    if(conf.type == 'image') {
                        imageupload = true;
                        imagemap[conf.dest] = results.target;
                    }
                })
                , {concurrency: 1})
                .then(() => { // Write out imagemaps if they've been generated
                    if(imageupload) {
                        fs.writeFile(imagemapfilename, JSON.stringify(imagemap), 'utf8', () => {
                        console.log('Wrote image mappings to '.concat(imagemapfilename));
                        });
                    }
                })
                .then(() => {
                    console.log('Uploads completed')
                    resolve();
                })
                .catch(console.error)
            })
        })
    })
}

// Special task that calls upload.js, which pushes all files with a compatible mapping
// staged in the build folder to the iGEM Wiki. Not entirely automatic; requires credentials.
gulp.task('push:index', function(done){
    upload(index).then(done);
});

gulp.task('push:pages', function(done){
    upload(getPages).then(done);
});

gulp.task('push:templates', function(done){
    upload(getTemplates).then(done);
});

gulp.task('push:css', function(done) {
    upload(getCSS).then(done);
});

gulp.task('push:js', function(done) {
    upload(getJS).then(done);
});

gulp.task('push:images', function(done) {
    upload(getImages).then(done);
});

gulp.task('push:content', gulp.series('push:index', 'push:pages', 'push:templates', 'push:css', 'push:js'));