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
const linkedIn =
  'https://www.linkedin.com/profile/view?id=AAIAAAYja3AB_fq6IhUtF5CBw1yjTHheP8YIooE&trk=nav_responsive_tab_profile'
const github = 'https://github.com/phillyfan1138'
const style = { paddingRight: 5 }
const DanielNav = () => {
  const [isOpen, toggleOpen] = useState(false)
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand tag={Link} to="/">
        <img src={avatar} height={50} style={style} />
        Daniel Stahl
      </NavbarBrand>
      <NavbarToggler onClick={() => toggleOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to="/research" activeClassName="active">
              Research
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/projects" activeClassName="active">
              Projects
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/thoughts" activeClassName="active">
              Thoughts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/about" activeClassName="active">
              About
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Connect
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <a href={linkedIn}>Linked In</a>
              </DropdownItem>
              <DropdownItem>
                <a href={github}>GitHub</a>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  )
}
export default DanielNav
