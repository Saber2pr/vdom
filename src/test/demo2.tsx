import { h } from '../core/h'
import { render } from '../core/dom'

const Tab = (select: 'first' | 'second') => (
  <div>
    <div>
      <button onclick={() => update('first')}>first</button>
      <button onclick={() => update('second')}>second</button>
    </div>
    <div>
      {select === 'first' ? (
        <div>
          1. this is first.
          <div>child</div>
        </div>
      ) : (
        <div>2. this is second.</div>
      )}
    </div>
  </div>
)

const update = (select: 'first' | 'second') =>
  render(Tab(select), document.getElementById('root'))
update('first')
