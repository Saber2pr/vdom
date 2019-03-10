# saber-vdom

[![npm](https://img.shields.io/npm/v/saber-vdom.svg?color=blue)](https://www.npmjs.com/package/saber-vdom)

> a fast vdom renderer for javascript.

```bash
# from npm
npm install saber-vdom

# from github
git clone https://github.com/Saber2pr/saber-vdom.git
```

### feature:

0. only two apis.

1. 3.56kb.

1. no support for TextNode. use innerHTML instead.

1. should provide an Unique-id for each Element.

## API

```js
svdom.html`<div></div>`

svdom.render(element, container)
```

### like this

```js
var p = svdom.html`
<div id="00">
  <p id="10" innerHTML="hello"/>
  <p id="11" innerHTML="world"/>
</div>`

svdom.render(p, document.getElementById('root'))
```

#### if a counter

```js
var counter = num => svdom.html`
<div id="00">
  <p id="10" innerHTML="count:"/>
  <p id="11" innerHTML=${num}/>
  <button innerHTML="click" onclick=${() => update(num + 1)}/>
</div>`

var update = num => svdom.render(counter(num), document.getElementById('root'))

update(0)
```

## For typescript

```ts
const Content = (content: string, id: string): Element<'p'> => ({
  type: 'p',
  props: {
    id,
    innerHTML: content
  }
})

const Button = (
  name: string,
  id: string,
  onclick: () => any
): Element<'button'> => ({
  type: 'button',
  props: {
    id,
    innerHTML: name,
    onclick
  }
})

const Line = (...children: Element<any>[]): Element<'div'> => ({
  type: 'div',
  props: {
    id: 'xaadada'
  },
  children
})

const Tab = (select: 'first' | 'second'): Element<'div'> => ({
  type: 'div',
  props: {
    id: '004'
  },
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
```

## use htm

```ts
const Tab = (select: 'first' | 'second') => html`
  <div id="a1">
    <div id="b1">
      <button id="c1" onclick=${() => update('first')} innerHTML="first" />
      <button id="c2" onclick=${() => update('second')} innerHTML="second" />
    </div>
    <div
      id="b2"
      innerHTML=${select === 'first'
        ? '1. this is first.'
        : '2. this is second.'}
    />
  </div>
`

const update = (select: 'first' | 'second') =>
  render(Tab(select), document.getElementById('root'))
update('first')
```

---

## start

```bash
npm install
```

```bash
npm start

npm run dev

npm test

npm run min

npm run build
```

> Author: saber2pr

---

## develope and test

> you should write ts in /src

> you should make test in /src/test

> export your core in /src/index.ts!
