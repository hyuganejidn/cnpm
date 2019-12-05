import React from 'react'
import { RestaurantsNew, RestaurantsPage } from '../RestaurantsPage'
import { PrivateRoute } from '../../components/'

function RestaurantsRoute({ match }) {
  return (
    <div>
      <PrivateRoute path={`${match.path}`} exact component={RestaurantsPage} />
      <PrivateRoute path={`${match.path}/new`} exact component={RestaurantsNew} />
    </div>
  )
}

export default RestaurantsRoute