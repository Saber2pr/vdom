import { VDom } from '../core/saber-vdom'

const p = new VDom('p', 'hello vdom:', { color: 'red', textAlign: 'center' })

const input = new VDom('input', '', {})

p.append(input)

VDom.Render(p, document.getElementById('root'))
