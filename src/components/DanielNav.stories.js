import React from 'react'
import DanielNav from './DanielNav'
import { HashRouter as Router } from 'react-router-dom'
// This default export determines where you story goes in the story list
export default {
  title: 'DanielNav',
  component: DanielNav
}

const Template = args => (
  <Router>
    <DanielNav {...args} />
  </Router>
)

export const DanielNavStory = Template.bind({})

DanielNavStory.args = {}
