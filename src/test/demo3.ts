import { html, render } from '../core/dom'

const p = html`
  <p id="xxx122" style=${{ color: 'red' }} innerHTML=${'Hello world!'} />
`

render(p, document.getElementById('root'))

console.log(p)
