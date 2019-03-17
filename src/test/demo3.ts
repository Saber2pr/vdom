import { render } from '../core/diff'
import { html } from '../core/h'

const p = (color: 'red' | 'green') => html`
  <p
    style=${{ color }}
    onclick=${() => (color === 'red' ? update('green') : update('red'))}
  >
    Hello world!
  </p>
`

const update = (color: 'red' | 'green') =>
  render(p(color), document.getElementById('root'))

update('green')
