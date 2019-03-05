import * as CSS from 'csstype'
/**
 * Element
 *
 * @interface Element
 * @template T
 */
export interface Element<T extends keyof HTMLElementTagNameMap = any> {
  name: T
  uuid: string
  style?: CSS.Properties
  inner?: string
  props?: Partial<HTMLElementTagNameMap[T]>
  render(): Element | Element[]
}
type Patch = {
  uuid: string
  type: 'style' | 'inner' | 'props'
  value: any
}
type Patches = Patch[]
/**
 * Node
 *
 * @export
 * @class Node
 * @template T
 */
export class Node {
  /**
   *Creates an instance of Node.
   * @param {T} instance
   * @memberof Node
   */
  constructor(public instance: Element) {}
  public parent: Node
  public child: Node
  public sibling: Node
  private alter: Element
  /**
   * attr
   *
   * @param {(Partial<Pick<Node<T>, 'parent' | 'child' | 'sibling'>>)} props
   * @returns
   * @memberof Node
   */
  attr(props: Partial<Pick<Node, 'parent' | 'child' | 'sibling'>>) {
    this.parent = props.parent || this.parent
    this.child = props.child || this.child
    this.sibling = props.sibling || this.sibling
    return this
  }
  /**
   * record
   *
   * @param {Element<T>} alter
   * @returns
   * @memberof Node
   */
  record(alter: Element) {
    this.alter = alter
    return this
  }
  /**
   * getLast
   *
   * @returns
   * @memberof Node
   */
  getLast() {
    return this.alter
  }
}
/**
 * link
 *
 * @export
 * @template T
 * @param {Node<T>} parent
 * @param {T[]} elements
 * @returns
 */
export function link(parent: Node, ...elements: Element[]) {
  return parent.attr({
    child: elements.reduceRight<Node>(
      (sibling, instance) => new Node(instance).attr({ parent, sibling }),
      null
    )
  }).child
}
/**
 * walkFiber
 * @param current
 * @param callback
 */
const walkFiber = (current: Node, callback: (node: Node) => void) => {
  while (true) {
    let child
    if (current.instance) {
      const elements = current.instance.render()
      if (Array.isArray(elements)) {
        child = link(current, ...elements)
      } else {
        child = link(current, elements)
      }
    }
    callback(current)
    if (child) {
      current = child
      continue
    }
    if (current === root) {
      return
    }
    while (!current.sibling) {
      if (!current.parent || current.parent === root) {
        return
      }
      current = current.parent
    }
    current = current.sibling
  }
}
/**
 * root
 */
let root: Node
/**
 * render
 *
 * @param {Element} element
 */
export function render(element: Element, container: HTMLElement) {
  if (root) {
    const patches = walk(root)
    patches.forEach(({ type, value, uuid }) => {
      const target = document.getElementById(uuid)
      switch (type) {
        case 'inner':
          target.innerHTML = value
          break
        case 'props':
          Object.keys(value).forEach(key => (target[key] = value[key]))
          break
        case 'style':
          Object.keys(value).forEach(key => (target.style[key] = value[key]))
          break
        default:
          throw new Error('patch type error.')
      }
    })
  } else {
    root = new Node(element)
    walkFiber(root, ({ instance, child, parent }) => {
      const { name, uuid, style, inner } = instance
      const dom: HTMLElement = document.createElement(name)
      dom.id = uuid
      if (style) {
        Object.keys(style).forEach(key => (dom.style[key] = style[key]))
      }
      dom.innerHTML = inner
      if (child) {
        if (child.instance) {
          console.log(child.instance.uuid)
          dom.append(document.getElementById(child.instance.uuid))
        }
      }
      if (!parent) {
        container.append(document.getElementById(root.instance.uuid))
      }
    })
  }
}
/**
 * diff
 *
 * @param {Node} a
 */
function diff(a: Node, patches: Patches) {
  if (a.getLast()) {
    const preNode = a.child.getLast()
    const current = a.child.instance
    if (current.inner) {
      if (current.inner !== preNode.inner) {
        patches.push({
          uuid: current.uuid,
          type: 'inner',
          value: current.inner
        })
      }
    }
    if (current.style) {
      const stylePatches = Object.keys(current.style).reduce((out, key) => {
        if (current.style[key] !== preNode.style[key]) {
          out[key] = current.style[key]
        }
        return out
      }, {})
      if (Object.keys(stylePatches).length > 0) {
        patches.push({
          uuid: current.uuid,
          type: 'style',
          value: stylePatches
        })
      }
    }
    if (current.props) {
      const propsPatches = Object.keys(current.props).reduce((out, key) => {
        if (current.props[key] !== preNode.props[key]) {
          out[key] = current.props[key]
        }
        return out
      }, {})
      patches.push({
        type: 'props',
        uuid: current.uuid,
        value: propsPatches
      })
    }
  } else {
    a.record(JSON.parse(JSON.stringify(a.instance)))
  }
}
/**
 * doWork
 *
 * @export
 * @template T
 * @param {Node<T>} node
 * @returns
 */
export function doWork(node: Node, patches: Patches) {
  diff(node, patches)
  const elements = node.instance.render()
  if (Array.isArray(elements)) {
    return link(node, ...elements)
  } else {
    return link(node, elements)
  }
}
/**
 * walk
 *
 * @export
 * @template T
 * @param {Node<T>} o
 */
export function walk(o: Node) {
  const patches: Patches = []
  const root = o
  let current = o
  while (true) {
    const child = doWork(current, patches)
    if (child) {
      current = child
      continue
    }
    if (current === root) {
      return patches
    }
    while (!current.sibling) {
      if (!current.parent || current.parent === root) {
        return patches
      }
      current = current.parent
    }
    current = current.sibling
  }
}
