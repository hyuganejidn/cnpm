import React from 'react'
import { AttractionsNew, AttractionsPage } from '../AttractionsPage'
import { PrivateRoute } from '../../components/'

function AttractionsRoute({ match }) {
  return (
    <div>
      <PrivateRoute path={`${match.path}`} exact component={AttractionsPage} />
      <PrivateRoute path={`${match.path}/new`} exact component={AttractionsNew} />
    </div>
  )
}

export default AttractionsRoute