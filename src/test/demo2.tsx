import { render } from '../core/dom'
import { h } from '../core/h'

const Tab = (select: 'first' | 'second') => (
  <div id="a1">
    <div id="b1">
      <button id="c1" onclick={() => update('first')}>
        first
      </button>
      <button id="c2" onclick={() => update('second')}>
        second
      </button>
    </div>
    <div id="b2">
      {select === 'first' ? '1. this is first.' : '2. this is second.'}
    </div>
  </div>
)

const update = (select: 'first' | 'second') =>
  render(Tab(select), document.getElementById('root'))
update('first')
