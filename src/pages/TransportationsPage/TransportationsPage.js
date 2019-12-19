import React, { useState } from 'react';
import { Button, Form, Navbar, FormControl } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io"
import { FaSearch, FaUserAltSlash, FaUserCheck } from "react-icons/fa"

import "../../styles/ButtonStyle.css"
import '../../styles/LabelStyle.css'
import '../../styles/page/RestaurantsPage/RestaurantsPage.css'

import { TableWithLoading, Select, ConfirmModal } from "../../components"

function TransportationsForm() {
  const [textSearchValue, setTextSearchValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [transportations, setTransportations] = useState([{
    name: "Taxi Hàng Không (Airport Taxi)",
    phone_number: "02363272727",
    website: "https://taxiairport.vn/"
  }, {
    name: "Taxi Mai Linh",
    phone_number: '02363565656',
    website: "https://mailinh.vn/"
  }, {
    name: "Taxi Sông Hàn",
    phone_number: '02363727272',
    website: "https://taxiairport.vn/"
  }, {
    name: "Taxi VinaSun Green",
    phone_number: '02363623543',
    website: "http://www.vinasuntaxi.com/"
  }])

  const columns = [{
    name: "Transortations",
    selector: "name",
    sortable: true,
    width: '250px',
    wrap: true
  },
  {
    name: "Số điện thoại",
    selector: "phone_number",
    sortable: true,
    width: '170px',
    wrap: true
  },
  {
    name: "Web Site",
    selector: "website",
    sortable: true,
    width: '250px',
    // wrap: true
  },
   {
    name: "User report",
    width: 200,
    cell: (row) => {
      return (
        <Link to="/admin/transportations/reports">
          <Button variant="success" className="btn-padding-9 btn-add-tablet">
            Hiển thị<IoIosAddCircle />
          </Button>
        </Link>
      )
    }
  },
    // {
    //   name: "User requset",
    //   width: 200,
    //   cell: (row) => {
    //     return (
    //       <Link to="/admin/transportations/requests">
    //         <Button variant="success" className="btn-padding-9 btn-add-tablet">
    //           Hiển thị<IoIosAddCircle />
    //         </Button>
    //       </Link>
    //     )
    //   }
    // },
  ]
  const onSearchSubmit = e => {
    // e.preventDefault();
    // props.history.push(`?page=1&limit=${params.limit}&q=${textSearchValue}`);
  };
  const onSearchChange = e => {
    // e.preventDefault();
    // params.q = e.target.value;
    // setTextSearchValue(params.q);
  };
  return (
    <div>
      <h1>Transportations</h1>
      <Navbar className="justify-content-between">
        <div>
          <Form inline onSubmit={onSearchSubmit}>
            <FormControl
              type="text"
              placeholder="Nhập từ khoá tìm kiếm"
              onChange={onSearchChange}
              className="mr-sm-2"
              value={textSearchValue}
            />
            <Button variant="info" type="submit" className="btn btn-padding-7">
              <FaSearch className="FaSearch" />
            </Button>
          </Form>
        </div>
        <div>
          <Link to="/admin/transportations/requests">
            <Button variant="success" className="btn-padding-9 btn-add-tablet">
              Request<IoIosAddCircle />
            </Button>
          </Link>
          <Link to="/admin/transportations/new">
            <Button variant="success" className="btn-padding-9 btn-add-tablet">
              Thêm transport <IoIosAddCircle />
            </Button>
          </Link>
        </div>
      </Navbar>
      <TableWithLoading
        className="style-table-customer"
        isLoading={isLoading}
        columns={columns}
        data={transportations}
        pagination={true}
        paginationServer={true}
        paginationDefaultPage={2}
        paginationTotalRows={20}
        persistTableHead={true}
        selectableRows={true}
        clearSelectedRows={true}
        clearSelectedRows={true}
        paginationPerPage={10}
        noDataComponent='Không có dữ liệu'
        onChangePage={page => {
          console.log(page)
        }}
        onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
          console.log(currentRowsPerPage, currentPage)
        }}
        paginationRowsPerPageOptions={[20, 50, 100]}
      />
    </div>

  );
}


export default TransportationsForm;