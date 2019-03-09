import { Element, render } from '../core/dom'

const Root: Element<'div'> = {
  type: 'div',
  uuid: '01',
  render() {
    return [first, first_2]
  }
}

const first: Element<'button'> = {
  type: 'button',
  uuid: '02',
  props: {
    onclick: () => {
      second.props.innerHTML = 'change'
      render(Root, document.getElementById('root'))
    }
  }
}

const first_2: Element<'div'> = {
  type: 'div',
  uuid: '03',
  render() {
    return [second]
  }
}

const second: Element<'p'> = {
  type: 'p',
  uuid: '04',
  props: {
    innerHTML: 'hello'
  }
}

render(Root, document.getElementById('root'))
