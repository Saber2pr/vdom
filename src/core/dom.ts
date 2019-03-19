import { Fiber } from './fiber'
import { objset } from './utils/objset'
import { createRenderer } from './diff'

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
  props && objset(element, props)
  props && props.style && objset(element.style, props.style)
  return element
}

export const isTextFiber = (fiber: Fiber<any>) =>
  typeof fiber.instance === 'number' || typeof fiber.instance === 'string'

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

export const update = (
  fiber: Fiber<Element>,
  sourceFiber: Fiber<Element> = fiber.alternate
) => {
  if (isTextFiber(fiber) && isTextFiber(sourceFiber)) {
    fiber.instance === sourceFiber.instance ||
      (fiber.instance = sourceFiber.instance)
    patchText(fiber.origin)(fiber)
  } else {
    objset(fiber.instance.props, sourceFiber.instance.props)
    patch(fiber.origin)(fiber)
  }
}

export const remove = (fiber: Fiber<Element>) => {
  ;(fiber.origin as HTMLElement).remove()
}

export const render = createRenderer({
  update,
  remove,
  toElement
})
