var posthtml = require('posthtml')
var parser = require('posthtml-parser')
var walk = require('posthtml/lib/api').walk

var nonTextTags = ['script', 'style', 'link', 'head', 'noscript']
var commentRegex = /<!--[\s\S]*?-->/g
var nonTextStringMatchers = ['<!DOCTYPE html>', commentRegex, /^\s+$/]
var escapeMap = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": "\"",
  "&#x27;": "'",
  "&#x60;": "`",
  "&nbsp;": " ",
  "&#8202;": " "
}

var unescape = (function () {
  var source = `(?:${Object.keys(escapeMap).join('|')})`
  var testRegexp = RegExp(source)
  var replaceRegexp = RegExp(source, 'g')
  var escaper = function (match) {
    return escapeMap[match]
  }
  return function (string) {
    string = string || ''
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string
  }
})()

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

function getTextInPreNode(node) {
  var text = []
  walk.call(node, function(node) {
    if (typeof node == 'string') {
      text.push(node)
    } else {
      switch (node.tag) {
        case 'br':
          text.push('\n')
          break
        case 'div':
          text.push(`\n${getTextInPreNode(node)}`)
          node.content = []
          break
        default:

      }
    }
    return node
  })
  return text.join('').replace(commentRegex, '').trim()
}

function getTextInNode(node) {
  var text = [], txt
  walk.call(node, function(node) {
    if (typeof node == 'string') {
      text.push(node)
    } else {
      switch (node.tag) {
        case 'br':
          text.push('\n')
          break
        case 'em':
          txt = getTextInNode(node)
          if (txt) {
            text.push(`*${txt.trim()}*`)
          }
          node.content = []
          break
        case 'strong':
          txt = getTextInNode(node)
          if (txt) {
            text.push(`**${txt.trim()}**`)
          }
          node.content = []
          break
        case 'code':
          txt = getTextInNode(node)
          if (txt) {
            text.push(`\`${txt.trim()}\``)
          }
          node.content = []
          break
        case 'a':
          txt = getTextInNode(node) || (node.attrs && node.attrs.href)
          if (txt) {
            text.push(`[${txt}](${node.attrs.href})`)
          }
          node.content = []
          break
        case 'img':
          if (node.attrs && node.attrs.src) {
            text.push(` ![${(node.attrs.title || node.attrs.alt || node.attrs.src).trim()}](${node.attrs.src}) `)
          }
          node.content = []
          break
        default:
          text.push(getTextInNode(node))
          node.content = []

      }
    }
    return node
  })
  return unescape(text.join('').replace(commentRegex, '').trim())
}

/**
 * get markdown from a posthtml node
 * @param {String|Object} node
 * @return {String}
 */

function getMarkdownInNode(node) {
  // console.log('getMarkdownInNode', JSON.stringify(node))
  var md = []
  var text, href
  var mdBlock
  if (typeof node == 'string') {
    md.push(node.trim())
  } else {
    switch (node.tag) {
      // inline
      case 'br':
        md.push('\n')
        break
      case 'em':
        text = getTextInNode(node)
        if (text) {
          md.push(`*${text}*`)
        }
        node.content = []
        break
      case 'strong':
        text = getTextInNode(node)
        if (text) {
          md.push(`**${text}**`)
        }
        node.content = []
        break
      case 'code':
        text = getTextInNode(node)
        if (text) {
          md.push(`\`${text}\``)
        }
        node.content = []
        break
      case 'a':
        text = getTextInNode(node) || node.attrs.href
        href = node.attrs.href || ''
        if (text && href) {
          md.push(`[${text}](${href})`)
        }
        node.content = []
        break
      case 'img':
        if (node.attrs && node.attrs.src) {
          md.push(`![${(node.attrs.title || node.attrs.alt || node.attrs.src).trim()}](${node.attrs.src})`)
        }
        node.content = []
        break
      // block
      case 'hr':
        md.push('\n\n---')
        node.content = []
        break
      case 'ul':
        text = node.content && node.content.filter(function (node) {
          return typeof node == 'object' && node.tag == 'li'
        }).map(function (node, index) {
          return `- ${getTextInNode(node)}`
        }).join('\n')
        if (text) {
          md.push(`\n\n${text}`)
        }
        node.content = []
        break
      case 'ol':
        text = node.content.filter(function (node) {
          return typeof node == 'object' && node.tag == 'li'
        }).map(function (node, index) {
          return `${index+1}. ${getTextInNode(node)}`
        }).join('\n')
        md.push(`\n\n${text}`)
        node.content = []
        break
      case 'pre':
        md.push()
        md.push(`\n\n    ${unescape(getTextInPreNode(node)).split('\n').join('\n    ')}`)
        node.content = []
        break
      // pure block element
      case 'div':
      // figcaption http://www.w3schools.com/tags/tag_figcaption.asp
      case 'figcaption':
        md.push(`\n\n${getMarkdownInTree(node.content)}`)
        node.content = []
        break
      case 'p':
        md.push(`\n\n${getTextInNode(node)}`)
        node.content = []
        break
      case 'blockquote':
        md.push(`\n\n> ${getMarkdownInTree(node.content).split('\n').join('\n> ')}`)
        node.content = []
        break
      case 'h1':
        md.push(`\n\n# ${getTextInNode(node)}`)
        node.content = []
        break
      case 'h2':
        md.push(`\n\n## ${getTextInNode(node)}`)
        node.content = []
        break
      case 'h3':
        md.push(`\n\n### ${getTextInNode(node)}`)
        node.content = []
        break
      case 'h4':
        md.push(`\n\n#### ${getTextInNode(node)}`)
        node.content = []
        break
      case 'h5':
        md.push(`\n\n##### ${getTextInNode(node)}`)
        node.content = []
        break
      case 'h6':
        md.push(`\n\n###### ${getTextInNode(node)}`)
        node.content = []
        break
      default:
        md.push(`${getMarkdownInTree(node.content)}`)
    }
  }
  // console.log('getMarkdownInNode result', JSON.stringify(md.join('')))
  return md.join('')
}


/**
 * get markdown from a posthtml tree
 * @param {Array} tree
 * @return {String}
 */
function getMarkdownInTree(tree) {
  // console.log('getMarkdownInTree', JSON.stringify(tree))
  var md = []
  walk.call(tree, function(node) {
    md.push(getMarkdownInNode(node))
  })
  // console.log('getMarkdownInTree result', JSON.stringify(md.join('').replace(/^\n\n/, '')))
  return md.join('').replace(/^\n\n/, '')
}

module.exports = function (html) {
  html =  html.replace(commentRegex, '')
  var tree = parser(html)
  walk.call(tree, function (node) {
    if ((typeof node == 'string' && isTextString(node)) ||
        (typeof node != 'string' && nonTextTags.indexOf(node.tag) == -1)) {
      return node
    }
    return ''
  })
  return getMarkdownInTree(tree)
}
