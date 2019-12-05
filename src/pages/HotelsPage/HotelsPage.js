import React, { useState } from 'react';
import { Button, Form, Navbar, FormControl } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io"
import { FaSearch, FaUserAltSlash, FaUserCheck } from "react-icons/fa"

import "../../styles/ButtonStyle.css"
import '../../styles/LabelStyle.css'
import '../../styles/page/RestaurantsPage/RestaurantsPage.css'

import { TableWithLoading, Select, ConfirmModal } from "../../components"

function HotelsPage() {
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
        <Link to="/admin/hotels/new">
          <Button variant="success" className="btn-padding-9 btn-add-tablet">
            Thêm khách sạn <IoIosAddCircle />
          </Button>
        </Link>
      </Navbar>
    </div>
    
  );
}


export default HotelsPage;