import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap'

import '../styles/components/HeaderSignOut.css'

import { FaSignOutAlt } from 'react-icons/fa'

function HeaderSignOut(props) {
  const [user, setUser] = useState(localStorage.getItem('user'))
  const signOutHandler = (e) => {
    e.preventDefault()
    console.log(user, "ủerd")
    localStorage.removeItem('token')
    props.history.push('/login')
  }

  return (
    <Navbar variant="light" className="header-sigh-out">
      <div className="ml-auto header-link-a left-header">
        <p style={{ 'margin-right': '25px' }}>Xin chào, {user}</p>
        <a href="#" className="ml-auto" onClick={signOutHandler}>Đăng Xuất <FaSignOutAlt /></a>
      </div>
    </Navbar>
  );
}

export default HeaderSignOut;
