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
      return `# ${node.md}`
    }
  },
  h2: function (node) {
    if (node.md) {
      return `## ${node.md}`
    }
  },
  h3: function (node) {
    if (node.md) {
      return `### ${node.md}`
    }
  },
  h4: function (node) {
    if (node.md) {
      return `#### ${node.md}`
    }
  },
  h5: function (node) {
    if (node.md) {
      return `##### ${node.md}`
    }
  },
  h6: function (node) {
    if (node.md) {
      return `###### ${node.md}`
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
      return`![${(node.attrs.title || node.attrs.alt || src).trim()}](${src})`
    }
  },
  blockquote: function (node) {
    if (node.md) {
      return node.md.split('\n').filter(function (line) {
        return !/^\s*$/.test(line)
      }).map(function (line) {
        return `> ${line}\n`
      }).join('')
    }
  },
  ul: function (node) {
    if (node.md) {
      return `${node.md.replace(new RegExp(LI_HEADER, 'ig'), '-')}`
    }
  },
  ol: function (node) {
    var index = 1
    if (node.md) {
      return `${node.md.replace(new RegExp(LI_HEADER, 'ig'), function () {
        return `${index++}.`
      })}`
    }
  },
  li: function (node) {
    if (node.md) {
      return `${LI_HEADER} ${node.md}\n`
    }
  },
  hr: function (node) {
    return '---'
  },
  code: function (node) {
    if (node.md) {
      if (node.isInPreNode) {
        return node.md
      }
      return `\`${node.md}\``
    }
  },
  br: function (node) {
    return '\n'
  },
  pre: function (node) {
    console.log('pre', node.md)
    if (node.md) {
      node.md = node.md.replace(/\s$/, '')
      return node.md.split('\n').map(function (line) {
        return `    ${line}\n`
      }).join('')
    }
  },
  p: function (node) {
    var md = node.md
    if (md) {
      if (!/\n$/.test(md)) {
        md += '\n'
      }
      return md
    }
  },
  div: function (node) {
    var md = node.md
    if (md) {
      if (!/\n$/.test(md)) {
        md += '\n'
      }
      return md
    }
  },
  'default': function (node) {
    return node.md
  }
}
