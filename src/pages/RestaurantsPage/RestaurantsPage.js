/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Form, Navbar, FormControl } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { FaSearch, } from 'react-icons/fa'
import { GoTools } from 'react-icons/go';
import queryString from 'query-string'

import { IoIosAddCircle } from 'react-icons/io'
import '../../styles/ButtonStyle.css'
import '../../styles/LabelStyle.css'
import '../../styles/page/RestaurantsPage/RestaurantsPage.css'
import { TableWithLoading, ConfirmModal } from '../../components'
import { getServiceRes, searchService } from '../../services';
function RestaurantsPage(props) {
  const columns = [{
    name: 'Tên nhà hàng',
    selector: 'name',
    sortable: true,
    width: '150px',
    wrap: true,
    hide: 'sm'
  },
  {
    name: 'Địa chỉ',
    selector: 'street_address',
    sortable: true,
    width: '180px',
    wrap: true
  }, {
    name: 'Chi tiết',
    selector: 'extended_address',
    sortable: true,
    width: '180px',
    wrap: true
  },

  {
    name: 'Số điện thoại',
    selector: 'mobile',
    sortable: true,
    width: '150px',
    center: true,
  },
  {
    name: 'Loại thực phẩm',
    selector: 'food_category',
    sortable: true,
    width: '180px',
    center: true,
  }, {
    name: 'Bữa ăn',
    selector: 'meal',
    sortable: true,
    width: '180px',
    center: true,
  },
  {
    name: '',
    // width: 200,
    cell: (row) => {
      return (
        <div className="">
          {/* <Button
            variant="info"
            className="btn-margin-right btn-pd btn"
            onClick={() =>
              props.history.push(`/admin/restaurants/edit/${row.id}`)
            }
          >
            Sửa <GoTools />
          </Button> */}
          <Button
            variant="danger"
            className="btn-pd btn"
            onClick={() => {
              return destroy(row);
            }}
          >
            Ẩn
          </Button>
        </div>
      )
    }
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
    // {
    //   name: "User report",
    //   width: 170,
    //   cell: (row) => {
    //     return (
    //       <Link to="/admin/restaurants/reports">
    //         <Button variant="success" className="btn-padding-9 btn-add-tablet">
    //           Hiển thị<IoIosAddCircle />
    //         </Button>
    //       </Link>
    //     )
    //   }
    // },
  ]
  const [isLoading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([])
  const [currentRow, setCurrentRow] = useState({});
  const [modalShow, setModalShow] = useState(false);
  let params = queryString.parse(props.location.search);
  console.log('aaaa')
  if (!params.keyword) {
    console.log(params.keyword)
    console.log(true)
    params.keyword = ""
  }
  if (!params.page) {
    params.page = "1";
  }
  if (!params.amount) {
    params.amount = "8";
  }
  const [textSearchValue, setTextSearchValue] = useState('');

  useEffect(() => {
    console.log('asda')
    console.log(params, "params")
    setLoading(true)
    getServiceRes(params.amount, params.page, params.keyword)
      .then(response => {
        console.log(response.data.message, '@@@@@')
        setRestaurants([...response.data.message])
      })
      .finally(() => setLoading(false))
  }, [props.location.search])

  const _destroy = () => {
    setModalShow(false);
  };
  const destroy = row => {
    setCurrentRow(row);
    setModalShow(true);
  };
  const onSearchSubmit = e => {
    e.preventDefault();
    console.log(textSearchValue)
    console.log(params.keyword)
    props.history.push(`?page=1&amount=${params.amount}&keywork=${textSearchValue}`);
  };
  const onSearchChange = e => {
    // e.preventDefault();
    // console.log(e.target.value)
    console.log(params)
    // params = { ...params, ['keyword']: e.target.value }
    params.keyword = e.target.value;
    console.log(params.keyword, 'keyword')
    setTextSearchValue(e.target.value);
  };
  return (
    <div>
      <ConfirmModal show={modalShow} onConfirm={_destroy} confirmtext="Bạn có chắc chắn ẩn không?" onHide={() => setModalShow(false)} />

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
        {/* <div>
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
        </div> */}
      </Navbar>
      <TableWithLoading
        className="style-table-customer"
        isLoading={isLoading}
        columns={columns}
        data={restaurants}
        isLoading={isLoading}
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
        onChangePage={page => {
          console.log(page)
        }}
        onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
          console.log(currentRowsPerPage, currentPage)
        }}
        paginationRowsPerPageOptions={[20, 50, 100]}
      />
    </div >
  );
}


export default RestaurantsPage;