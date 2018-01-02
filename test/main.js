var h2m = require('../index')
var expect = require('chai').expect
var path = require('path')
var fs = require('fs')
function fixture(file) {
  return fs.readFileSync(path.join(__dirname, `fixtures/${file}`), 'utf8').replace(/\n$/, '')
}

describe('CommonMark', function () {
  it('should parse <br /> to \\n', function () {
    expect(h2m('z<br/>z')).to.equal('z\nz')
  })

  it('should parse em tag to *txt*', function () {
    expect(h2m('<em>txt</em>')).to.equal('*txt*')
    expect(h2m('<em></em>')).to.equal('')
  })

  it('should parse strong tag to **txt**', function () {
    expect(h2m('<strong>txt</strong>')).to.equal('**txt**')
    expect(h2m('<strong></strong>')).to.equal('')
  })

  it('should parse code tag to `txt`', function () {
    expect(h2m('<code>txt</code>')).to.equal('`txt`')
    expect(h2m('<code></code>')).to.equal('')
  })

  it('should parse a tag', function () {
    expect(h2m('<a href="http://island205.github.io/h2m/">h2m</a>')).to.equal('[h2m](http://island205.github.io/h2m/)')
    expect(h2m('<a href="http://island205.github.io/h2m/"></a>')).to.equal('[http://island205.github.io/h2m/](http://island205.github.io/h2m/)')
    expect(h2m('<a href="">h2m</a>')).to.equal('[h2m](h2m)')
  })

  it('should parse img tag', function () {
    expect(h2m('<img title="h2m" src="https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png" />')).to.equal('![h2m](https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png)')
    expect(h2m('<img alt="h2m" src="https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png" />')).to.equal('![h2m](https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png)')
    expect(h2m('<img src="https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png" />')).to.equal('![](https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png)')
    expect(h2m('<img />')).to.equal('')
  })

  it('should parse hr tag', function () {
    expect(h2m('<hr/>')).to.equal('---')
  })

  it('should parse ul tag', function () {
    expect(h2m(fixture('ul.html'))).to.equal(fixture('ul.md'))
    expect(h2m('<ul></ul>')).to.equal('')
  })

  it('should parse ol tag', function () {
    expect(h2m(fixture('ol.html'))).to.equal(fixture('ol.md'))
  })

  it('should parse pre tag', function () {
    expect(h2m('<pre>code</pre>')).to.equal('    code')
    expect(h2m('<pre><code>code</code></pre>')).to.equal('    code')
    expect(h2m(fixture('pre.html'))).to.equal(fixture('pre.md'))
  })

  it('should parse div tag', function () {
    expect(h2m('<div>code</div>')).to.equal('code')
  })

  it('should parse p tag', function () {
    expect(h2m('<p>code</p>')).to.equal('code')
  })

  it('should parse blockquote tag', function () {
    expect(h2m('<blockquote>code</blockquote>')).to.equal('> code')
  })

  it('should parse h* tag', function () {
    expect(h2m('<h1>code</h1>')).to.equal('# code')
    expect(h2m('<h2>code</h2>')).to.equal('## code')
    expect(h2m('<h3>code</h3>')).to.equal('### code')
    expect(h2m('<h4>code</h4>')).to.equal('#### code')
    expect(h2m('<h5>code</h5>')).to.equal('##### code')
    expect(h2m('<h6>code</h6>')).to.equal('###### code')
  })

  it('should parse nested inline tag', function () {
    expect(h2m('<h1><a href="http://island205.github.io/h2m/">h2m</a></h1>')).to.equal('# [h2m](http://island205.github.io/h2m/)')
    expect(h2m('<h1><em></em>h2m</h1>')).to.equal('# h2m')
    expect(h2m('<h1><strong></strong>h2m</h1>')).to.equal('# h2m')
    expect(h2m('<h1><code></code>h2m</h1>')).to.equal('# h2m')
    expect(h2m('<h1><a></a>h2m</h1>')).to.equal('# h2m')
    expect(h2m('<h1><img />h2m</h1>')).to.equal('# h2m')
    expect(h2m('<h1><a href="http://island205.github.io/h2m/"></a></h1>')).to.equal('# [http://island205.github.io/h2m/](http://island205.github.io/h2m/)')
    expect(h2m('<a href="http://island205.github.io/h2m/">h2<br/>m</a>')).to.equal('[h2\nm](http://island205.github.io/h2m/)')
    expect(h2m('<a href="http://island205.github.io/h2m/">h<em>2</em>m</a>')).to.equal('[h*2*m](http://island205.github.io/h2m/)')
    expect(h2m('<h2>h<strong>2</strong>m</h2>')).to.equal('## h**2**m')
    expect(h2m('<h2><code>h2m</code></h2>')).to.equal('## `h2m`')
    expect(h2m('<a href="http://island205.github.io/h2m/"><img title="h2m" src="https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png" /></a>')).to.equal('[![h2m](https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png)](http://island205.github.io/h2m/)')
    expect(h2m('<a href="http://island205.github.io/h2m/"><img alt="h2m" src="https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png" /></a>')).to.equal('[![h2m](https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png)](http://island205.github.io/h2m/)')
    expect(h2m('<a href="http://island205.github.io/h2m/"><img src="https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png" /></a>')).to.equal('[![](https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png)](http://island205.github.io/h2m/)')
  })

  it('should ignore other unsupport tag', function () {
    expect(h2m('<article>code</article>')).to.equal('code')
    expect(h2m('<h2>co<i>d</i>e</h2>')).to.equal('## code')
  })

})

describe('MarkdownExtra', function () {
    it('should support Special Attributes', function () {
        expect(h2m('<h1 class="h2m">h2m</h1>', {
            converter: 'MarkdownExtra'
        })).to.equal('# h2m # (.h2m)')
        expect(h2m('<h1 id="h2m" class="h2m">h2m</h1>', {
            converter: 'MarkdownExtra'
        })).to.equal('# h2m # (#h2m .h2m)')

        expect(h2m('<a href="http://island205.github.io/h2m/" id="h2m" class="h2m">h2m</a>', {
            converter: 'MarkdownExtra'
        })).to.equal('[h2m](http://island205.github.io/h2m/) (#h2m .h2m)')

        expect(h2m('<img src="http://island205.github.io/h2m/" alt="h2m" id="h2m" class="h2m" />', {
            converter: 'MarkdownExtra'
        })).to.equal('![h2m](http://island205.github.io/h2m/) (#h2m .h2m)')
    })

    it('should support Fenced Code Blocks', function () {
      expect(h2m('<pre><code>h2m</code></pre>', {
          converter: 'MarkdownExtra'
      })).to.equal('```\nh2m\n```')
    })

    it('should support Definition Lists', function() {
      expect(h2m(fixture('MarkdownExtra/Definition-Lists.html'), {
          converter: 'MarkdownExtra'
      })).to.equal(fixture('MarkdownExtra/Definition-Lists.md'))
    })

    it('should support Abbreviations', function() {
      expect(h2m(fixture('MarkdownExtra/Abbreviations.html'), {
          converter: 'MarkdownExtra'
      })).to.equal(fixture('MarkdownExtra/Abbreviations.md'))
    })

    it('should support table', function () {
      expect(h2m(fixture('MarkdownExtra/table.html'), {
          converter: 'MarkdownExtra'
      })).to.equal(fixture('MarkdownExtra/table.md'))
    })
})

describe('api', function () {
  it('should to overide converter behavior', function () {
      expect(h2m('s<br/>s', {
          overides: {
              br: function() {
                  return `\n\n\n`
              }
          }
      }), 's\n\n\ns')
  })
})

describe('nested tag', function () {
  it('should handle nested tag perfectly', function () {
    expect(h2m('<div>code<div>code</div></div>')).to.equal('code\ncode')
    // expect(h2m(fixture('pre2.html'))).to.equal(fixture('pre2.md'))
    expect(h2m('<div>code<div><div>code</div></div></div>')).to.equal('code\n\ncode')
    expect(h2m('<p>code</p><p>code</p>')).to.equal('code\n\ncode')
    expect(h2m('<blockquote><blockquote>code</blockquote></blockquote>')).to.equal('> > code')
  })
})

describe('bug', function () {
  it('#4', function () {
    expect(h2m(fixture('#4.html'), {
        converter: 'MarkdownExtra'
    })).to.equal(fixture('#4.md'))
  })
})
