// Core node, https://nodejs.org/api/path.html
const path = require('path')

const igemwiki = require('igemwiki-api')({ year: 2018, teamName: 'Virginia'})
const Promise = require('bluebird')
const globby = require ('globby')
const _ = require('lodash')

const index = {
    type: 'page',
    fileName: path.resolve(__dirname, './build/index.html'),
    page: 'INDEX'
}

const getPages = globby([ './build/pages/**/*.html' ]).then(function (pages) {
    return pages.map(function (page) {
        return {
            type: 'page',
            fileName: path.resolve(__dirname, page),
            page: path.basename(page).replace('.html', '')
        }
    })
})

const getTemplates = globby([ './build/templates/**/*.html' ]).then(function (templates) {
    return templates.map(function (template) {
        return {
            type: 'template',
            fileName: path.resolve(__dirname, template),
            page: path.basename(template).replace('.html', '')
        }
    })
})

const getCSS = globby([ './build/styles/**/*.css']).then((stylesheets) => {
    return stylesheets.map((stylesheet) => {
        return {
            type: 'stylesheet',
            fileName: path.resolve(__dirname, stylesheet),
            page: path.basename(stylesheet).replace('.css', '')
        }
    })
})

const getJS = globby([ './build/scripts/**/*.js' ]).then(scripts => scripts.map(script => ({
    type: 'script',
    fileName: path.resolve(__dirname, script),
    page: path.basename(script).replace('.js', '')
})))

const getImages = globby([ './images/**/*.{png,jpg}' ]).then(images => images.map(image => ({
    type: 'image',
    fileName: path.resolve(__dirname, image),
    page: path.basename(image)
})))

Promise.all([
    Promise.resolve(index),
    getPages,
    getTemplates,
    getCSS,
    getJS,
    getImages
]).then((confs) => {
    confs = _.flatten(confs)
    //console.log(confs)

    igemwiki.login().then((jar) => {
        confs = confs.map(c => ({
            jar: jar,
            type: c.type,
            dest: c.page,
            source: c.fileName,
            // force: true
        }))

        Promise.map(confs, conf => igemwiki.upload(conf), { concurrency: 1})
            .then(() => console.log('Uploads completed'))
            .catch(console.error)
    })
})
