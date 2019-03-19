import { h } from '../core/h'
import { render } from '../core/dom'

const Home = (
  <div>
    <p>home</p>
    <p>hello</p>
    <a href="#project">project</a>
  </div>
)

const Project = (
  <div>
    <p>Project</p>
    <a href="#home">home</a>
  </div>
)

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
