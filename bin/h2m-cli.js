#!/usr/bin/env node

var h2m = require('../index')
var program = require('commander')
var request = require('request')
var path = require('path')
var fs = require('fs')
var pkg = require('../package.json')
var clipboardy = require('clipboardy')

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
  .option('-f, --file <file>', 'HTML file path or an url adress', '')
  .option('-c, --clipboard', 'read HTML from clipboard')
  .action(function(env) {
    if (env.clipboard) {
      onHTMLReady(clipboardy.readSync() || '')
    } else if (/^(http|https):\/\//.test(env.file)) {
      loadHTMLFromURI(env.file, onHTMLReady)
    } else if (env.file) {
      onHTMLReady(loadHTMLFromFile(env.file))
    } else {
      console.log('use h2m -h to learn usage')
    }
  })

program.parse(process.argv)
