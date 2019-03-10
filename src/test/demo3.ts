import { html, render } from '../core/dom'

const p = (color: 'red' | 'green') => html`
  <p
    id="xxx122"
    style=${{ color }}
    innerHTML=${'Hello world!'}
    onclick=${() => (color === 'red' ? update('green') : update('red'))}
  />
`

const update = (color: 'red' | 'green') =>
  render(p(color), document.getElementById('root'))

update('green')
