import React from 'react'
import Projects from './Projects'
import { HashRouter as Router } from 'react-router-dom'
// This default export determines where you story goes in the story list
export default {
  title: 'Projects',
  component: Projects
}

const Template = args => (
  <Router>
    <Projects {...args} />
  </Router>
)

export const ProjectStory = Template.bind({})

ProjectStory.args = {}
