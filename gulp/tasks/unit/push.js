// See https://github.com/Mantissa-23/VGEM-2018/tree/master/wiki for descriptions of packages
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');
var globby = require ('globby');
var _ = require('lodash');

var config = global.wikibrick;
var targets = config.targets;
var igemwiki = require('igemwiki-api')(config.teaminfo);

var uploadmapfilename = config.uploadmap;

var loggedin = false;
var loginjar;

var crypto = require('crypto');

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function fileHash(filename, algorithm = 'md5') {
    return new Promise((resolve, reject) => {
        // Algorithm depends on availability of OpenSSL on platform
        // Another algorithms: 'sha1', 'md5', 'sha256', 'sha512' ...
        let shasum = crypto.createHash(algorithm);
        try {
            let s = fs.ReadStream(filename);
            s.on('data', function (data) {
                shasum.update(data);
            });
            // making digest
            s.on('end', function () {
                const hash = shasum.digest('hex');
                return resolve(hash);
            });
        } catch (error) {
            return reject('calc fail');
        }
    });
}

// Split off login into a separate function so that the user does not have to login more than once
// If we need to grab credentials, ask for them in console. Otherwise just continue on.
// Call it a lazy login.
var login = function(logincount) {
    return new Promise((resolve, reject) => {
        if (!loggedin) {
            loggedin = true;
            igemwiki.login().then(function(jar) {
                loginjar = jar;
                resolve();
            })
            .catch(error => {
                if(error.toString().match(/RequestError: Error: connect ETIMEDOUT.*/) && logincount > 0){
                    console.log("Error. Login failed. Try again.");
                    logincount--;
                    login(logincount).then(resolve);
                }
                else{
                    console.log("Try running gulp publish again.");
                    reject(error);
                }
            });
        }
        else {
            resolve();
        }
    });
};

// Mapping for index (home) page
var index = [{
    type: 'page',
    fileName: path.resolve(targets.root, targets.uploadsrc.index),
    page: 'INDEX'
}];

// Mapping for all standard HTML pages. Note use of Globby wildcards to find files.
var getPages = globby(targets.uploadsrc.pages).then(function (pages) {
    return pages.map(function (page) {
        return {
            type: 'page',
            fileName: path.resolve(targets.root, page),
            page: path.basename(page).replace('.html', '')
        };
    });
});

// Mapping for templates.
var getTemplates = globby(targets.uploadsrc.templates).then(function (templates) {
    return templates.map(function (template) {
        return {
            type: 'template',
            fileName: path.resolve(targets.root, template),
            page: path.basename(template).replace('.html', '')
        };
    });
});

// Mapping for content.
var getContent = globby(targets.uploadsrc.content).then(function (contents) {
    return contents.map(function (content) {
        return {
            type: 'template',
            fileName: path.resolve(targets.root, content),
            page: path.basename(content).replace('.html', '')
        };
    });
});

// Mapping for CSS
var getCSS = globby(targets.uploadsrc.css).then((stylesheets) => {
    return stylesheets.map((stylesheet) => {
        return {
            type: 'stylesheet',
            fileName: path.resolve(targets.root, stylesheet),
            page: (path.basename(stylesheet).replace('.css', ''))
        };
    });
});

// Mapping for Javascript
var getJS = globby(targets.uploadsrc.js).then(scripts => scripts.map(script => ({
    type: 'script',
    fileName: path.resolve(targets.root, script),
    page: path.basename(script).replace('.js', '')
})));

// Mapping for images
var getFiles = globby(targets.uploadsrc.files).then(files => files.map(file => ({
    type: 'upload',
    fileName: path.resolve(targets.root, file),
    page: path.basename(file)
})));

// Drop-in replacement for igemwiki.upload under `upload`
var myError = new Error('RequestError');
var retryUpload = function(conf, uploadmap, retries) {
    return new Promise((resolve, reject) => {
        fileHash(conf.source).then(hash  => {
            //console.log(path.relative(targets.build, conf.source));
            if (path.relative(targets.build, conf.source) in uploadmap.hash && hash == uploadmap.hash[path.relative(targets.build, conf.source)]) {
                resolve({}, true);
                console.log("skipped: file " + path.basename(conf.source) + " has not changed.");
            }
            else {
                igemwiki.upload(conf).then(results => {
                    resolve(results, false);
                }, error => {
                    retries--;
                    if(error.toString().match(/RequestError: Error: connect ETIMEDOUT.*/)){
                        console.log("Request Error. Trying again...");
                    }
                    if (retries > 0) {
                        console.log("Upload failed, retrying upload...");
                        retryUpload(conf, uploadmap, retries).then(results => {resolve(results, false);});
                    }
                    else{
                        console.log("Retry count exceeded.");
                        reject(error);
                    }
                });
            }
        });
    });
};

// uploadmap spec:
// {
//     "file": {"filename" : "url"},
//     "hash": {"filename": "hash"}
// }

// Uploads a bunch of files one-by-one to the igemwiki following their mappings
upload = function(promises) {
    return new Promise((resolve, reject) => {
        // Run all mapping functions asynchronously with bluebird, 
        // generating an actual map list from the patterns we specified.
        Promise.all(promises).then((confs) => {
            fs.open(uploadmapfilename, 'r', (err, fd) => {
                var uploadmap;
                if (err) { // Make a fresh one if we can't find the file
                    uploadmap = {
                        "file": {},
                        "hash": {}
                    };
                }
                else {
                    uploadmap = require('./relative2absolute').uploadmap();
                }

                confs = _.flatten(confs);
                // Encapsulate files in a configuration file compatible with igemwiki-api
                login(3).then((jar) => {
                    confs = confs.map(c => ({
                        jar: loginjar,
                        type: c.type, // Type is a switch that determines how igemwiki-api uploads files
                        dest: c.page, //Send files to the page specified under mapping
                        source: c.fileName, // Take from the source specified in fileName
                        // force: true
                    }));
                    Promise.map(confs, conf => retryUpload(conf, uploadmap, 7) // Do the actual upload, retry 5 times upon failure
                                .then((results, skipped) => { // Generate uploadmaps if we're uploading any images
                                    return new Promise((resolve1, reject1) => {
                                        if (!skipped) {
                                            fileHash(conf.source).then((hash) => {
                                                if(conf.type == 'upload') {
                                                    console.log('upload');
                                                    uploadmap.file[path.relative(targets.build, conf.source)] = results.target;
                                                    console.log(results.target);
                                                }
                                                uploadmap.hash[path.relative(targets.build, conf.source)] = hash;
                                                resolve1();
                                            });
                                        }
                                        else {
                                            resolve1();
                                        }
                                    });
                                }), {concurrency: 1})
                        .then(() => { // Write out uploadmaps if they've been generated
                            fs.writeFile(uploadmapfilename ,JSON.stringify(uploadmap), 'utf8', () => {
                                console.log('Wrote file mappings to '.concat(uploadmapfilename));
                            });
                        })
                        .then(() => {
                            console.log('Uploads completed');
                            resolve();
                        })
                        .catch(console.error);
                });
            });
        });
    });
};

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

gulp.task('push:content', function(done) {
    upload(getContent).then(done);
});

gulp.task('push:css', function(done) {
    upload(getCSS).then(done);
});

gulp.task('push:js', function(done) {
    upload(getJS).then(done);
});

gulp.task('push:files', function(done) {
    upload(getFiles).then(done);
});

gulp.task('push:all', gulp.series('push:index', 'push:content', 'push:pages', 'push:templates', 'push:css', 'push:js'));
