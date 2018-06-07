// Core node, https://nodejs.org/api/path.html
const path = require('path')

const igemwiki = require('igemwiki-api')({ year: 2018, teamName: 'Virginia'})
const Promise = require('bluebird')
const globby = require ('globby')
const _ = require('lodash')

const index = {
    type: 'page',
    fileName: path.resolve(__dirname, './index.html'),
    page: ''
}

const getTemplates = globby([ './templates/**/*.html' ]).then(function (templates) {
    return templates.map(function (template) {
        return {
            type: 'template',
            fileName: path.resolve(__dirname, template),
            page: 'templates/' + path.basename(template).replace('.html', '')
        }
    })
})

const getCSS = globby([ './styles/**/*.css']).then((stylesheets) => {
    return stylesheets.map((stylesheet) => {
        return {
            type: 'stylesheet',
            fileName: path.resolve(__dirname, stylesheet),
            page: 'styles/' + path.basename(stylesheet).replace('.css', '')
        }
    })
})

const getJS = globby([ './scripts/**/*.js' ]).then(scripts => scripts.map(script => ({
    type: 'script',
    fileName: path.resolve(__dirname, script),
    page: 'scripts/' + path.basename(script).replace('.js', '')
})))

Promise.all([
    Promise.resolve(index),
    getTemplates,
    getCSS,
    getJS
]).then((confs) => {
    confs = _.flatten(confs)
    console.log(confs)
})