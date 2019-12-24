import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';


const PriveteRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('token') ?
          <Component  {...props} /> : <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
      }
    />
  )
}

export default PriveteRoute;