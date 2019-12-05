import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav'
import {
  FaHome, FaUserAlt
} from "react-icons/fa"
import { MdFormatAlignJustify } from "react-icons/md"
import { IoIosPeople, IoMdCart, IoMdBriefcase } from "react-icons/io"

import '../styles/components/Header.css'
import '../styles/components/HeaderSidenav.css'

const Header = props => {
  const [expanded, setExpanded] = useState(true)
  return (
    <SideNav expanded={expanded} onToggle={(e) => setExpanded(e)}>
      <SideNav.Toggle />
      <SideNav.Nav>

        {/* <LinkContainer to="/admin/profile" exact>
          <NavItem eventKey="">
            <NavIcon>
              <FaUserAlt />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/profile" exact>
                <Nav.Link className="navlink-style">Quản lý tài khoản</Nav.Link>
              </LinkContainer>
            </div>
          </NavItem>
        </LinkContainer> */}

        <LinkContainer to="/admin/users" exact>
          <NavItem eventKey="">
            <NavIcon>
              <FaHome />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/users" exact>
                <Nav.Link className="navlink-style">Quản lý người dùng</Nav.Link>
              </LinkContainer>
            </div>
          </NavItem>
        </LinkContainer>

        <LinkContainer to="/admin/place/restaurants" exact>
          <NavItem eventKey="">
            <NavIcon>
              <FaHome />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/restaurants" exact>
                <Nav.Link className="navlink-style">Quản lý nhà hàng coffee</Nav.Link>
              </LinkContainer>
            </div>
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/hotels" exact>
          <NavItem eventKey="">
            <NavIcon>
              <FaHome />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/hotels" exact>
                <Nav.Link className="navlink-style">Quản lý khách sạn</Nav.Link>
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
                <Nav.Link className="navlink-style">Attraction</Nav.Link>
              </LinkContainer>
            </div>
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/admin//transportations" exact>
          <NavItem eventKey="">
            <NavIcon>
              <FaHome />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/transportations" exact>
                <Nav.Link className="navlink-style">Transportation</Nav.Link>
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

        <LinkContainer to="/admin/requests" exact>
          <NavItem eventKey="">
            <NavIcon>
              <FaHome />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/requests" exact>
                <Nav.Link className="navlink-style">Yêu cầu người dùng</Nav.Link>
              </LinkContainer>
            </div>
          </NavItem>
        </LinkContainer>

        <LinkContainer to="/admin/reports" exact>
          <NavItem eventKey="">
            <NavIcon>
              <FaHome />
            </NavIcon>
            <div className="sidebar-nav">
              <LinkContainer to="/admin/reports" exact>
                <Nav.Link className="navlink-style">Báo cáo người dùng</Nav.Link>
              </LinkContainer>
            </div>
          </NavItem>
        </LinkContainer>
      </SideNav.Nav>
    </SideNav>
  )
}
export default Header;
