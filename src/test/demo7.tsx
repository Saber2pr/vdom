import { render, h } from '../core/vdom'

const App = ({ state }) => (
  <div>
    <div>
      <p innerHTML={state} />
      <button
        onclick={() => {
          setState(state + 1)
          console.log('click')
        }}
        innerHTML="update"
      />
    </div>
  </div>
)

const setState = state =>
  render(<App state={state} />, document.getElementById('root'))
setState(0)
