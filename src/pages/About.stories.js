import React from 'react'
import About from './About'
import { HashRouter as Router } from 'react-router-dom'
// This default export determines where you story goes in the story list
export default {
  title: 'About',
  component: About
}

const Template = args => (
  <Router>
    <About {...args} />
  </Router>
)

export const AboutStory = Template.bind({})

AboutStory.args = {}
