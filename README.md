# saber-vdom

[![npm](https://img.shields.io/npm/v/saber-vdom.svg?color=blue)](https://www.npmjs.com/package/saber-vdom)

> a fast vdom renderer for javascript.

```bash
# from npm
npm install saber-vdom

# from github
git clone https://github.com/Saber2pr/saber-vdom.git
```

## API

```js
svdom.html`<div></div>`

svdom.render(element, container)
```

### like this

```js
var p = svdom.html`
<div>
  <p>hello</p>
  <p>world</p>
</div>`

svdom.render(p, document.getElementById('root'))
```

#### if a counter

```js
var counter = num => svdom.html`
<div>
  <p>count:</p>
  <p>${num}</p>
  <button onclick=${() => update(num + 1)}>click</button>
</div>`

var update = num => svdom.render(counter(num), document.getElementById('root'))

update(0)
```

#### if a counter(use functional)

```js
var Count = ({ num }) => svdom.html`<span>${num}</span>`

var Div = num => svdom.html`
<div>
  hello
  <${Count} num={${num}}/>
  <button onclick=${() => update(num + 1)}>click</button>
  <p >footer</p>
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
  <div>
    <p>{name}</p>
    {children}
  </div>
)

const View = () => (
  <div>
    <Div name="test">
      <p>child0</p>
      <p>child1</p>
    </Div>
  </div>
)

render(View(), document.getElementById('root'))
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
