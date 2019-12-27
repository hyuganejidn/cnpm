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

import { TableWithLoading, Select, ConfirmModal } from '../../components'
import { getServiceTrans, searchService } from '../../services';

function TransportationsForm(props) {
  const columns = [{
    name: 'Transortations',
    selector: 'name',
    sortable: true,
    width: '250px',
    wrap: true
  },
  {
    name: 'Content',
    selector: 'content',
    sortable: true,
    width: '170px',
    wrap: true
  },
  {
    name: 'Number phone',
    selector: 'phone_number',
    sortable: true,
    width: '170px',
    wrap: true
  },
  {
    name: 'Web Site',
    selector: 'website',
    sortable: true,
    width: '250px',
    wrap: true
  },
  {
    name: "",
    width: 170,
    cell: (row) => {
      return (
        <Link to={`/admin/transportations/detail/${row.service_id}`}>
          <Button variant="success" className="btn-padding-9 btn-add-tablet">
            View          </Button>
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
    //             props.history.push(`/admin/transportations/edit/${row.id}`)
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
    //       <Link to="/admin/transportations/reports">
    //         <Button variant="success" className="btn-padding-9 btn-add-tablet">
    //           Hiển thị<IoIosAddCircle />
    //         </Button>
    //       </Link>
    //     )
    //   }
    // },
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

  const [textSearchValue, setTextSearchValue] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [isLoading, setLoading] = useState(false);

  const [transportations, setTransportations] = useState([])
  useEffect(() => {
    console.log('asda')
    setLoading(true)
    getServiceTrans()
      .then(response => {
        console.log(response.data.message, '@@@@@')
        setTransportations([...response.data.message])
      })
      .finally(() => setLoading(false))
  }, [])

  const onSearchSubmit = e => {
    // e.preventDefault();
    // props.history.push(`?page=1&limit=${params.limit}&q=${textSearchValue}`);
  };
  const onSearchChange = e => {
    // e.preventDefault();
    // params.q = e.target.value;
    // setTextSearchValue(params.q);
  };
  const destroy = row => {
    setCurrentRow(row);
    setModalShow(true);
  };
  const _destroy = () => {
  };
  return (
    <div>
      <ConfirmModal show={modalShow} onConfirm={_destroy} confirmtext="Bạn có chắc chắnẩn không?" onHide={() => setModalShow(false)} />
      <h1>Transportations Management</h1>
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
        </div> */}
      </Navbar>
      <TableWithLoading
        className="style-table-customer"
        isLoading={isLoading}
        columns={columns}
        data={transportations}
        noDataComponent='Không có dữ liệu'

      />
    </div>

  );
}


export default TransportationsForm;