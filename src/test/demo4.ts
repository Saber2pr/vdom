import { html, render } from '../core/dom'

const Home = html`
  <div id="h0">
    <p id="h10" innerHTML="home" />
    <a id="h11" href="#project" innerHTML="project" />
  </div>
`

const Project = html`
  <div id="p0">
    <p id="p10" innerHTML="Project" />
    <a id="p11" href="#home" innerHTML="home" />
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
