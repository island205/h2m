var h2m = require('../index')
var fs = require('fs')
var path = require('path')

var html = fs.readFileSync(path.join(__dirname, './fixtures/table.html'), 'utf8')

var md = h2m(html, {converter: 'MarkdownExtra'})

fs.writeFileSync(path.join(__dirname, './fixtures/table.md'), md, 'utf8')
