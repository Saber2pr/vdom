import { Component, walk, Fiber } from '../core/fiber'

interface MyComponent extends Component {
  value: number
}

const Root: MyComponent = {
  value: 0,
  render() {
    return [first, first_2]
  }
}

const first: MyComponent = {
  value: 10,

  render() {
    return []
  }
}

const first_2: MyComponent = {
  value: 11,
  render() {
    return [second]
  }
}

const second: MyComponent = {
  value: 20,
  render() {
    return []
  }
}

walk(new Fiber(Root), fiber => console.log(fiber.instance.value))
