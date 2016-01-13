#!/usr/bin/env node

var h2m = require('../index')
var program = require('commander')
var request = require('request')
var phantom = require('phantom')
var path = require('path')
var fs = require('fs')
var pkg = require('../package.json')

function loadHTMLFromURI(uri, enablePhantomJS, callback) {
  if (enablePhantomJS) {
    phantom.create(function (ph) {
      ph.onConsoleMessage = function () {}
      ph.createPage(function (page) {
        page.onConsoleMessage = function(msg) {
          // console.log(msg)
        }
        page.open(uri, function (status) {
          page.evaluate(function () { return document.body.innerHTML }, function (html) {
            callback(html)
            ph.exit()
          })
        })
      })
    })
  } else {
    request(uri, function (error, response, body) {
      if (error) {
      } else if (response.statusCode == 200) {
        callback(body)
      }
    })
  }
}

function loadHTMLFromFile(filepath) {
  return fs.readFileSync(path.join(process.cwd(), filepath), 'utf8')
}

function onHTMLReady(html) {
  // console.log(h2m(html))
}


function run(program) {
  if (program.uri) {
    loadHTMLFromURI(program.uri, program.phantomjs, onHTMLReady)
  } else if (program.file) {
    onHTMLReady(loadHTMLFromFile(program.file))
  } else {
    throw new Error('an http url or file path must be given')
  }
}

program
  .version(pkg.version)
  .option('-p, --phantomjs', "use PhantomJS to render HTML")
  .option('-f, --file [file path]', "set the file path want to convert")
  .option('-u, --uri [http url]', "set the url of page want to convert ")
  .parse(process.argv)


run(program)
