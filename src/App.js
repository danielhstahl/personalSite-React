import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import Research from './pages/Research'
import About from './pages/About'
import Thoughts from './pages/Thoughts'
import Home from './pages/Home'
import Projects from './pages/Projects'
import DanielNav from './components/DanielNav'
import ReactGA from 'react-ga'

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-73388166-2')
}
const LogPageView = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }
  return null
}
export default () => (
  <Router>
    <>
      <Route to="/" component={DanielNav} />
      <Route to="/" component={LogPageView} />
      <Switch>
        <Route to="/research" component={Research} />
        <Route to="/projects" component={Projects} />
        <Route to="/thoughts" component={Thoughts} />
        <Route to="/about" component={About} />
        <Route to="/" component={Home} />
      </Switch>
    </>
  </Router>
)
