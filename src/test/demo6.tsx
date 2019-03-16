import { h } from '../core/h'
import { render } from '../core/dom'

interface Div {
  name
  children?: []
}

const Div = ({ name, children }: Div) => (
  <div>
    <div>{'testFunc' + name}</div>
    {children}
  </div>
)

interface Map {
  data: string[]
}

const Map = ({ data }: Map) => (
  <div>
    {data.map(d => (
      <p>{`raw: ${d}`}</p>
    ))}
  </div>
)

const view = (
  <div>
    <p>head</p>
    <Div name="test">
      <div>testChild0</div>
      <div>testChild1</div>
    </Div>
    <p>foot</p>
    <Map data={['line1', 'line2', 'line3', 'line4']} />
  </div>
)

render(view, document.getElementById('root'))
