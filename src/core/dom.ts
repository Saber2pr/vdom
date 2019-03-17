import { Fiber } from './fiber'
import { objset } from './utils/objset'
import { isTextFiber } from './h'

export interface Element<K extends keyof HTMLElementTagNameMap = any> {
  type?: K
  props?: Partial<HTMLElementTagNameMap[K]>
  children?: Element<any>[]
}

export function toElement(fiber: Fiber<Element>) {
  if (isTextFiber(fiber)) {
    const dom = document.createTextNode(String(fiber.instance))
    fiber.parent.origin.append(dom)
    fiber.set('origin')(dom as any)
    return dom
  } else {
    const { type } = fiber.instance
    const dom = document.createElement(type)
    fiber.parent.origin.append(dom)
    patch(dom)(fiber)
    fiber.set('origin')(dom)
    return dom
  }
}

export const patch = (element: HTMLElement) => (fiber: Fiber<Element>) => {
  const { props } = fiber.instance
  props && objset(element, props, 'style')
  props.style && objset(element.style, props.style)
  return element
}

export const patchText = (element: HTMLElement) => (
  textFiber: Fiber<Element>
) => {
  if (
    typeof textFiber.instance === 'string' ||
    typeof textFiber.instance === 'number'
  ) {
    element.nodeValue === textFiber.instance ||
      (element.nodeValue = textFiber.instance)
  }
}

export const updateProps = (
  fiber: Fiber<Element>,
  sourceFiber: Fiber<Element>
) => {
  objset(fiber.instance.props, sourceFiber.instance.props)
}

export const removeDOM = (fiber: Fiber<Element>) => {
  ;(fiber.parent.origin as HTMLElement).removeChild(fiber.origin)
}
