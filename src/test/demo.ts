import { Component, walk, Fiber } from '../core/fiber'

interface MyComponent extends Component {
  value: number
}

const first: MyComponent = {
  value: 10
}

const second: MyComponent = {
  value: 20
}

const first_2: MyComponent = {
  value: 11,
  children: [second]
}

const Root: MyComponent = {
  value: 0,
  children: [first, first_2]
}

walk(new Fiber(Root), fiber => console.log(fiber.instance.value))
