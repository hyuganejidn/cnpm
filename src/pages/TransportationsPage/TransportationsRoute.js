import React from 'react'
import { TransportationsNew, TransportationsPage } from '../TransportationsPage'
import { PrivateRoute } from '../../components/'

function TransportationsRoute({ match }) {
  return (
    <div>
      <PrivateRoute path={`${match.path}`} exact component={TransportationsPage} />
      <PrivateRoute path={`${match.path}/new`} exact component={TransportationsNew} />
    </div>
  )
}

export default TransportationsRoute