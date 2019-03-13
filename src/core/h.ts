import htm from 'htm'

export function h(type, props, ...children) {
  if (typeof type === 'function') {
    return type({
      ...props,
      children: [].concat(...children)
    })
  }
  return { type, props, children: [].concat(...children) }
}

export const html = htm.bind(h)
