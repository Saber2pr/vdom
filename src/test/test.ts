// import { VDom } from '../core/saber-vdom'
import { Node, walk } from '../core/fiber'

// const p = count => {
//   return new VDom('p', `hello vdom:${count}`, {})
// }

// const render = (count = 0) => {
//   VDom.Render(p(count), document.getElementById('root'))
// }

// render()

// document.addEventListener('click', () => render(1))

const a1 = { name: 'a1', render: () => [b1, b2, b3] }
const b1 = { name: 'b1', render: () => [] }
const b2 = { name: 'b2', render: () => [c1] }
const b3 = { name: 'b3', render: () => [c2] }
const c1 = { name: 'c1', render: () => [d1, d2] }
const c2 = { name: 'c2', render: () => [] }
const d1 = { name: 'd1', render: () => [] }
const d2 = { name: 'd2', render: () => [] }

walk(new Node(a1))

b1.name = 'hello'

console.log('----------------------')

walk(new Node(a1))
