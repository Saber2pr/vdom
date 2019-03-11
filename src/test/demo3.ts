import { render } from '../core/dom'
import { html } from '../core/h'

const p = (color: 'red' | 'green') => html`
  <p
    id="xxx122"
    style=${{ color }}
    onclick=${() => (color === 'red' ? update('green') : update('red'))}
  >
    Hello world!
  </p>
`

const update = (color: 'red' | 'green') =>
  render(p(color), document.getElementById('root'))

update('green')
