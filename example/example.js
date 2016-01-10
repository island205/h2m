var h2m = require('../index')
var fs = require('fs')
var path = require('path')

var html = fs.readFileSync(path.join(__dirname, './fixtures/source.html'), 'utf8')

var md = h2m(html)

fs.writeFileSync(path.join(__dirname, './fixtures/result.md'), md, 'utf8')
