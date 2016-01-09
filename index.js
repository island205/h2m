var posthtml = require('posthtml')
var parser = require('posthtml-parser')
var walk = require('posthtml/lib/api').walk

var nonTextTags = ['script', 'style', 'link', 'head']
var commentRegex = /<!--[\s\S]*?-->/g
var nonTextStringMatchers = ['<!DOCTYPE html>', commentRegex]

function isTextString(str) {
  var i
  var matcher
  for (i = 0; i < nonTextStringMatchers.length; i++ ) {
    var matcher = nonTextStringMatchers[i]
    if ((matcher.indexOf && str.indexOf(matcher) > -1) ||
    (matcher.test && matcher.test(str))) {
      return false
    }
  }
  return true
}

function getTextInNode(node) {
  var text = []
  walk.call(node, function(node) {
    if (typeof node == 'string') {
      text.push(node)
    } else {
      switch (node.tag) {
        case 'br':
          text.push('\n')
          break;
        case 'a':
          text.push(`[${getTextInNode(node)}](${node.attrs.href})`)
          node.content = []
          break;
        default:

      }
    }
    return node
  })
  return text.join('').replace(commentRegex, '').trim()
}

module.exports = function (html) {
  html =  html.replace(commentRegex, '')
  var tree = parser(html)
  var md = []
  walk.call(tree, function (node) {
    if ((typeof node == 'string' && isTextString(node)) ||
        (typeof node != 'string' && nonTextTags.indexOf(node.tag) == -1)) {
      return node
    }
  })
  walk.call(tree, function (node) {
    var text
    if (typeof node == 'string') {
      md.push(node)
    } else if (typeof node == 'object'){
      switch (node.tag) {
        case 'a':
          text = getTextInNode(node)
          if (text) {
            md.push(`[${}](${node.attrs.href})`)
          }
          node.content = []
          break;
        case 'img':
          if (node.attrs.src) {
            md.push(` ![${(node.attrs.title || node.attrs.alt || node.attrs.src).trim()}](${node.attrs.src}) `)
          }
          node.content = []
          break;
        case 'pre':
          md.push(`\n    ${getTextInNode(node).split('\n').join('\n    ')}\n`)
          node.content = []
          break;
        case 'p':
          md.push(`\n${getTextInNode(node)}\n`)
          node.content = []
          break;
        case 'blockquote':
          md.push(`\n> ${getTextInNode(node)}\n`)
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
