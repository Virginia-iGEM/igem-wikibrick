// See https://github.com/Mantissa-23/VGEM-2018/tree/master/wiki for descriptions of packages
module.exports = function() {
    // Core node, https://nodejs.org/api/path.html
    const path = require('path')

    const igemwiki = require('igemwiki-api')({ year: 2018, teamName: 'Virginia'})
    const Promise = require('bluebird')
    const globby = require ('globby')
    const _ = require('lodash')

    // Mapping for index (home) page
    const index = {
        type: 'page',
        fileName: path.resolve(__dirname, './build/index.html'),
        page: 'INDEX'
    }

    // Mapping for all standard HTML pages. Note use of Globby wildcards to find files.
    const getPages = globby([ './build/pages/**/*.html' ]).then(function (pages) {
        return pages.map(function (page) {
            return {
                type: 'page',
                fileName: path.resolve(__dirname, page),
                page: path.basename(page).replace('.html', '')
            }
        })
    })

    // Mapping for templates.
    const getTemplates = globby([ './build/templates/**/*.html' ]).then(function (templates) {
        return templates.map(function (template) {
            return {
                type: 'template',
                fileName: path.resolve(__dirname, template),
                page: path.basename(template).replace('.html', '')
            }
        })
    })

    // Mapping for CSS
    const getCSS = globby([ './build/styles/**/*.css']).then((stylesheets) => {
        return stylesheets.map((stylesheet) => {
            return {
                type: 'stylesheet',
                fileName: path.resolve(__dirname, stylesheet),
                page: path.basename(stylesheet).replace('.css', '')
            }
        })
    })

    // Mapping for Javascript
    const getJS = globby([ './build/scripts/**/*.js' ]).then(scripts => scripts.map(script => ({
        type: 'script',
        fileName: path.resolve(__dirname, script),
        page: path.basename(script).replace('.js', '')
    })))

    // Mapping for images
    const getImages = globby([ './build/images/**/*.{png,jpg}' ]).then(images => images.map(image => ({
        type: 'image',
        fileName: path.resolve(__dirname, image),
        page: path.basename(image)
    })))

    // Run all mapping functions asynchronously with bluebird, 
    // generating an actual map list from the patterns we specified.
    Promise.all([
        Promise.resolve(index),
        getPages,
        getTemplates,
        getCSS,
        getJS,
        getImages
    ]).then((confs) => {
        confs = _.flatten(confs)
        //console.log(confs) // Uncomment to log mappings to console

        // Encapsulate files in a configuration file compatible with igemwiki-api
        igemwiki.login().then((jar) => {
            confs = confs.map(c => ({
                jar: jar,
                type: c.type, // Type is a switch that determines how igemwiki-api uploads files
                dest: c.page, // Send files to the page specified under mapping
                source: c.fileName, // Take from the source specified in fileName
                // force: true // Uncomment to ignore errors
            }))

            // Now begin uploading them
            Promise.map(confs, conf => igemwiki.upload(conf), { concurrency: 1})
                .then(() => console.log('Uploads completed'))
                .catch(console.error)
        })
    })
}