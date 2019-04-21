/*
 * @Author: saber2pr
 * @Date: 2019-04-21 10:22:10
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-21 11:43:14
 */
export interface Node {
  parent?: this
  children?: this[]
}

export class Progress<T extends Node> {
  constructor(private stack: T[], private effects: Function[] = []) {}
  public next() {
    const currentNode = this.get()
    currentNode.children &&
      currentNode.children.forEach(child => {
        child.parent = currentNode
        this.stack.push(child)
      })
    return currentNode
  }
  public done() {
    return this.stack.length === 0
  }

  public set(node: T) {
    this.stack.push(node)
    return this
  }

  public get() {
    return this.stack.pop()
  }

  public getEffect(effect: Function[]) {
    this.effects.push(...effect)
    return this
  }
  public resolveEffects() {
    this.effects.forEach(e => e())
    return this
  }
}

export interface VDom extends Node {
  type: any
  props: any
  children?: this[]
  ref: HTMLElement
}

export function h(type: string | Function, props: Object, ...children: VDom[]) {
  if (typeof type === 'function') {
    return type({
      ...props,
      children: [].concat(children)
    })
  } else {
    return { type, props, children: [].concat(children) }
  }
}

export const bind = <T extends Object>(
  target: T,
  model: HTMLElement,
  map?: Object
) =>
  Object.keys(map || target).forEach(key =>
    Object.defineProperty(target, key, {
      set(value) {
        const mkey = map ? map[key] : key
        model[mkey] = value
      },
      get() {
        const mkey = map ? map[key] : key
        return model[mkey]
      }
    })
  )

let __masterProgress: Progress<VDom> = null

export function render(root: VDom, dom: HTMLElement) {
  if (__masterProgress) {
    __masterProgress = new Progress([root])
    renderDomTree(__masterProgress, dom)
  }
  process(__masterProgress, new Progress([root]))
}

export function process(
  masterProgress: Progress<VDom>,
  commitProgress: Progress<VDom>
) {
  while (!masterProgress.done() && !commitProgress.done()) {
    const masterCurrentNode = masterProgress.next()
    const commitCurrentNode = commitProgress.next()
    commit(masterProgress, masterCurrentNode, commitCurrentNode)
  }

  while (!masterProgress.done()) {
    masterProgress.get()
  }

  while (!commitProgress.done()) {
    masterProgress.set(commitProgress.next())
  }

  masterProgress.resolveEffects()
}

export function commit(
  masterProgress: Progress<VDom>,
  masterVDom: VDom,
  commitVDom: VDom
) {
  masterProgress.getEffect(diffProps(masterVDom, commitVDom))
}

export function diffProps(masterVDom: VDom, commitVDom: VDom) {
  return Object.keys(masterVDom).reduce(
    (out, key) => {
      if (masterVDom[key] === commitVDom[key]) {
        return
      }
      return out.concat(() => masterVDom[key] === commitVDom[key])
    },
    [] as Function[]
  )
}

export function renderDom(vdom: VDom) {
  if (vdom.ref) {
    return
  } else {
    const dom: HTMLElement = document.createElement(vdom.type)
    Object.keys(vdom.props).forEach(k => (dom[k] = vdom.props[k]))
    vdom.parent && vdom.parent.ref.appendChild(dom)
    bind(vdom.props, dom)
  }
}

export function renderDomTree(
  masterProgress: Progress<VDom>,
  container: HTMLElement
) {
  let current = masterProgress.next()
  current.parent = { ref: container } as VDom
  while (!masterProgress.done()) {
    renderDom(current)
    current = masterProgress.next()
  }
}

// export function remove(masterVDom: VDom) {}

// export function diffType(masterVDom: VDom, commitVDom: VDom) {
//   if (masterVDom.type === commitVDom.type) {
//     return
//   }
//   masterVDom
// }
