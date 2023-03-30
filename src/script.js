import Alpine from 'alpinejs'

import 'water.css/out/water.min.css'
import './style.css'

document.addEventListener('DOMContentLoaded', function () {
  Alpine.start()
})

document.addEventListener('alpine:init', () => {
  Alpine.data('data', () => ({
    inputValue: '',
    outputValue: '',
    convert() {
      fetch('/slim', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: this.inputValue })
      }).then(r => r.json(), console.error).then(j => this.outputValue = j.output)
    }
  }))
})
