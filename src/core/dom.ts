/*
 * @Author: saber2pr
 * @Date: 2019-03-09 10:11:15
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-09 21:08:44
 */
import { Fiber, walk } from './fiber'
import htm from 'htm'

export interface Element<K extends keyof HTMLElementTagNameMap = any> {
  type: K
  props?: Partial<HTMLElementTagNameMap[K]>
  children?: Element<any>[]
}

const objset = (target, source) =>
  Object.keys(source).forEach(key =>
    target[key] !== source[key] ? (target[key] = source[key]) : null
  )

export const patch = <K extends keyof HTMLElementTagNameMap = any>(
  element: HTMLElement
) => (
  uuid: string,
  props: Object,
  style: HTMLElementTagNameMap[K]['style']
) => {
  props && objset(element, props)
  style && objset(element.style, style)
  element.id = uuid
  return element
}

export const renderElement = (parent: HTMLElement) => <
  K extends keyof HTMLElementTagNameMap = any
>(
  fiber: Fiber<Element<K>>
) => {
  const { type, props } = fiber.instance
  const { id, style } = props
  let target = document.getElementById(id)
  if (!target) {
    target = document.createElement(type)
    parent.append(target)
  }
  return patch(target)(id, props, style)
}

export const getFiberParentElement = <
  K extends keyof HTMLElementTagNameMap = any
>(
  fiber: Fiber<Element<K>>
) => document.getElementById(fiber.parent.instance.props.id)

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

export function h(type, props, ...children) {
  return { type, props, children }
}

export const html = htm.bind(h)
