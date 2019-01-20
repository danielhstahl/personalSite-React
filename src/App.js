import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
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
      <DanielNav />
      <Route path="/" component={LogPageView} />
      <Switch>
        <Route path="/research" component={Research} />
        <Route path="/projects" component={Projects} />
        <Route path="/thoughts" component={Thoughts} />
        <Route path="/about" component={About} />
        <Route path="/home" component={Home} />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  </Router>
)
