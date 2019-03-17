import { render } from '../core/diff'
import { html } from '../core/h'

const Home = html`
  <div>
    <p>home</p>
    <div>hello</div>
    <a href="#project">project</a>
  </div>
`

const Project = html`
  <div>
    <p>Project</p>
    <a href="#home">home</a>
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
