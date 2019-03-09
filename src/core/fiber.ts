/*
 * @Author: saber2pr
 * @Date: 2019-03-08 12:52:34
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-09 11:49:29
 */
export interface Component {
  children?: this[]
}

export interface IFiber<T extends Component> {
  instance: T
  parent: IFiber<T>
  child: IFiber<T>
  sibling: IFiber<T>
}

export class Fiber<T extends Component> implements IFiber<T> {
  constructor(public instance: T) {}
  public parent: Fiber<T>
  public child: Fiber<T>
  public sibling: Fiber<T>
  set = <K extends keyof IFiber<T>>(key: K) => (value: this[K]) => {
    this[key] = value
    return this
  }
}

export const link = <T extends Component>(fiber: Fiber<T>) =>
  fiber.instance.children &&
  fiber.set('child')(
    fiber.instance.children.reduceRight(
      (sibling, instance) =>
        new Fiber(instance)
          .set('parent')(fiber)
          .set('sibling')(sibling),
      null as Fiber<T>
    )
  ).child

export function walk<T extends Component>(
  root: Fiber<T>,
  cat?: (fiber: Fiber<T>) => void
) {
  let current = root
  while (true) {
    const child = link(current)
    cat && cat(current)
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
