/*
 * @Author: saber2pr
 * @Date: 2019-02-24 20:16:23
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-02-25 17:20:04
 */
import * as CSS from 'csstype'
/**
 * Patch
 *
 * @export
 * @interface Patch
 */
export interface Patch {
  depth: number
  index: number
  result: { type: 'inner' | 'style' | 'props'; value: any }[]
}
/**
 * VDom
 *
 * @export
 * @class VDom
 * @template T
 */
export class VDom<T extends keyof HTMLElementTagNameMap> {
  /**
   *Creates an instance of VDom.
   * @param {T} name
   * @param {string} inner
   * @param {CSS.Properties} style
   * @memberof VDom
   */
  constructor(
    public name: T,
    public inner: string,
    public style: CSS.Properties
  ) {
    this.children = []
    this.props = {}
  }
  /**
   * oldVdom
   *
   * @private
   * @type {VDom<any>}
   * @memberof VDom
   */
  private static oldVdom: VDom<any>
  /**
   * Render
   *
   * @static
   * @param {VDom<any>} vdom
   * @param {HTMLElement} container
   * @returns
   * @memberof VDom
   */
  static Render(vdom: VDom<any>, container: HTMLElement) {
    if (container.children.length === 0) {
      container.append(vdom.render())
    } else {
      const patches = vdom.diff(VDom.oldVdom)
      this.patchToDom(container, patches)
    }
    VDom.oldVdom = vdom
  }
  private static patchToDom(
    dom: Element,
    patches: Patch[],
    depth = 0,
    index = 0
  ) {
    const actions = patches.find(
      patch => patch.depth === depth && patch.index === index
    ).result
    actions.forEach(action =>
      Array.from(dom.children).forEach((child, index) => {
        switch (action.type) {
          case 'inner':
            child.innerHTML = action.value
            break
          case 'props':
            Object.keys(action.value).forEach(
              key => (child[key] = action.value[key])
            )
            break
          case 'style':
            Object.keys(action.value).forEach(
              key => (child['style'][key] = action.value[key])
            )
            break
          default:
            throw 'type error'
        }
        this.patchToDom(child, patches, depth + 1, index)
      })
    )
  }
  /**
   * children
   *
   * @type {VDom<T>[]}
   * @memberof VDom
   */
  public children: VDom<T>[]
  /**
   * props
   *
   * @private
   * @type {Partial<HTMLElementTagNameMap[T]>}
   * @memberof VDom
   */
  private props: Partial<HTMLElementTagNameMap[T]>
  /**
   * attr
   *
   * @param {Partial<HTMLElementTagNameMap[T]>} props
   * @returns
   * @memberof VDom
   */
  attr(props: Partial<HTMLElementTagNameMap[T]>) {
    this.props = props
    return this
  }
  /**
   * append
   *
   * @param {...VDom<any>[]} child
   * @returns
   * @memberof VDom
   */
  append(...child: VDom<any>[]) {
    this.children.push(...child)
    return this
  }
  /**
   * render
   *
   * @returns
   * @memberof VDom
   */
  render() {
    const dom = document.createElement(this.name)
    dom.innerHTML = this.inner
    Object.keys(this.style).forEach(key => {
      dom.style[key] = this.style[key]
    })
    Object.keys(this.props).forEach(key => {
      dom[key] = this.props[key]
    })
    this.children.forEach(child => dom.append(child.render()))
    return dom
  }
  /**
   * diff
   *
   * @param {VDom<any>} vdom
   * @returns
   * @memberof VDom
   */
  diff(vdom: VDom<any>) {
    const patches: Patch[] = []
    this.diffStep(vdom, patches, 0, 0)
    return patches.filter(patch => patch.result.length > 0)
  }
  /**
   * diffStep
   *
   * @private
   * @param {VDom<any>} vdom
   * @param {Patch[]} patches
   * @param {number} depth
   * @param {number} index
   * @memberof VDom
   */
  private diffStep(
    vdom: VDom<any>,
    patches: Patch[],
    depth: number,
    index: number
  ) {
    const patch: Patch = {
      depth: depth,
      index: index,
      result: []
    }
    this.inner === vdom.inner
      ? null
      : patch.result.push({ type: 'inner', value: this.inner })
    this.style === vdom.style
      ? null
      : patch.result.push({ type: 'style', value: this.style })
    this.props === vdom.props
      ? null
      : patch.result.push({ type: 'props', value: this.props })
    patches.push(patch)
    this.children.forEach((child, index) =>
      child.diffStep(vdom.children[index], patches, ++depth, index)
    )
  }
}
