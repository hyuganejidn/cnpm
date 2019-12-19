import React from 'react'
import { RestaurantsNew, RestaurantsPage, RestaurantsRequestUser, RestaurantsReportsUser } from '../RestaurantsPage'
import { PrivateRoute } from '../../components/'
function RestaurantsRoute({ match }) {
  return (
    <div>
      <PrivateRoute path={`${match.path}`} exact component={RestaurantsPage} />
      <PrivateRoute path={`${match.path}/new`} exact component={RestaurantsNew} />
      <PrivateRoute path={`${match.path}/requests`} exact component={RestaurantsRequestUser} />
      <PrivateRoute path={`${match.path}/reports`} exact component={RestaurantsReportsUser} />

    </div>
  )
}

export default RestaurantsRoute