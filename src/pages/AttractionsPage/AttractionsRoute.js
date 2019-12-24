import React from 'react'
import { AttractionsNew, AttractionsPage, AttractionsRequestUser, AttractionsReportsUser, EditAttractions } from '../AttractionsPage'
import { PrivateRoute } from '../../components/'

function AttractionsRoute({ match }) {
  return (
    <div>
      <PrivateRoute path={`${match.path}`} exact component={AttractionsPage} />
      <PrivateRoute path={`${match.path}/new`} exact component={AttractionsNew} />
      <PrivateRoute path={`${match.path}/requests`} exact component={AttractionsRequestUser} />
      <PrivateRoute path={`${match.path}/reports`} exact component={AttractionsReportsUser} />
      <PrivateRoute path={`${match.path}/edit:id`} exact component={EditAttractions} />
    </div>
  )
}

export default AttractionsRoute