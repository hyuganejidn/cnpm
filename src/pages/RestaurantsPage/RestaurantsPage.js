import React, { useState } from 'react';
import { Button, Form, Navbar, FormControl } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FaSearch, FaUserAltSlash, FaUserCheck } from "react-icons/fa"
import { IoIosAddCircle } from "react-icons/io"
import "../../styles/ButtonStyle.css"
import '../../styles/LabelStyle.css'
import '../../styles/page/RestaurantsPage/RestaurantsPage.css'
import { TableWithLoading, Select, ConfirmModal } from "../../components"
function RestaurantsPage() {

  const [restaurants, setRestaurants] = useState([
    { "name": "L' Italiano Restaurant", "street_address": "An Thuong 30", "extended_address": "My An, Ngu Hanh Son", "locality": "Da Nang 550000, ", "country_name": "Vietnam", "mobile": "+84 90 606 94 58", "food_category": "Italian, Pizza, Mediterranean, European", "special_diet": "Vegetarian Friendly, Vegan Options", "meal": "Breakfast, Lunch, Dinner, Brunch, Drinks" },
    { "name": "Bep Cuon Da Nang", "street_address": "54 Nguyen Van Thoai", "extended_address": "Ngu Hanh Son", "locality": "Da Nang 550000, ", "country_name": "Vietnam", "mobile": "+84 70 2689 989", "food_category": "Vietnamese, Asian", "special_diet": "Lunch, Dinner, Brunch, Drinks", "meal": "Buffet, Street Parking, Serves Alcohol, Full Bar, Wine and Beer, Family style", }
  ])
  const columns = [{
    name: "Tên nhà hàng",
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
    width: '200px',
    wrap: true
  },
  {
    name: "Số điện thoại",
    selector: "mobile",
    sortable: true,
    width: '180px',
    center: true,
  },
  
  // {
  //   name: "User requset",
  //   width: 170,
  //   cell: (row) => {
  //     return (
  //       <Link to="/admin/restaurants/reports">
  //         <Button variant="success" className="btn-padding-9 btn-add-tablet">
  //           Requests
  //         </Button>
  //       </Link>
  //     )
  //   }
  // },
  {
    name: "User report",
    width: 170,
    cell: (row) => {
      return (
        <Link to="/admin/restaurants/reports">
          <Button variant="success" className="btn-padding-9 btn-add-tablet">
            Hiển thị<IoIosAddCircle />
          </Button>
        </Link>
      )
    }
  },
  ]
  const [isLoading, setLoading] = useState(false);
  const [textSearchValue, setTextSearchValue] = useState('');

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
      <h1>Quản lý nhà hàng coffee</h1>
      <Navbar className="justify-content-between">
        <div>
          <label className="search-explain">Bạn có thể tìm kiếm bằng cách nhập tên nhà hàng</label>
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
          <Link to="/admin/restaurants/reports">
            <Button variant="success" className="btn-padding-9 btn-add-tablet">
              Requests
            </Button>
          </Link>
          <Link to="/admin/restaurants/new">
            <Button variant="success" className="btn-padding-9 btn-add-tablet">
              Thêm nhà hàng <IoIosAddCircle />
            </Button>
          </Link>
        </div>
      </Navbar>
      <TableWithLoading
        className="style-table-customer"
        isLoading={isLoading}
        columns={columns}
        data={restaurants}
        pagination={true}
        paginationServer={true}
        paginationDefaultPage={2}
        paginationTotalRows={20}
        paginationPerPage={10}
        striped={true}
        highlightOnHover={true}
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


export default RestaurantsPage;