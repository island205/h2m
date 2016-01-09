;(function () {
  function Converter() {
    this.htmlEditor = document.querySelector('#html')
    this.markDownEditor = document.querySelector('#markdown')
    this.markDownPreviewer = document.querySelector('.markdown-previewer')
    this.bindEvents()
  }

  Converter.prototype.bindEvents = function () {
    var self  = this
    var html = this.htmlEditor.value
    function onChange() {
      var newHTML = self.htmlEditor.value
      var md
      if (html != newHTML) {
        try {
          md = h2m(newHTML)
          self.setM(md)
        } catch(e) {

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
    this.markDownEditor.value = md
    this.markDownPreviewer.innerHTML = markdown.toHTML(md)
  }

  new Converter()
})()
