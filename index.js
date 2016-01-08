var posthtml = require('posthtml')
var parser = require('posthtml-parser')
var walk = require('posthtml/lib/api').walk

var nonTextTags = ['script', 'style', 'link', 'head']
var nonTextStrings = ['<!DOCTYPE html>']

function getTextInNode(node) {
  var text = []
  walk.call(node, function(node) {
    if (typeof node == 'string') {
      text.push(node)
    }
    return node
  })
  return text.join('')
}

module.exports = function (html) {
  var tree = parser(html)
  var md = []
  walk.call(tree, function (node) {
    if ((typeof node == 'string' && nonTextStrings.indexOf(node) == -1) ||
        (typeof node != 'string' && nonTextTags.indexOf(node.tag) == -1)) {
      return node
    }
  })
  walk.call(tree, function (node) {
    if (typeof node == 'string') {
      md.push(node)
    } else if (typeof node == 'object'){
      switch (node.tag) {
        case 'a':
          md.push(`[${getTextInNode(node)}](${node.attrs.href})`)
          node.content = []
          break;
        case 'img':
          md.push(` ![${node.attrs.title || node.attrs.alt || node.attrs.src}](${node.attrs.src}) `)
          node.content = []
          break;
        case 'pre':
          md.push(`\n    ${getTextInNode(node).split('\n').join('    ')}\n`)
          node.content = []
          break;
        case 'p':
          md.push(`\n${getTextInNode(node)}\n`)
          node.content = []
          break;
        case 'h1':
          md.push(`\n# ${getTextInNode(node)}\n`)
          node.content = []
          break;
        case 'h2':
          md.push(`\n## ${getTextInNode(node)}\n`)
          node.content = []
          break;
        case 'h3':
          md.push(`\n### ${getTextInNode(node)}\n`)
          node.content = []
          break;
        case 'h4':
          md.push(`\n#### ${getTextInNode(node)}\n`)
          node.content = []
          break;
        case 'h5':
          md.push(`\n##### ${getTextInNode(node)}\n`)
          node.content = []
          break;
        case 'h6':
          md.push(`\n###### ${getTextInNode(node)}\n`)
          node.content = []
          break;
        default:
          // do nothing
      }
    }
    return node
  })
  return md.join('')
}
