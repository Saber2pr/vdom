# saber-vdom

> saber-vdom

> pass fail.

```bash
# from npm
npm install saber-vdom

# from github
git clone https://github.com/Saber2pr/saber-vdom.git
```

```ts
import { Component, walk, Fiber } from '../core/fiber'

interface MyComponent extends Component {
  value: number
}

const Root: MyComponent = {
  value: 0,
  render() {
    return [...first.render(), ...first_2.render()]
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
    return [...second.render()]
  }
}

const second: MyComponent = {
  value: 20,
  render() {
    return []
  }
}

walk(new Fiber(Root), fiber => console.log(fiber.instance.value))
```

---

## start

```bash
npm install
```

```bash
npm start

npm run dev

```

> Author: saber2pr

---

## develope and test

> you should write ts in /src

> you should make test in /src/test

> export your core in /src/index.ts!
