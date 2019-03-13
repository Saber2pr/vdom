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

1. 3.92kb.

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

## For typescript-tsx

```tsx
import { h } from 'saber-vdom'
import { render } from 'saber-vdom'

const Div = name => (
  <div id="a0">
    link:
    <div id="b0">
      <a id="c0">{name}</a>
    </div>
    hello
  </div>
)

// use Div(), not <Div/>
const View = () => <div id="v0">{Div('test')}</div>

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
    <p id="10">header</p>
    <p id="11">content</p>
    <p id="12">footer</p>
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
