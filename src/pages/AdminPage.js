import React, { useState } from "react";

import { DashboardPage, UsersPage, PlacesPage, ProfilePage, RequestsPage, ReportsPage, RestaurantsPage, TransportationsPage, AttractionsPage, HotelsPage } from '../pages'
import { Header, HeaderSignOut, PrivateRoute } from '../components'

import '../styles/AdminPage.css'

const AdminPage = ({ match, history }) => {
  console.log("match", match)
  console.log("history", history)
  return (
    <div className="dasboard-style">
      <Header history={history} />
      <div className="wrapper">
        <HeaderSignOut history={history} />
        <div className="main-style">
          <PrivateRoute path={`${match.path}`} exact component={DashboardPage} />
          <PrivateRoute path={`${match.path}/profile`} exact component={ProfilePage} />
          <PrivateRoute path={`${match.path}/users`} component={UsersPage} />
          <PrivateRoute path={`${match.path}/places`} component={PlacesPage} />
          <PrivateRoute path={`${match.path}/requests`} component={RequestsPage} />
          <PrivateRoute path={`${match.path}/reports`} component={ReportsPage} />
          <PrivateRoute path={`${match.path}/restaurants`} component={RestaurantsPage} />
          <PrivateRoute path={`${match.path}/transportations`} component={TransportationsPage} />
          <PrivateRoute path={`${match.path}/attractions`} component={AttractionsPage} />
          <PrivateRoute path={`${match.path}/hotels`} component={HotelsPage} />
        </div>
      </div>
    </div>
  )
}

export default AdminPage;