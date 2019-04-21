# saber-vdom

[![npm](https://img.shields.io/npm/v/saber-vdom.svg?color=blue)](https://www.npmjs.com/package/saber-vdom)

> 越写越乱啊啊啊（

用栈去遍历节点树就不能持久化保存 dom 引用，遍历完栈也空了。。

还得用 fiber 结构。。。

我想得是每新 render 一次就是传入 commit，

commit 和 master 进行 diff，master 是真实 dom 的代理，diff 的结果(effect)包装为一个函数存到一个 effectList，

等全部节点遍历完后，执行 effectList 里的任务

```bash
# from npm
npm install saber-vdom

# from github
git clone https://github.com/Saber2pr/saber-vdom.git
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
