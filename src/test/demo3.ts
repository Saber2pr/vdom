import { html } from '../core/h'
import { render } from '../core/dom'

const p = (color: 'red' | 'green') => {
  return html`
    <p
      style=${{ color }}
      onclick=${() => (color === 'red' ? update('green') : update('red'))}
    >
      Hello world!
    </p>
  `
}

const update = (color: 'red' | 'green') =>
  render(p(color), document.getElementById('root'))

update('green')
