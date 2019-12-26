import React from 'react'
import { HotelsNew, HotelsPage, HotelsRequestsUser, DetailHotels, HotelsReportsUser } from '../HotelsPage'
import { PrivateRoute } from '../../components/'

function HotelsRoute({ match }) {
  return (
    <div>
      <PrivateRoute path={`${match.path}`} exact component={HotelsPage} />
      <PrivateRoute path={`${match.path}/new`} exact component={HotelsNew} />
      <PrivateRoute path={`${match.path}/requests`} exact component={HotelsRequestsUser} />
      <PrivateRoute path={`${match.path}/reports`} exact component={HotelsReportsUser} />
      <PrivateRoute path={`${match.path}/detail/:id`} exact component={DetailHotels} />
    </div>
  )
}

export default HotelsRoute