import React from 'react'
import Research from './Research'
import { HashRouter as Router } from 'react-router-dom'
// This default export determines where you story goes in the story list
export default {
  title: 'Research',
  component: Research
}

const Template = args => (
  <Router>
    <Research {...args} />
  </Router>
)

export const ResearchStory = Template.bind({})

ResearchStory.args = {}
