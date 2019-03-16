import { render } from '../core/dom'
import { h } from '../core/h'

const View = (num: number) => (
  <div>
    <div>count:</div>
    <p>{num}</p>
    <button onclick={() => update(num + 1)}>click</button>
  </div>
)

const update = (num: number) =>
  render(View(num), document.getElementById('root'))

update(0)
