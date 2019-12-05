import React from 'react'
import { HotelsNew, HotelsPage } from '../HotelsPage'
import { PrivateRoute } from '../../components/'

function HotelsRoute({ match }) {
  return (
    <div>
      <PrivateRoute path={`${match.path}`} exact component={HotelsPage} />
      <PrivateRoute path={`${match.path}/new`} exact component={HotelsNew} />
    </div>
  )
}

export default HotelsRoute