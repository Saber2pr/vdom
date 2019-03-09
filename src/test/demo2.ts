import { render, html } from '../core/dom'

const Tab = (select: 'first' | 'second') => html`
  <div id="a1">
    <div id="b1">
      <button id="c1" onclick=${() => update('first')} innerHTML="first" />
      <button id="c2" onclick=${() => update('second')} innerHTML="second" />
    </div>
    <div
      id="b2"
      innerHTML=${select === 'first'
        ? '1. this is first.'
        : '2. this is second.'}
    />
  </div>
`

const update = (select: 'first' | 'second') =>
  render(Tab(select), document.getElementById('root'))
update('first')
