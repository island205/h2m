# h2m

[![npm](https://img.shields.io/npm/v/h2m.svg)](https://www.npmjs.com/package/h2m)

Tool for converting HTML to Markdown.

online converter: http://island205.github.io/h2m/

![online converter](./images/online-converter.png)

## Install

```bash
$npm install h2m
```
## How to use

```javascript
var h2m = require('h2m')

var md = html('<h1>Hello World</h1>')
// md = '# Hello World'
```

## Supported

- :heavy_check_mark: br
- :heavy_check_mark: em
- :heavy_check_mark: strong
- :heavy_check_mark: code
- :heavy_check_mark: a
- :heavy_check_mark: img
- :heavy_check_mark: hr
- :heavy_check_mark: ul, ol
- :heavy_check_mark: pre
- :heavy_check_mark: div
- :heavy_check_mark: p
- :heavy_check_mark: blockquote
- :heavy_check_mark: h1 ~ h6
- :airplane: table
