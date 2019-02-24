# saber-vdom

> saber-vdom

```bash
# from npm
npm install saber-vdom

# from github
git clone https://github.com/Saber2pr/saber-vdom.git
```

## For Example:

```ts
const p = new VDom('p', 'hello vdom:', { color: 'red', textAlign: 'center' })

const input = new VDom('input', '', {})

p.append(input)

VDom.Render(p, document.getElementById('root'))
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
