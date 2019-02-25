import { VDom } from '../core/saber-vdom'

const p = count => {
  return new VDom('p', `hello vdom:${count}`, {})
}

const render = (count = 0) => {
  VDom.Render(p(count), document.getElementById('root'))
}

render()

document.addEventListener('click', () => render(1))
