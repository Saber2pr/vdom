import { h } from '../core/h'
import { render } from '../core/dom'

interface Div {
  name
  children?: []
}

const Div = ({ name, children }: Div) => (
  <div id="d00">
    <div id="d10">{'testFunc' + name}</div>
    {children}
  </div>
)

interface Map {
  data: string[]
}

const Map = ({ data }: Map) => (
  <div id="m00">
    {data.map((d, index) => (
      <p id={'mp' + index}>{`raw: ${d}`}</p>
    ))}
  </div>
)

const view = (
  <div id="v00">
    <p id="v10">head</p>
    <Div name="test">
      <div id="v20">testChild0</div>
      <div id="v21">testChild1</div>
    </Div>
    <p id="v11">foot</p>
    <Map data={['line1', 'line2', 'line3', 'line4']} />
  </div>
)

render(view, document.getElementById('root'))
