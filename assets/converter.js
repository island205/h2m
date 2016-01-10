;(function () {
  function Converter() {
    this.htmlEditor = document.querySelector('#html')
    this.markDownEditor = document.querySelector('#markdown')
    this.markDownPreviewer = document.querySelector('.markdown-previewer')
    this.errorMessageWrapper = document.querySelector('.error-message-wrapper')
    this.bindEvents()
  }

  Converter.prototype.bindEvents = function () {
    var self  = this
    var html = this.htmlEditor.value
    function onChange() {
      var newHTML = self.htmlEditor.value
      var md
      if (html != newHTML) {
        self.notifyError('')
        try {
          md = h2m(newHTML)
          self.setM(md)
        } catch(e) {
          self.notifyError((e && e.message) || 'Convert Error')
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
  }

  Converter.prototype.setM = function (md) {
    console.log(JSON.stringify(md))
    this.markDownEditor.value = md
    this.markDownPreviewer.innerHTML = markdown.toHTML(md)
  }

  Converter.prototype.notifyError = function (msg) {
    if (msg) {
      this.errorMessageWrapper.innerHTML = '<p class="error-message">' + msg + '</p>'
    } else {
      this.errorMessageWrapper.innerHTML = ''
    }
  }

  new Converter()
})()
