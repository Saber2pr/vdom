# saber-vdom

> saber-vdom

```bash
# from npm
npm install saber-vdom

# from github
git clone https://github.com/Saber2pr/saber-vdom.git
```

```ts
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
      second.props.innerHTML = String(Number(second.props.innerHTML) + 1)
      second.style.color = second.style.color === 'red' ? 'green' : 'red'
      update()
    },
    innerHTML: 'click'
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
    innerHTML: '0'
  },
  style: {
    color: 'red'
  }
}

const update = () => render(Root, document.getElementById('root'))
update()
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
