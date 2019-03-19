import { Element, render } from '../core/dom'

const first: Element<'button'> = {
  type: 'button',
  props: {
    onclick: () => {
      second.props.innerHTML = String(Number(second.props.innerHTML) + 1)
      second.props.style.color =
        second.props.style.color === 'red' ? 'green' : 'red'
      update()
    },
    innerHTML: 'click'
  }
}

const second: Element<'p'> = {
  type: 'p',
  props: {
    innerHTML: '0',
    // @ts-ignore
    style: {}
  }
}

const first_2: Element<'div'> = {
  type: 'div',
  children: [second]
}

const Root: Element<'div'> = {
  type: 'div',
  children: [first, first_2]
}

const update = () => render(Root, document.getElementById('root'))
update()
