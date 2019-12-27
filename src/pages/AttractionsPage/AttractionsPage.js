/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { Button, Form, Navbar, FormControl } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { FaSearch, FaTrash, FaUserCheck } from 'react-icons/fa'
import { GoTools } from 'react-icons/go';
import { IoIosAddCircle } from 'react-icons/io'
import '../../styles/ButtonStyle.css'
import '../../styles/LabelStyle.css'
import '../../styles/page/RestaurantsPage/RestaurantsPage.css'
import { TableWithLoading, Select, ConfirmModal } from '../../components'
import { getServiceAtt } from '../../services';

function AttractionsPage(props) {
  const [modalShow, setModalShow] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [attractions, setAttractions] = useState([])
  const columns = [{
    name: 'Attractions',
    selector: 'name',
    sortable: true,
    width: '250px',
    wrap: true
  },
  {
    name: 'Address',
    selector: 'street_address',
    sortable: true,
    width: '250px',
    wrap: true
  },
  {
    name: 'Extended Address',
    selector: 'extended_address',
    sortable: true,
    width: '180px',
    wrap: true
  },
  {
    name: 'Number phone',
    selector: 'mobile',
    sortable: true,
    width: '150px',
    center: true,
  },
  {
    name: 'Note',
    selector: 'note',
    sortable: true,
    width: '150px',
    center: true,
  },
  {
    name: "",
    width: 170,
    cell: (row) => {
      return (
        <Link to={`/admin/attractions/detail/${row.service_id}`}>
          <Button variant="success" className="btn-padding-9 btn-add-tablet">
            View
          </Button>
        </Link>
      )
    }
  },
    // {
    //   name: '',
    //   // width: 200,
    //   cell: (row) => {
    //     return (
    //       <div className="">
    //         {/* <Button
    //           variant="info"
    //           className="btn-margin-right btn-pd btn"
    //           onClick={() =>
    //             props.history.push(`/admin/attractions/edit/${row.id}`)
    //           }
    //         >
    //           Sửa <GoTools />
    //         </Button> */}
    //         <Button
    //           variant="danger"
    //           className="btn-pd btn"
    //           onClick={() => {
    //             return destroy(row);
    //           }}
    //         >
    //           Ẩn
    //         </Button>
    //       </div>
    //     )
    //   }
    // },
    // {
    //   name: 'User report',
    //   width: 200,
    //   cell: (row) => {
    //     return (
    //       <Link to="/admin/attractions/reports">
    //         <Button variant="success" className="btn-padding-9 btn-add-tablet">
    //           Hiển thị<IoIosAddCircle />
    //         </Button>
    //       </Link>
    //     )
    //   }
    // },
  ]
  const [isLoading, setLoading] = useState(false);
  const [textSearchValue, setTextSearchValue] = useState('');
  useEffect(() => {
    console.log('asda')
    setLoading(true)
    getServiceAtt()
      .then(response => {
        console.log(response.data.message, '@@@@@')
        setAttractions([...response.data.message])
      })
      .finally(() => setLoading(false))
  }, [props.location.search])
  const destroy = row => {
    setCurrentRow(row);
    setModalShow(true);
  };
  const _destroy = () => {
  };
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
      <h1>Attractions Management</h1>
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
          <Link to="/admin/attractions/requests">
            <Button variant="success" className="btn-padding-9 btn-add-tablet">
              Requests
            </Button>
          </Link>
          <Link to="/admin/attractions/new">
            <Button variant="success" className="btn-padding-9 btn-add-tablet">
              Thêm attractions <IoIosAddCircle />
            </Button>
          </Link>
        </div> */}
      </Navbar>
      <TableWithLoading
        className="style-table-customer"
        isLoading={isLoading}
        columns={columns}
        data={attractions}
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


export default AttractionsPage;