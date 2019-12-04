import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';


const PriveteRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => <Component  {...props} />}
    />
  )
}

export default PriveteRoute;