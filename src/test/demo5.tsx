import { h } from '../core/h'
import { render } from '../core/dom'

const View = (num: number) => (
  <div>
    count:{num}
    <button onclick={() => update(num + 1)}>click</button>
  </div>
)

const update = (num: number) =>
  render(View(num), document.getElementById('root'))

update(0)
