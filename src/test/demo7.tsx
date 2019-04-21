import { render, h } from '../core/vdom'

const App = ({ state }) => (
  <div>
    <div>
      <p
        innerHTML={state}
        onclick={() => {
          setState('hehe')
          console.log('click')
        }}
      />
    </div>
  </div>
)

const setState = state =>
  render(<App state={state} />, document.getElementById('root'))
setState('hello')
