/*
 * @Author: saber2pr
 * @Date: 2019-03-16 23:25:15
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-17 11:34:28
 */
import { Fiber, walk, Component } from './fiber'
import { toElement, patch, updateProps, patchText, removeDOM } from './dom'
import { isTextFiber } from './h'

let master: Fiber = null

export const render = <T extends Component>(
  element: T,
  container: HTMLElement
) => {
  if (!master) {
    master = new Fiber(element).set('parent')(
      new Fiber(null).set('origin')(container)
    )
    push(master)
  } else {
    merge(master, new Fiber(element))
    push(master)
  }
}

function merge(master: Fiber, branch: Fiber) {
  let $head = master
  let head = branch
  while ($head) {
    diff($head, head)
    $head = walk($head)
    head = walk(head)
  }
}

function diff(master: Fiber, branch: Fiber) {
  if (isTextFiber(master)) {
    master.instance === branch.instance || (master.instance = branch.instance)
    return
  }
  if (master.instance.type === branch.instance.type) {
    updateProps(master, branch)
  }
}

function push(master: Fiber<any>) {
  let current = master
  while (current) {
    if (current.origin) {
      isTextFiber(current)
        ? patchText(current.origin)(current)
        : patch(current.origin)(current)
    } else {
      toElement(current)
    }
    current = walk(current)
  }
}
