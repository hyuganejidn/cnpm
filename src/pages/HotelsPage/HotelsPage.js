import React, { useState } from 'react';
import { Button, Form, Navbar, FormControl } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io"
import { FaSearch, FaUserAltSlash, FaUserCheck } from "react-icons/fa"

import "../../styles/ButtonStyle.css"
import '../../styles/LabelStyle.css'
import '../../styles/page/RestaurantsPage/RestaurantsPage.css'
import { TableWithLoading } from "../../components"

function HotelsPage() {
  const [textSearchValue, setTextSearchValue] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [hotesls, setHotels] = useState([{ "name": "Monarque Hotel", "street_address": "238 Vo Nguyen Giap Phuoc My, Son Tra District, Da Nang 550000 Vietnam", "phone": null, "price": null, },
  ])
  const columns = [{
    name: "Tên khách sạn",
    selector: "name",
    sortable: true,
    width: '200px',
    wrap: true,
    hide: 'sm'
  },
  {
    name: "Địa chỉ",
    selector: "street_address",
    sortable: true,
    width: '300px',
    wrap: true
  },
  {
    name: "Số điện thoại",
    selector: "phone",
    sortable: true,
    width: '180px',
    center: true,
  },
  // {
  //   name: "User requset",
  //   width: 200,
  //   cell: (row) => {
  //     return (
  //       <Link to="/admin/hotels/requests">
  //         <Button variant="success" className="btn-padding-9 btn-add-tablet">
  //           Hiển thị<IoIosAddCircle />
  //         </Button>
  //       </Link>
  //     )
  //   }
  // },
  {
    name: "User report",
    width: 200,
    cell: (row) => {
      return (
        <Link to="/admin/hotels/reports">
          <Button variant="success" className="btn-padding-9 btn-add-tablet">
            Hiển thị<IoIosAddCircle />
          </Button>
        </Link>
      )
    }
  },
  ]
  const [isLoading, setLoading] = useState(false);

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
      <h1>Quản lý khách sạn</h1>
      <Navbar className="justify-content-between">
        <div>
          <label className="search-explain">Bạn có thể tìm kiếm bằng cách nhập tên món ăn</label>
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
          <Link to="/admin/hotels/requests">
            <Button variant="success" className="btn-padding-9 btn-add-tablet">
              Requests
            </Button>
          </Link>
          <Link to="/admin/hotels/new">
            <Button variant="success" className="btn-padding-9 btn-add-tablet">
              Thêm khách sạn <IoIosAddCircle />
            </Button>
          </Link>
        </div>
      </Navbar>

      <TableWithLoading
        className="style-table-customer"
        isLoading={isLoading}
        columns={columns}
        data={hotesls}
        pagination={true}
        paginationServer={true}
        paginationDefaultPage={2}
        paginationTotalRows={20}
        paginationPerPage={10}
        noDataComponent='Không có dữ liệu'
        persistTableHead={true}
        selectableRows={true}
        clearSelectedRows={true}
        clearSelectedRows={true}
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


export default HotelsPage;