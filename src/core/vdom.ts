/*
 * @Author: saber2pr
 * @Date: 2019-04-21 15:07:22
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-22 21:31:14
 */
export interface Fiber {
  parent: this
  child: this
  sibling: this
}

export interface VDom extends Fiber {
  type: string
  props?: Object
  children?: this[]
  ref?: HTMLElement
  effects?: Function[]
}

export const link = (vdom: VDom) => {
  vdom.child = vdom.children.reduceRight(
    (sibling, child) => {
      child.sibling = sibling
      child.parent = vdom
      return child
    },
    null as VDom
  )
}

export const next = (vdom: VDom) => {
  vdom.child || link(vdom)
  let current = vdom
  if (current.child) {
    return current.child
  }
  if (current.sibling) {
    return current.sibling
  }
  if (!current.parent) {
    return current
  }
  while (!current.parent.sibling) {
    current = current.parent
    if (!current.parent) {
      return null
    }
  }
  return current.parent.sibling
}

let __root: VDom

export function render(root: VDom, container: HTMLElement) {
  if (!__root) {
    root.parent = { ref: container } as VDom
    __root = root
    renderDomTree(__root)
  } else {
    process(__root, root)
    commit(__root)
  }
}

export function renderDomTree(root: VDom) {
  let current = root
  while (current) {
    renderDom(current)
    current = next(current)
  }
}

export function renderDom(vdom: VDom) {
  if (vdom.ref) {
    return
  } else {
    const dom: any = document.createElement(vdom.type)
    vdom.props && Object.keys(vdom.props).forEach(k => (dom[k] = vdom.props[k]))
    vdom.ref = dom
    vdom.parent.ref.appendChild(dom)
  }
}

export function process(masterVDom: VDom, commitVDom: VDom) {
  let curMasterVDom = masterVDom
  let curCommitVDom = commitVDom
  while (curMasterVDom && curCommitVDom) {
    getEffects(curMasterVDom, curCommitVDom)
    curMasterVDom = next(curMasterVDom)
    curCommitVDom = next(curCommitVDom)
  }

  while (curMasterVDom) {
    curMasterVDom = next(curMasterVDom)
    curMasterVDom.effects.push(removeEffect(curMasterVDom))
  }

  while (curCommitVDom) {
    curCommitVDom = next(curCommitVDom)
  }
}

export function removeEffect(vdom: VDom) {
  return () => {
    vdom.parent.ref.removeChild(vdom.ref)
  }
}

export function getEffects(masterVDom: VDom, commitVDom: VDom) {
  masterVDom.effects || (masterVDom.effects = [])
  masterVDom.effects.push(...diffProps(masterVDom, commitVDom))
}

export function diffProps(masterVDom: VDom, commitVDom: VDom) {
  return Object.keys(masterVDom.props || {}).reduce(
    (out, key) =>
      masterVDom.props[key] === commitVDom.props[key]
        ? out
        : out.concat(() => (masterVDom.ref[key] = commitVDom.props[key])),
    [] as Function[]
  )
}

export function h(type: string | Function, props: Object, ...children: VDom[]) {
  if (typeof type === 'function') {
    return type({
      ...props,
      children: [...children]
    })
  } else {
    return { type, props, children: [...children] }
  }
}

export function commit(root: VDom) {
  let current = root
  while (current) {
    current.effects.forEach(e => e())
    current = next(current)
  }
}
