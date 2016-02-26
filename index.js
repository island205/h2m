var htmlparser = require("htmlparser2")
var converters = require('./converters/')

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

/**
 * @param html {String} the html to be onverted
 * @param options {Object}
 *   {
 *      converter {String} which converter you choose
 *      overides {Object<String, Function>} override converter behavior, for example:
 *          {
 *              br: function (node) {
 *                  return `\n\n` // let br tag break twice
 *              }
 *          }
 *   }
 */
module.exports = function (html, options) {
  options = Object.assign({
    converter: 'CommonMark'
  }, options)

  var converter = Object.assign(
      Object.create(converters[options.converter]),
       options.overides || {}
  )

  var nodeBuffer = []
  var results = []
  var isInPreNode = false
  function convert(node) {
    node.md = (node.md && node.md.join('')) || ''
    return (converter[node.name] || converter['default'])(node) || ''
  }

  var parser = new htmlparser.Parser({
    onopentag: function (name, attributes) {
      var node = {
        name: name,
        attrs: attributes,
        isInPreNode: isInPreNode
      }
      if (name === 'pre') {
        isInPreNode = true
      }
      nodeBuffer.push(node)
    },
    ontext: function (text) {
      if (/^\s+$/.test(text)) {
        return
      }
      text = unescape(text)
      var last = nodeBuffer[nodeBuffer.length - 1]
      if (last) {
        last.md = last.md || []
        last.md.push(text)
      } else {
        results.push(text)
      }
    },
    onclosetag: function (name) {
      var last = nodeBuffer.pop()
      var md = convert(last)

      if (name === 'pre') {
        isInPreNode = false
      }

      if (nodeBuffer.length === 0) {
        return results.push(md)
      }

      var tail = nodeBuffer[nodeBuffer.length - 1]
      tail.md = tail.md || []
      tail.md.push(md)
    }
  }, {decodeEntities: false})
  parser.write(html)
  parser.end()
  // remove the \n on head or tail
  return typeof converter.cleanup == 'function'
    ? converter.cleanup(results.join(''))
    : results.join('')
}
