/*
 * @Author: saber2pr
 * @Date: 2019-03-16 23:25:15
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-19 18:16:58
 */
import { Fiber, walk, Component, delet } from './fiber'

let master: Fiber = null

export interface Config {
  toElement: (fiber: Fiber) => any
  update: (fiber: Fiber) => void
  remove: (fiber: Fiber) => void
}

export const createRenderer = (config: Config) => <T extends Component>(
  element: T,
  container: HTMLElement
) => {
  const branch = new Fiber(element).set('parent')(
    new Fiber(null).set('origin')(container)
  )
  console.log(branch)
  if (!master) {
    master = branch
    commit(master, config)
  } else {
    diff(master, branch)
    commit(master, config)
  }
}

function diff(master: Fiber, branch: Fiber) {
  let $head = branch
  let head = master
  while ($head) {
    if (head.sibling === null && $head.sibling) {
      head.sibling = $head.sibling
      head.sibling.parent = head.parent
    }
    head.alternate = $head
    head.statu = 'update'
    $head = walk($head)
    head = walk(head)
  }
}

function commit(master: Fiber, { remove, update, toElement }: Config) {
  let current = master
  while (current) {
    if (current.origin) {
      if (current.statu === 'update') {
        update(current)
      } else {
        remove(current)
        if (current.sibling) {
          delet(current)
        } else {
          current = null
          break
        }
      }
    } else {
      toElement(current)
    }
    current = walk(current)
  }
}
