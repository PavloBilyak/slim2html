import Alpine from 'alpinejs'

import 'water.css/out/dark.min.css'
import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  Alpine.start()
})

document.addEventListener('alpine:init', () => {
  Alpine.data('data', () => ({
    inputValue: '',
    outputValue: '',
    prettyValue: false,
    sortAttrsValue: false,
    errorValue: '',
    convert () {
      fetch('/slim', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: this.inputValue,
          pretty: this.prettyValue,
          sort_attrs: this.sortAttrsValue
        })
      }).then(async req => {
        const body = await req.json()
        if (req.ok) {
          return body
        }

        throw body
      }).then(json => {
        this.outputValue = json.output
        if (this.errorValue) this.errorValue = ''
      }).catch(err => {
        console.log(err)
        this.errorValue = err.error
      })
    }
  }))
})
