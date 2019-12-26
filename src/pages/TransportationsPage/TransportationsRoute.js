import React from 'react'
import { TransportationsNew, TransportationsPage, TransportationsRequestUser, DetailTransportations, TransportationsReportedUser } from '../TransportationsPage'
import { PrivateRoute } from '../../components/'

function TransportationsRoute({ match }) {
  return (
    <div>
      <PrivateRoute path={`${match.path}`} exact component={TransportationsPage} />
      <PrivateRoute path={`${match.path}/new`} exact component={TransportationsNew} />
      <PrivateRoute path={`${match.path}/requests`} exact component={TransportationsRequestUser} />
      <PrivateRoute path={`${match.path}/reports`} exact component={TransportationsReportedUser} />
      <PrivateRoute path={`${match.path}/detail/:id`} exact component={DetailTransportations} />
    </div>
  )
}

export default TransportationsRoute