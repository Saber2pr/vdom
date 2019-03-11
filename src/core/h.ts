import htm from 'htm'

export function h(type, props, ...children) {
  return { type, props, children }
}

export const html = htm.bind(h)
