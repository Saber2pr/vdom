/*
 * @Author: saber2pr
 * @Date: 2019-02-24 20:16:23
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-02-24 20:43:06
 */
import * as CSS from 'csstype'

export class VDom<T extends keyof HTMLElementTagNameMap> {
  constructor(
    public name: T,
    public inner: string,
    public style: CSS.Properties
  ) {
    this.children = []
    this.props = {}
  }
  public children: VDom<T>[]
  private props: Partial<HTMLElementTagNameMap[T]>
  append(...child: VDom<any>[]) {
    this.children.push(...child)
    return this
  }
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
  static Render(vdom: VDom<any>, container: HTMLElement) {
    container.append(vdom.render())
    return this
  }
  attr(props: Partial<HTMLElementTagNameMap[T]>) {
    this.props = props
    return this
  }
}
