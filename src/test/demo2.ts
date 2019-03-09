import { render, html } from '../core/dom'

const Tab = (select: 'first' | 'second') => html`
  <div id="004">
    <div id="asasssa">
      <button
        id="scacasc"
        onclick=${() => update('first')}
        innerHTML="first"
      ></button>
      <button
        id="scacasaasc"
        onclick=${() => update('second')}
        innerHTML="second"
      ></button>
    </div>
    <div
      id="aaaannn"
      innerHTML=${select === 'first'
        ? '1. this is first.'
        : '2. this is second.'}
    ></div>
  </div>
`

const update = (select: 'first' | 'second') =>
  render(Tab(select), document.getElementById('root'))
update('first')
