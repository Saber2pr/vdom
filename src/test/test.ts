import { VDom } from '../core/saber-vdom'

const p = new VDom('p', 'hello vdom:', { color: 'red', textAlign: 'center' })

const button = new VDom('button', 'click', {}).attr({
  onclick: () => alert('hello! vdom')
})

const input = new VDom('input', '', {})

const img = new VDom('img', '', {}).attr({
  src: 'http://pic17.nipic.com/20111021/8633866_210108284151_2.jpg'
})

const anchor = new VDom('a', '', {})
  .attr({ href: 'http://pic17.nipic.com/20111021/8633866_210108284151_2.jpg' })
  .append(img)

p.append(input, button, anchor)

VDom.Render(p, document.getElementById('root'))
