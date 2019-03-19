/*
 * @Author: saber2pr
 * @Date: 2019-03-16 23:25:22
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-17 09:58:46
 */
import htm from 'htm'

export function h(type, props, ...children) {
  if (typeof type === 'function') {
    return type({
      ...(props || {}),
      children: [].concat(...children)
    })
  }
  return { type, props: props || {}, children: [].concat(...children) }
}

export const html = htm.bind(h)
