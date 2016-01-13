#!/usr/bin/env node

var h2m = require('../index')
var program = require('commander')
var request = require('request')
var path = require('path')
var fs = require('fs')
var pkg = require('../package.json')

function loadHTMLFromURI(uri, callback) {
  request(uri, function (error, response, body) {
    if (error) {
      throw error
    } else if (response.statusCode == 200) {
      callback(body)
    } else {
      throw new Error('can\'t get html from ' + uri)
    }
  })
}

function loadHTMLFromFile(filepath) {
  return fs.readFileSync(path.join(process.cwd(), filepath), 'utf8')
}

function onHTMLReady(html) {
  console.log(h2m(html))
}

program
  .version(pkg.version)
  .arguments('<file>')
  .action(function(file) {
    if (/^(http|https):\/\//.test(file)) {
      loadHTMLFromURI(file, onHTMLReady)
    } else if (file) {
      onHTMLReady(loadHTMLFromFile(file))
    } else {
      throw new Error('an http url or file path must be given')
    }
  })

program.parse(process.argv)
