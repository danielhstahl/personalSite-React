import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import React from 'react'
import Research from './pages/Research'
import About from './pages/About'
import Perspectives from './pages/Perspectives'
import Home from './pages/Home'
import Projects from './pages/Projects'
import DanielNav from './components/DanielNav'
import ReactGA from 'react-ga'
import {
  HOME,
  RESEARCH,
  PROJECTS,
  ABOUT,
  PERSPECTIVES
} from './constants/routes'

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
        <Route path={RESEARCH} component={Research} />
        <Route path={PROJECTS} component={Projects} />
        <Route path={PERSPECTIVES} component={Perspectives} />
        <Route path={ABOUT} component={About} />
        <Route path={HOME} component={Home} />
        <Redirect from="/" to={HOME} />
      </Switch>
    </>
  </Router>
)
