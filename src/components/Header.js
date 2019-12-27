import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav'
import {
  FaHome, FaUserFriends, FaTrafficLight, FaUserAlt
} from 'react-icons/fa'
import { MdReportProblem } from 'react-icons/md'
import { IoIosRestaurant, IoIosBusiness, IoIosGitPullRequest } from 'react-icons/io'
import { GoRequestChanges } from 'react-icons/go';
import { GiTransportationRings } from 'react-icons/gi';

import '../styles/components/Header.css'
import '../styles/components/HeaderSidenav.css'

const Header = props => {
  const [expanded, setExpanded] = useState(true)
  return (
    <SideNav expanded={expanded} onToggle={(e) => setExpanded(e)}>
      <SideNav.Toggle />
      <SideNav.Nav>
        <LinkContainer to="/admin/users" exact>
          <NavItem eventKey="">
            <NavIcon>
              <FaUserFriends />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/users" exact>
                <Nav.Link className="navlink-style">Users</Nav.Link>
              </LinkContainer>
            </div>
          </NavItem>
        </LinkContainer>

        <LinkContainer to="/admin/restaurants" exact>
          <NavItem eventKey="">
            <NavIcon>
              <IoIosRestaurant />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/restaurants" exact>
                <Nav.Link className="navlink-style" >Restaurants</Nav.Link>
              </LinkContainer>
            </div>
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/hotels" exact>
          <NavItem eventKey="">
            <NavIcon>
              <IoIosBusiness />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/hotels" exact>
                <Nav.Link className="navlink-style">Hotels</Nav.Link>
              </LinkContainer>
            </div>
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/attractions" exact>
          <NavItem eventKey="">
            <NavIcon>
              <FaHome />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/attractions" exact>
                <Nav.Link className="navlink-style">Attractions</Nav.Link>
              </LinkContainer>
            </div>
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/transportations" exact>
          <NavItem eventKey="">
            <NavIcon>
              <GiTransportationRings />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/transportations" exact>
                <Nav.Link className="navlink-style">Transportations</Nav.Link>
              </LinkContainer>
            </div>
          </NavItem>
        </LinkContainer>

        {/* <LinkContainer to="/admin/places" exact>
          <NavItem eventKey="">
            <NavIcon>
              <FaHome />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/places" exact>
                <Nav.Link className="navlink-style">Thêm địa điểm</Nav.Link>
              </LinkContainer>
            </div>
          </NavItem>
        </LinkContainer> */}
        <LinkContainer to="/admin/blogs" exact>
          <NavItem eventKey="">
            <NavIcon>
              <FaUserAlt />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/blogs" exact>
                <Nav.Link className="navlink-style">Blogs</Nav.Link>
              </LinkContainer>
            </div>
          </NavItem>
        </LinkContainer>

        <LinkContainer to="/admin/requests" exact>
          <NavItem eventKey="">
            <NavIcon>
              <GoRequestChanges />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/requests" exact>
                <Nav.Link className="navlink-style">Requets User</Nav.Link>
              </LinkContainer>
            </div>
          </NavItem>
        </LinkContainer>

        <LinkContainer to="/admin/reports" exact>
          <NavItem eventKey="">
            <NavIcon>
              <MdReportProblem />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/reports" exact>
                <Nav.Link className="navlink-style">Reports</Nav.Link>
              </LinkContainer>
            </div>
          </NavItem>
        </LinkContainer>
      </SideNav.Nav>
    </SideNav>
  )
}
export default Header;
