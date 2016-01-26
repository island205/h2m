/**
 * http://commonmark.org/help/
 */

var LI_HEADER = 'H2M_LI_HEADER'

module.exports = {
  em: function (node) {
    if (node.md) {
      return `*${node.md}*`
    }
  },
  strong: function (node) {
    if (node.md) {
      return `**${node.md}**`
    }
  },
  h1: function (node) {
    if (node.md) {
      return `\n# ${node.md}\n`
    }
  },
  h2: function (node) {
    if (node.md) {
      return `\n## ${node.md}\n`
    }
  },
  h3: function (node) {
    if (node.md) {
      return `\n### ${node.md}\n`
    }
  },
  h4: function (node) {
    if (node.md) {
      return `\n#### ${node.md}\n`
    }
  },
  h5: function (node) {
    if (node.md) {
      return `\n##### ${node.md}\n`
    }
  },
  h6: function (node) {
    if (node.md) {
      return `\n###### ${node.md}\n`
    }
  },
  a: function (node) {
    var text = node.md || node.attrs.href
    var href = node.attrs.href || text
    if (text) {
      return `[${text}](${href})`
    }
  },
  img: function (node) {
    var src = node.attrs.src
    if (src) {
      return`![${(node.attrs.title || node.attrs.alt || '').trim()}](${src})`
    }
  },
  blockquote: function (node) {
    var md = node.md
    if (md) {
      md = md.replace(/(^\n+|\n+$)/g, '')
      md = md.split('\n').map(function (line) {
        return `> ${line}\n`
      }).join('')
      return `\n${md}\n`
    }
  },
  ul: function (node) {
    if (node.md) {
      return `\n${node.md.replace(new RegExp(LI_HEADER, 'ig'), '-')}\n`
    }
  },
  ol: function (node) {
    var index = 1
    if (node.md) {
      return `\n${node.md.replace(new RegExp(LI_HEADER, 'ig'), function () {
        return `${index++}.`
      })}\n`
    }
  },
  li: function (node) {
    if (node.md) {
      return `${LI_HEADER} ${node.md}\n`
    }
  },
  hr: function () {
    return '\n---\n'
  },
  code: function (node) {
    if (node.md) {
      if (node.isInPreNode) {
        return node.md
      }
      return `\`${node.md}\``
    }
  },
  br: function () {
    return '\n'
  },
  pre: function (node) {
    var md = node.md
    if (md) {
      md = md.split('\n').map(function (line) {
        return `    ${line}\n`
      }).join('')
      return `\n${md}\n`
    }
  },
  p: function (node) {
    var md = node.md
    if (md) {
      return `\n${md}\n`
    }
  },
  div: function (node) {
    var md = node.md
    if (md) {
      return `\n${md}\n`
    }
  },
  'default': function (node) {
    return node.md
  },
  cleanup: function (result) {
    // remove leading or tailing break
    // convert \n\n\n... to \n\n
    return result.replace(/(^\n+|\n+$)/g, '')
                 .replace(/\n{3,}/g, '\n\n')
  }
}
