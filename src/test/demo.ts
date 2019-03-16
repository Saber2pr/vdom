import { Component, Fiber, walk } from '../core/fiber'

interface MyComponent extends Component {
  value: number
}

const second_3: MyComponent = {
  value: 30
}

const second_2: MyComponent = {
  value: 25
}

const first: MyComponent = {
  value: 10,
  children: [second_2, second_3]
}

const second: MyComponent = {
  value: 20
}

const first_2: MyComponent = {
  value: 11
}

const Root: MyComponent = {
  value: 0,
  children: [first, first_2]
}

// walk(new Fiber(Root), fiber => console.log(fiber.instance.value))
const current = walk(new Fiber(Root))
console.log(current.instance.value)

const current2 = walk(current)
console.log(current2.instance.value)

const current3 = walk(current2)
console.log(current3.instance.value)

const current4 = walk(current3)
console.log('4', current4.instance.value)

const current5 = walk(current4)
console.log('5', current5 && current5.instance.value)

const current6 = current5 && walk(current5)
console.log(current6 && current6.instance.value)
