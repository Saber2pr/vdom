/*
 * @Author: saber2pr
 * @Date: 2019-02-24 20:16:23
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-02-24 20:43:06
 */
import * as CSS from 'csstype'
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
   * Render
   *
   * @static
   * @param {VDom<any>} vdom
   * @param {HTMLElement} container
   * @returns
   * @memberof VDom
   */
  static Render(vdom: VDom<any>, container: HTMLElement) {
    container.append(vdom.render())
    return this
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
    this.children.forEach(vdom => dom.append(vdom.render()))
    return dom
  }
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
}
