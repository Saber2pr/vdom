import { Element, render } from '../core/dom'

const Content = (content: string, uuid: string): Element<'p'> => ({
  uuid,
  type: 'p',
  props: {
    innerHTML: content
  }
})

const Button = (
  name: string,
  uuid: string,
  onclick: () => any
): Element<'button'> => ({
  type: 'button',
  uuid,
  props: {
    innerHTML: name,
    onclick
  }
})

const Line = (...children: Element<any>[]): Element<'div'> => ({
  type: 'div',
  uuid: 'xaadada',
  children
})

const Tab = (select: 'first' | 'second'): Element<'div'> => ({
  type: 'div',
  uuid: '004',
  children: [
    Line(
      Button('first', '0xxx0xx1', () => update('first')),
      Button('second', '0xxx0xxeqeq1', () => update('second'))
    ),
    Line(
      select === 'first'
        ? Content('1. this is first.', 'abcdef')
        : Content('2. this is second.', 'abcdef')
    )
  ]
})

const update = (select: 'first' | 'second') =>
  render(Tab(select), document.getElementById('root'))
update('first')
