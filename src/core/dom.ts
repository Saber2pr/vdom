/*
 * @Author: saber2pr
 * @Date: 2019-03-09 10:11:15
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-15 05:20:26
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
) => (
  uuid: string,
  props: Partial<HTMLElementTagNameMap[K]>,
  style: HTMLElementTagNameMap[K]['style']
) => {
  props && objset(element, props, 'style')
  style && objset(element.style, style)
  element.id = uuid
  return element
}

const renderTextElement = (parent: HTMLElement) => (
  instance: string | number
) => {
  const child = parent.childNodes[0]
  if (child) {
    if (instance !== child.nodeValue) {
      child.nodeValue = String(instance)
    }
    return child
  } else {
    const target = document.createTextNode(String(instance))
    parent.append(target)
    return target
  }
}

const renderElement = (parent: HTMLElement) => <
  K extends keyof HTMLElementTagNameMap = any
>({
  instance
}: Fiber<Element<K>>) => {
  if (typeof instance === 'number' || typeof instance === 'string') {
    return renderTextElement(parent)(instance)
  }
  const { type, props } = instance
  const { id, style } = props
  Recorder.instance.notice(id)
  let target = document.getElementById(id)
  if (!target) {
    target = document.createElement(type)
    parent.append(target)
  }
  return patch(target)(id, props, style)
}

const getFiberParentElement = <K extends keyof HTMLElementTagNameMap = any>(
  fiber: Fiber<Element<K>>
) => document.getElementById(fiber.parent.instance.props.id)

const renderer = (container: HTMLElement) => (fiber: Fiber<Element<any>>) => {
  fiber.parent
    ? renderElement(getFiberParentElement(fiber))(fiber)
    : renderElement(container)(fiber)
}

export const render = (element: Element<any>, container: HTMLElement) => {
  walk(new Fiber(element), renderer(container))
  Recorder.instance.clear()
}

class Recorder {
  private constructor() {
    this.cache = []
    this.oldCache = []
  }
  public static instance: Recorder = new Recorder()
  private cache: string[]
  private oldCache: string[]
  notice(id: string) {
    this.cache.push(id)
  }
  clear() {
    this.oldCache.forEach(id =>
      !this.cache.includes(id)
        ? document.getElementById(id) && document.getElementById(id).remove()
        : null
    )
    this.oldCache = [...this.cache]
    this.cache = []
  }
}
