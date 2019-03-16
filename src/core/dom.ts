/*
 * @Author: saber2pr
 * @Date: 2019-03-16 23:25:15
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-03-16 23:25:15
 */
import { Fiber, walk } from './fiber'

export interface Element<K extends keyof HTMLElementTagNameMap = any> {
  type: K
  props?: Partial<HTMLElementTagNameMap[K]>
  children?: Element<any>[]
}

export const objset = <T>(target: Object, source: T, omit?: keyof T) =>
  Object.keys(source).forEach(key => {
    if (key === omit) {
      return
    } else {
      target[key] !== source[key] ? (target[key] = source[key]) : null
    }
  })

export const patch = <K extends keyof HTMLElementTagNameMap = any>(
  element: HTMLElement
) => (props: Partial<HTMLElementTagNameMap[K]> = {}) => {
  props && objset(element, props, 'style')
  props.style && objset(element.style, props.style)
  return element
}

let currentFiber: Fiber<Element<any>> = null

export const render = (element: Element<any>, container: HTMLElement) => {
  if (!currentFiber) {
    currentFiber = new Fiber(element).set('parent')(
      new Fiber(null).set('base')(container)
    )
    commit(currentFiber)
  } else {
    update(currentFiber, new Fiber(element))
    commit(currentFiber)
  }
}

function createElement(fiber: Fiber<Element<any>>) {
  if (
    typeof fiber.instance === 'string' ||
    typeof fiber.instance === 'number'
  ) {
    const dom = document.createTextNode(fiber.instance)
    fiber.set('base')(dom as any)
    return dom
  } else {
    const { type, props } = fiber.instance
    const dom = document.createElement(type)
    patch(dom)(props)
    fiber.set('base')(dom)
    return dom
  }
}

const isTextFiber = (fiber: Fiber<Element<any>>) =>
  typeof fiber.instance === 'number' || typeof fiber.instance === 'string'

function update(
  masterFiber: Fiber<Element<any>>,
  metaFiber: Fiber<Element<any>>
) {
  if (masterFiber === null) {
    return
  }
  diff(masterFiber, metaFiber)
  update(walk(masterFiber), walk(metaFiber))
}

function diff(
  masterFiber: Fiber<Element<any>>,
  metaFiber: Fiber<Element<any>>
) {
  if (isTextFiber(masterFiber)) {
    masterFiber.instance === metaFiber.instance ||
      (masterFiber.instance = metaFiber.instance)
    return
  }
  objset(masterFiber.instance.props, metaFiber.instance.props)
}

function commit(current: Fiber<Element<any>>) {
  if (!current) {
    return
  }
  if (!current.base) {
    const dom = createElement(current)
    current.parent.base.append(dom)
  }
  if (isTextFiber(current)) {
    current.base.nodeValue === <any>current.instance ||
      (current.base.nodeValue = <any>current.instance)
  } else {
    patch(current.base)(current.instance.props)
  }
  commit(walk(current))
}
