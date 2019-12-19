import React from 'react';
import { Navbar } from 'react-bootstrap'

import '../styles/components/HeaderSignOut.css'

import { FaSignOutAlt } from "react-icons/fa"

function HeaderSignOut(props) {

  const signOutHandler = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    props.history.push('/login')
  }

  return (
    <Navbar variant="light" className="header-sigh-out">
      <div className="ml-auto header-link-a">
        <a href="#" className="ml-auto" onClick={signOutHandler}>Đăng Xuất <FaSignOutAlt /></a>
      </div>
    </Navbar>
  );
}

export default HeaderSignOut;
