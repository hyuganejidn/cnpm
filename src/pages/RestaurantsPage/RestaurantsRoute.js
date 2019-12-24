import React from 'react'
import { RestaurantsNew, RestaurantsPage,EditRestaurants, RestaurantsRequestUser, RestaurantsReportsUser } from '../RestaurantsPage'
import { PrivateRoute } from '../../components/'

function RestaurantsRoute({ match }) {
  return (
    <div>
      <PrivateRoute path={`${match.path}`} exact component={RestaurantsPage} />
      <PrivateRoute path={`${match.path}/new`} exact component={RestaurantsNew} />
      <PrivateRoute path={`${match.path}/requests`} exact component={RestaurantsRequestUser} />
      <PrivateRoute path={`${match.path}/reports`} exact component={RestaurantsReportsUser} />
      <PrivateRoute path={`${match.path}/edit/:id`} exact component={EditRestaurants} />

    </div>
  )
}

export default RestaurantsRoute