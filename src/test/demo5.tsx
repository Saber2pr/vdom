import { render } from '../core/dom'
import { h } from '../core/h'

const View = (num: number) => (
  <div id="a0">
    <div id="b0">count:</div>
    <p id="b1">{num}</p>
    <button id="b2" onclick={() => update(num + 1)}>
      click
    </button>
  </div>
)

const update = (num: number) =>
  render(View(num), document.getElementById('root'))

update(0)
