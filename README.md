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

1. 4.22kb.

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
  <p id="10">hello</p>
  <p id="11">world</p>
</div>`

svdom.render(p, document.getElementById('root'))
```

#### if a counter

```js
var counter = num => svdom.html`
<div id="00">
  <p id="10">count:</p>
  <p id="11">${num}</p>
  <button id="20" onclick=${() => update(num + 1)}>click</button>
</div>`

var update = num => svdom.render(counter(num), document.getElementById('root'))

update(0)
```

#### if a counter(use functional)

```js
var Count = ({ num }) => svdom.html`<span id="c00">${num}</span>`

var Div = num => svdom.html`
<div id="d00">
  hello
  <${Count} num={${num}}/>
  <button id="d10" onclick=${() => update(num + 1)}>click</button>
  <p id="d12">footer</p>
</div>
`

var update = num => svdom.render(Div(num), document.getElementById('root'))
update(0)
```

## For typescript-tsx

```tsx
import { h } from 'saber-vdom'
import { render } from 'saber-vdom'

interface Div {
  name: string
  children?: any[]
}

const Div = ({ name, children }: Div) => (
  <div id="a0">
    <p>{name}</p>
    {children}
  </div>
)

const View = () => (
  <div id="v0">
    <Div name="test">
      <p>child0</p>
      <p>child1</p>
    </Div>
  </div>
)

render(View(), document.getElementById('root'))
```

## Notice

```tsx
// wrong
const Para = (
  <p id="00">
    header
    <p id="10">content</p>
    footer
  </p>
)

// good
const Para = (
  <p id="00">
    <span id="10">header</span>
    <p id="11">content</p>
    <span id="12">footer</span>
  </p>
)
```

1. ensure tsconfig

```
"jsx": "react",
"jsxFactory": "h"
```

for example:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./lib",
    "esModuleInterop": true,
    "jsx": "react",
    "jsxFactory": "h",
    "lib": ["dom", "es2015"]
  },
  "include": ["src"],
  "exclude": ["node_modules", "lib"]
}
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

npm run build
```

> Author: saber2pr

---

## develope and test

> you should write ts in /src

> you should make test in /src/test

> export your core in /src/index.ts!
