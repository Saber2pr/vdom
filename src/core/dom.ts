/*
 * @Author: saber2pr
 * @Date: 2019-03-09 10:11:15
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-09 11:53:04
 */
import { Fiber, walk } from './fiber'
import * as CSS from 'csstype'

export interface Element<K extends keyof HTMLElementTagNameMap> {
  uuid: string
  type: K
  props?: Partial<HTMLElementTagNameMap[K]>
  style?: CSS.Properties
  render?(): Element<any>[]
}

const objset = (target, source) =>
  Object.keys(source).forEach(key =>
    target[key] !== source[key] ? (target[key] = source[key]) : null
  )

export const patch = (element: HTMLElement) => (
  uuid: string,
  props: Object,
  style: CSS.Properties
) => {
  props && objset(element, props)
  style && objset(element.style, style)
  element.id = uuid
  return element
}

export const renderElement = (parent: HTMLElement) => (
  fiber: Fiber<Element<any>>
) => {
  const { uuid, type, props, style } = fiber.instance
  let oldElement = document.getElementById(uuid)
  if (!oldElement) {
    oldElement = document.createElement(type)
    parent.append(oldElement)
  }
  return patch(oldElement)(uuid, props, style)
}

export const getFiberParentElement = (fiber: Fiber<Element<any>>) =>
  document.getElementById(fiber.parent.instance.uuid)

export const renderer = (container: HTMLElement) => (
  fiber: Fiber<Element<any>>
) => {
  fiber.parent
    ? renderElement(getFiberParentElement(fiber))(fiber)
    : renderElement(container)(fiber)
}

export const render = (element: Element<any>, container: HTMLElement) => {
  walk(new Fiber(element), renderer(container))
}
