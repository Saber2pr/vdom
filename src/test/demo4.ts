import { render } from '../core/dom'
import { html } from '../core/h'

const Home = html`
  <div id="h0">
    <p id="h10">home</p>
    <a id="h11" href="#project">project</a>
  </div>
`

const Project = html`
  <div id="p0">
    <p id="p10">Project</p>
    <a id="p11" href="#home">home</a>
  </div>
`

window.onhashchange = e => {
  const res = e.newURL.split('#')
  if (res[1] === 'project') {
    update('project')
  } else if (res[1] === 'home') {
    update('home')
  }
}

const update = (select: 'home' | 'project') =>
  render(select === 'home' ? Home : Project, document.getElementById('root'))

update('home')
