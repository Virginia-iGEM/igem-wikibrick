// Core node, https://nodejs.org/api/path.html
const path = require('path')

const igemwiki = require('igemwiki-api')({ year: 2018, teamName: 'Virginia'})
const Promise = require('bluebird')
const globby = require ('globby')
const _ = require('lodash')

globby([
    './index.html',
    './templates/**/*.html',
    './styles/**/*.css',
    './scripts/**/*.js'
]).then(function(filenames) {
    console.log(filenames)

    const absoluteFilenames = filenames.map(filename => path.resolve(__dirname, filename))
    console.log(absoluteFilenames)
})