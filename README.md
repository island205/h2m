# h2m

![logo](./design/logo@0.5.png)

[![npm](https://img.shields.io/npm/v/h2m.svg)](https://www.npmjs.com/package/h2m)
[![Build Status](https://travis-ci.org/island205/h2m.svg)](https://travis-ci.org/island205/h2m)
[![Coverage Status](https://coveralls.io/repos/island205/h2m/badge.svg?branch=master)](https://coveralls.io/github/island205/h2m)

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

var md = h2m('<h1>Hello World</h1>')
// md = '# Hello World'
```

## CLI

### install

```bash
$ npm install h2m -g
```

### usage

```
$h2m -h

Usage: h2m [options] <file>

Options:

  -h, --help     output usage information
  -V, --version  output the version number
```

Convert a local file:

```bash
$ h2m index.html

converting HTML to Markdown

made by [@island205](https://github.com/island205)

Can't be convert? welcome to submit an [issue](https://github.com/island205/h2m/issues/new).
```

Convert an online url:

```bash
$ h2m https://baidu.com
```

Save result:

```bash
$ h2m https://google.com > google.md
```

## Support

`h2m` supports standard Markdown sytax: [CommonMark](http://commonmark.org/help/) now.

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

## Contribution

PRs are welcome to implement other extend Markdown language, like [Markdown Extra](https://en.wikipedia.org/wiki/Markdown_Extra), [GFM](https://help.github.com/articles/github-flavored-markdown/) and so on.
