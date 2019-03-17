import { render } from '../core/diff'
import { h } from '../core/h'

const Tab = (select: 'first' | 'second') => (
  <div>
    <div>
      <button onclick={() => update('first')}>first</button>
      <button onclick={() => update('second')}>second</button>
    </div>
    <div>{select === 'first' ? '1. this is first.' : '2. this is second.'}</div>
  </div>
)

const update = (select: 'first' | 'second') =>
  render(Tab(select), document.getElementById('root'))
update('first')
