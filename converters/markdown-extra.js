/**
 * implement based on https://michelf.ca/projects/php-markdown/extra/
 */

'use strict'

var CommonMark = require('./commonmark')

function getSpecialAttributes(node) {
    var specialAttributes = []
    var value
    if (value = node.attrs['id']) {
        specialAttributes.push(`#${value}`)
    }
    if (value = node.attrs['class']) {
        specialAttributes.push(value.split(/\s+/).map(function (klass) {
            return `.${klass}`
        }).join(' '))
    }
    Object.keys(node.attrs).forEach(function (key) {
        if (key !== 'id' && key !== 'class') {
            specialAttributes.push(`${key}=${value}`)            
        }
    })
    return specialAttributes.join(' ')
}

var Extra = Object.create(CommonMark)

var hx
for (var i = 0; i < 6; i++) {
    let j = i + 1
    hx = `h${j}`
    Extra[hx] = function (node) {
        var hashes = '#'.repeat(j)
        return `\n${hashes} ${node.md} ${hashes} (${getSpecialAttributes(node)})\n`
    }
}

module.exports = Extra