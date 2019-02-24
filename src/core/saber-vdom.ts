/*
 * @Author: saber2pr
 * @Date: 2019-02-24 20:16:23
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-02-24 20:16:23
 */
import * as CSS from 'csstype'

export class VDom<T extends keyof HTMLElementTagNameMap> {
  constructor(
    public name: T,
    public inner: string,
    public style: CSS.Properties
  ) {
    this.children = []
  }
  public children: VDom<T>[]
  append(...child: VDom<any>[]) {
    this.children.push(...child)
  }
  render() {
    const dom = document.createElement(this.name)
    dom.innerHTML = this.inner
    Object.keys(this.style).forEach(key => {
      dom.style[key] = this.style[key]
    })
    this.children.forEach(vdom => dom.append(vdom.render()))
    return dom
  }
  static Render(vdom: VDom<any>, container: HTMLElement) {
    container.append(vdom.render())
  }
}
