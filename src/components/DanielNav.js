import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import React, { useState } from 'react'
import { NavLink as RRNavLink, Link } from 'react-router-dom'
import avatar from '../assets/images/avatar.png'
import {
  HOME,
  RESEARCH,
  PROJECTS,
  ABOUT,
  PERSPECTIVES
} from '../constants/routes'
const linkedIn =
  'https://www.linkedin.com/profile/view?id=AAIAAAYja3AB_fq6IhUtF5CBw1yjTHheP8YIooE&trk=nav_responsive_tab_profile'
const github = 'https://github.com/phillyfan1138'
const imgStyle = { paddingRight: 5, borderRadius: '50%' }
const DanielNav = () => {
  const [isOpen, toggleOpen] = useState(false)
  return (
    <Navbar color="light" light expand="md" style={{ padding: 16 }}>
      <NavbarBrand tag={Link} to={HOME} >
        <img src={avatar} height={50} style={imgStyle} alt="" />
        Daniel Stahl
      </NavbarBrand>
      <NavbarToggler onClick={() => toggleOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to={HOME} activeClassName="active">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to={RESEARCH} activeClassName="active">
              Research
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to={PROJECTS} activeClassName="active">
              Projects
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to={PERSPECTIVES} activeClassName="active">
              Perspectives
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to={ABOUT} activeClassName="active">
              About
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Connect
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag="a" href={linkedIn}>
                LinkedIn
              </DropdownItem>
              <DropdownItem tag="a" href={github}>
                GitHub
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  )
}
export default DanielNav
