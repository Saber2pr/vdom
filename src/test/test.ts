import { Node, Component } from '../core/fiber'

interface Comp extends Component {
  name: string
}

const comp1: Comp = {
  name: 'hehe1',
  render() {
    return []
  }
}

const comp2: Comp = {
  name: 'hehe2',
  render() {
    return [comp1]
  }
}

const root = new Node(comp2)

root.diff((pre, cur) => {
  console.log(pre.name, cur.name)
})

console.log('---------------------')
comp1.name = 'haha'

root.diff((pre, cur) => {
  console.log(pre.name, cur.name)
})
