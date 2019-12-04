import React, { useState } from 'react';
import { Button, Form, Navbar, FormControl } from "react-bootstrap";
import { FaSearch, FaUserAltSlash, FaUserCheck } from "react-icons/fa"

import { TableWithLoading, Select, ConfirmModal } from "../../components"
function RestaurantsPage() {
  const [place, setPlace] = useState([{
    id: '124212',
    title: 'Võ Xuân Hùng',
  },
  {
    id: '1241232',
  },
  {
    id: '1244212',
  }])

  return (
    <div>
      <h1>Quản lý nhà hàng coffee</h1>

      {/* <TableWithLoading
        className="style-table-customer"
        isLoading={isLoading}
        columns={columns}
        data={users}
        pagination={true}
        paginationServer={true}
        paginationDefaultPage={2}
        paginationTotalRows={20}s
        paginationPerPage={10}
        noDataComponent='Không có dữ liệu'
        onChangePage={page => {
          console.log(page)
        }}
        onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
          console.log(currentRowsPerPage, currentPage)
        }}
        paginationRowsPerPageOptions={[20, 50, 100]}
      /> */}
    </div>
  );
}


export default RestaurantsPage;