export interface Component {
  render(): this[]
}

export interface AnyComponent extends Component {
  [key: string]: any
}

export class Node<T extends Component> {
  constructor(public instance: T) {}
  public parent: Node<T>
  public child: Node<T>
  public sibling: Node<T>
  private alter: T

  private attr(props: Partial<Pick<this, 'parent' | 'child' | 'sibling'>>) {
    this.parent = props.parent || this.parent
    this.child = props.child || this.child
    this.sibling = props.sibling || this.sibling
    return this
  }

  private link(parent: Node<T> = this) {
    const elements = parent.instance.render()
    return parent.attr({
      child: elements.reduceRight<Node<T>>(
        (sibling, instance) => new Node(instance).attr({ parent, sibling }),
        null
      )
    }).child
  }

  public diff(call: (pre: T, cur: T) => void, start: Node<T> = this) {
    const root = start
    let current = start
    while (true) {
      if (current.alter) {
        call(current.alter, current.instance)
      } else {
        call(current.instance, current.instance)
        current.alter = JSON.parse(JSON.stringify(current.instance))
      }
      let child = this.link(current)
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
}
