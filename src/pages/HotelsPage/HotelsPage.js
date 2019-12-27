/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { Button, Form, Navbar, FormControl } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io'
import { FaSearch, FaTrash, FaUserCheck } from 'react-icons/fa'
import { GoTools } from 'react-icons/go';

import '../../styles/ButtonStyle.css'
import '../../styles/LabelStyle.css'
import '../../styles/page/RestaurantsPage/RestaurantsPage.css'
import { TableWithLoading, ConfirmModal } from '../../components'
import { getServiceHotel, searchService } from '../../services';

function HotelsPage(props) {
  const columns = [{
    name: 'Name',
    selector: 'name',
    sortable: true,
    width: '200px',
    wrap: true,
    hide: 'sm'
  },
  {
    name: 'Address',
    selector: 'street_address',
    sortable: true,
    width: '200px',
    wrap: true
  },
  {
    name: 'Number phone',
    selector: 'phone',
    sortable: true,
    width: '180px',
    center: true,
    wrap: true
  },
  {
    name: 'Price',
    selector: 'price',
    sortable: true,
    width: '180px',
    center: true,
    wrap: true
  }, {
    name: 'Property Amenities',
    selector: 'property_amenities',
    sortable: true,
    width: '250px',
    center: true,
  },
  {
    name: "",
    width: 170,
    cell: (row) => {
      return (
        <Link to={`/admin/hotels/detail/${row.service_id}`}>
          <Button variant="success" className="btn-padding-9 btn-add-tablet">
            View          </Button>
        </Link>
      )
    }
  },
    // {
    //   name: '',
    //   cell: (row) => {
    //     return (
    //       <div className="">
    //         {/* <Button
    //             variant="info"
    //             className="btn-margin-right btn-pd btn"
    //             onClick={() =>
    //               props.history.push(`/admin/hotels/edit/${row.id}`)
    //             }
    //           >
    //             Sửa <GoTools />
    //           </Button> */}
    //         <Button
    //           variant="danger"
    //           className="btn-pd btn"
    //           onClick={() => {
    //             return destroy(row);
    //           }}
    //         >
    //           Ẩn
    //           </Button>
    //       </div>
    //     )
    //   }
    // },
    // {
    //   name: 'User report',
    //   width: 200,
    //   cell: (row) => {
    //     return (
    //       <Link to="/admin/hotels/reports">
    //         <Button variant="success" className="btn-padding-9 btn-add-tablet">
    //           Hiển thị<IoIosAddCircle />
    //         </Button>
    //       </Link>
    //     )
    //   }
    // },
  ]
  const [textSearchValue, setTextSearchValue] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  //   const [hotesls, setHotels] = useState([{ 'name': 'Monarque Hotel', 'street_address': '238 Vo Nguyen Giap Phuoc My, Son Tra District, Da Nang 550000 Vietnam', 'phone': null, 'price': null, },
  // ])
  const [hotesls, setHotels] = useState([])

  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    console.log('asda')
    setLoading(true)
    getServiceHotel()
      .then(response => {
        console.log(response.data.message, '@@@@@')
        setHotels([...response.data.message])
      })
      .finally(() => setLoading(false))
  }, [])
  const _destroy = () => {
    setModalShow(false);
  };
  const destroy = row => {
    setCurrentRow(row);
    setModalShow(true);
  };
  const onSearchSubmit = e => {
    e.preventDefault();
    // searchService(8, 1, textSearchValue)
    //   .then(response => {
    //     console.log(response.data.message)
    //     setHotels([...response.data.message])
    //   })
    props.history.push(`?page=1&limit=8&keywork=${textSearchValue}`);
  };
  const onSearchChange = e => {
    e.preventDefault();
    setTextSearchValue(e.target.value);
  };
  return (
    <div>
      <ConfirmModal show={modalShow} onConfirm={_destroy} confirmtext="Bạn có chắc chắnẩn không?" onHide={() => setModalShow(false)}
      />
      <h1>Hotels Management</h1>
      <Navbar className="justify-content-between">
        <div>
          <Form inline onSubmit={onSearchSubmit}>
            <FormControl
              type="text"
              placeholder="Search"
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
          <Link to="/admin/hotels/requests">
            <Button variant="success" className="btn-padding-9 btn-add-tablet">
              Requests cloudstudyjam11
            </Button>
          </Link>
          <Link to="/admin/hotels/new">
            <Button variant="success" className="btn-padding-9 btn-add-tablet">
              Thêm khách sạn <IoIosAddCircle />
            </Button>
          </Link>
        </div> */}
      </Navbar>

      <TableWithLoading
        className="style-table-customer"
        isLoading={isLoading}
        columns={columns}
        data={hotesls}

        noDataComponent='Không có dữ liệu'
        persistTableHead={true}

        onChangePage={page => {
          console.log(page)
        }}
        onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
          console.log(currentRowsPerPage, currentPage)
        }}

      />
    </div>

  );
}


export default HotelsPage;