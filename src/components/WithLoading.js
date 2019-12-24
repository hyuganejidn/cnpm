import React from 'react'
import Loader from 'react-loader-spinner'
import DataTable from 'react-data-table-component'

function WithLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return (<Component {...props} />);
    return (
      <div
        style={{ width: '100%', height: '100', display: 'flex', justifyContent: 'center', alignContent: 'center' }}
      >
        <Loader type="ThreeDots" color="#007bff" />
      </div>
    );
  }
}
export default WithLoading(DataTable)
