import React from 'react'
import Perspectives from './Perspectives'
import { HashRouter as Router } from 'react-router-dom'
// This default export determines where you story goes in the story list
export default {
  title: 'Perspectives',
  component: Perspectives
}

const Template = args => (
  <Router>
    <Perspectives {...args} />
  </Router>
)

export const PerspectivesStory = Template.bind({})

PerspectivesStory.args = {}
