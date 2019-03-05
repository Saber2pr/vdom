import { Node, walk, render, Element } from '../core/fiber'

// const div = new VDom('div', '', {})

// const p = new VDom('p', 'test', {})

const div: Element<'div'> = {
  name: 'div',
  uuid: 'xxx0',
  render: () => [
    {
      uuid: 'xxx1',
      name: 'p',
      inner: 'test',
      render: () => null
    }
  ]
}

render(div, document.getElementById('root'))
