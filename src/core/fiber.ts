/**
 * Element
 *
 * @interface Element
 * @template T
 */
interface Element<T> {
  render(): Element<T> | Element<T>[]
}
/**
 * Node
 *
 * @export
 * @class Node
 * @template T
 */
export class Node<T = any> {
  /**
   *Creates an instance of Node.
   * @param {T} instance
   * @memberof Node
   */
  constructor(public instance: Element<T>) {}
  public parent: Node<T>
  public child: Node<T>
  public sibling: Node<T>
  private alter: Node<T>
  /**
   * attr
   *
   * @param {(Partial<Pick<Node<T>, 'parent' | 'child' | 'sibling'>>)} props
   * @returns
   * @memberof Node
   */
  attr(props: Partial<Pick<Node<T>, 'parent' | 'child' | 'sibling'>>) {
    this.parent = props.parent || this.parent
    this.child = props.child || this.child
    this.sibling = props.sibling || this.sibling
    return this
  }
  /**
   * record
   *
   * @param {Node<T>} alter
   * @returns
   * @memberof Node
   */
  record(alter: Node<T>) {
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
export function link<T>(parent: Node<T>, ...elements: Element<T>[]) {
  return parent.attr({
    child: elements.reduceRight<Node>(
      (sibling, instance) => new Node(instance).attr({ parent, sibling }),
      null
    )
  }).child
}

function diff(a: Node, b: Node) {
  console.log(a.instance['name'])
  if (a.instance['name'] !== b.instance['name']) {
    console.log('name alter', a.instance['name'])
  }
}

export function doWork<T>(node: Node<T>) {
  if (node.getLast()) {
    console.log('diff')
    diff(node, node.getLast())
  } else {
    console.log('init')
    node.record(Object.assign({}, node))
  }
  const elements = node.instance.render()
  if (Array.isArray(elements)) {
    return link(node, ...elements)
  } else {
    return link(node, elements)
  }
}

export function walk<T>(o: Node<T>) {
  const root = o
  let current = o
  while (true) {
    const child = doWork(current)
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
