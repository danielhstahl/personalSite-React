import React from 'react'
import Home from './Home'
import { HashRouter as Router } from 'react-router-dom'
// This default export determines where you story goes in the story list
export default {
  title: 'Home',
  component: Home
}

const Template = args => (
  <Router>
    <Home {...args} />
  </Router>
)

export const HomeStory = Template.bind({})

HomeStory.args = {}
