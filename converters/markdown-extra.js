/**
 * implement based on https://michelf.ca/projects/php-markdown/extra/
 */

var CommonMark = require('./commonmark')

var ignoreAttributes = ['id', 'class', 'href', 'src', 'alt']
function getSpecialAttributes(node) {
    var specialAttributes = []
    var value = node.attrs['id']
    if (value) {
        specialAttributes.push(`#${value}`)
    }
    value = node.attrs['class']
    if (value) {
        specialAttributes.push(value.split(/\s+/).map(function (klass) {
            return `.${klass}`
        }).join(' '))
    }
    Object.keys(node.attrs).forEach(function (key) {
        if (ignoreAttributes.indexOf(key) == -1) {
            specialAttributes.push(`${key}=${value}`)
        }
    })
    specialAttributes = specialAttributes.join(' ')

    if (specialAttributes.length <= 0) {
      return ''
    } else {
      return ` (${specialAttributes})`
    }
}

var Extra = Object.create(CommonMark)

// Special Attributes
// headers
var hx
for (var i = 0; i < 6; i++) {
    (function (j) {
      hx = `h${j}`
      Extra[hx] = function (node) {
          var hashes = '#'.repeat(j)
          return `\n${hashes} ${node.md} ${hashes}${getSpecialAttributes(node)}\n`
      }
    })(i + 1)

}
// links
Extra['a'] = function (node) {
  return `${CommonMark['a'](node)}${getSpecialAttributes(node)}`
}
// images
Extra['img'] = function (node) {
  return `${CommonMark['img'](node)}${getSpecialAttributes(node)}`
}


// Fenced Code Blocks
Extra['pre'] = function (node) {
  return `\n\`\`\`\n${node.md}\n\`\`\`\n`
}

// Tables
// Extra['table'] = function (node) {}

// Definition Lists
Extra['dl'] = function (node) {
  var md = node.md
  if (md) {
    return `\n${md}\n`
  }
}
Extra['dt'] = function (node) {
  var md = node.md
  if (md) {
    return `${md}\n`
  }
}
Extra['dd'] = function (node) {
  var md = node.md
  if (md) {
    return `:   ${md}\n\n`
  }
}

// Abbreviations
var abbrs = []

Extra['abbr'] = function (node) {
  if (node.attrs.title != '') {
    abbrs.push({
      word: node.md,
      title: node.attrs.title
    })
  }
  return node.md
}

function generateAbbreviations() {
  var results = abbrs.map(function (abbr) {
    return `*[${abbr.word}]: ${abbr.title}`
  }).join('\n')
  // clean up
  abbrs  = []
  return results
}

Extra.cleanup = function (result) {
  // append abbreviations to tail of markdown 
  return CommonMark.cleanup(`${result}\n\n${generateAbbreviations()}`)
}

module.exports = Extra
