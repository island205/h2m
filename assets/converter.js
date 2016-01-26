;(function () {
  function Converter() {
    this.htmlEditor = document.querySelector('#html')
    this.markDownEditor = document.querySelector('#markdown')
    this.markDownPreviewer = document.querySelector('.markdown-previewer')
    this.errorMessageWrapper = document.querySelector('.error-message-wrapper')
    this.submitAIssue = document.querySelector('#submit-a-issue')
    this.implementSwitch = document.querySelectorAll('[name=implement]')
    this.state = {
      implement: 'CommonMark',
    }
    this.bindEvents()
  }

  Converter.prototype.bindEvents = function () {
    var self  = this
    var html = this.htmlEditor.value
    function onChange() {
      var newHTML = self.htmlEditor.value
      var md
      if (html != newHTML) {
        self.notifyError(null)
        try {
          md = h2m(newHTML, {
            converter: self.state.implement
          })
          self.setM(md)
        } catch(e) {
          self.notifyError(e || 'Convert Error')
        }
        html = newHTML
      }
    }
    this.htmlEditor.addEventListener('keyup', onChange)
    this.htmlEditor.addEventListener('paste', onChange)
    document.querySelector('#preview-checker').addEventListener('change', function () {
      if (this.checked) {
        self.markDownPreviewer.style.display = 'block'
      } else {
        self.markDownPreviewer.style.display = 'none'
      }
    })
    Array.prototype.forEach.call(this.implementSwitch, function (switchEl) {
      switchEl.addEventListener('click', function () {
        self.switchImplenentTo(switchEl.value)
      })
    })
  }

  Converter.prototype.setM = function (md) {
    console.log(JSON.stringify(md))
    this.markDownEditor.value = md
    this.markDownPreviewer.innerHTML = markdown.toHTML(md)
  }

  Converter.prototype.switchImplenentTo = function (implement) {
    this.state.implement = implement
    var html = this.htmlEditor.value
    md = h2m(html, {
      converter: this.state.implement
    })
    this.setM(md)
  }

  Converter.prototype.notifyError = function (err) {
    if (err == undefined) {
      return this.submitAIssue.href = 'https://github.com/island205/h2m/issues/new'
    }
    alert('Ops, please submit a issue with link in right!')
    if (typeof err == 'object') {
      this.submitAIssue.href = 'https://github.com/island205/h2m/issues/new?'
        + 'title=Can\'t convert:' + err.message
        + '&body=' + err.stack + '-------html-------' + this.htmlEditor.value
    } else {
      this.submitAIssue.href = 'https://github.com/island205/h2m/issues/new?'
        + 'title=' + err
        + '&body=' + '-------html-------' + this.htmlEditor.value
    }
  }
  new Converter()
})()
