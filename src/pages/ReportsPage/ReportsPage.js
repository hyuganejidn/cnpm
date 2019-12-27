/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Button, Form, Navbar, FormControl, Modal, Col } from 'react-bootstrap'
import { FaSearch, FaUserAltSlash, FaUserCheck } from 'react-icons/fa'
import { TableWithLoading, ConfirmModal } from '../../components'
import '../../styles/page/UsersPage/UsersPage.css'
import '../../styles/ButtonStyle.css'
import '../../styles/LabelStyle.css'
import { listReports, approveReport, } from '../../services'
const fomratStatus = (status) => {
  switch (+status) {
    case 0: return 'Đang chờ'
    case 1: return 'Chấp nhận'
    case 2: return 'Từ chối'
    default: return status
  }
}
const ReportPage = (props) => {
  // console.log()
  const columns = [{
    name: 'User',
    selector: 'fullname',
    sortable: true,
    width: '180px'
  },
  {
    name: 'Service',
    selector: 'name',
    sortable: true,
    width: '180px'
  },
  {
    name: 'ID Reports',
    selector: 'id',
    sortable: true,
    width: '100px'
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    width: '150px'
  },  {
    name: 'Time',
    selector: 'time',
    sortable: true,
    width: '200px'
  }, {
    name: 'Reason',
    selector: 'reason',
    sortable: true,
    width: '200px'
  }, {
    name: '',
    sortable: true,
    width: '250px',
    cell: (row) => {
      return (
        <div className="ml-20 group-btn-customer">
          {row.status !== "Chấp nhận" && < Button variant="success" onClick={() => _acceptsRole(row)} className="btn-margin btn-act  btn-pd btn-width">Approve</Button>}
        </div >
      );
    }
  },
  ]
  const [isModalProfileUser, showModalDetail] = useState(false)
  const [reports, setReports] = useState([])
  const [textSearchValue, setTextSearchValue] = useState('');
  const [isLoading, setisLoading] = useState(true)
  useEffect(() => {
    setisLoading(true)
    listReports(1, 8)
      .then(response => {
        const formatedResponse = response.data.message.map((r, i) => {
          const time = new Date(+r.time)
          return { ...r, time: `${time.toLocaleTimeString()}:${time.toLocaleDateString()}`, status: fomratStatus(r.status) }
        })
        console.log(formatedResponse)
        setReports(formatedResponse)
        // console.log(response.data.message[0].time, typeof response.data.message[0].time)
        // console.log(new Date(+response.data.message[0].time.toLocaleDateString()))
      })
      .finally(() => setisLoading(false))
  }, [])
  const _acceptsRole = (row) => {
    const idUser = localStorage.getItem('userid')
    console.log(row, idUser)
    approveReport(row.service_id, idUser)
  }
  // const showProfile = row => {
  //   showModalDetail(true)
  // }
  const onSearchChange = e => {
    e.preventDefault()
    setTextSearchValue(e.target.value)
  }
  const onSearchSubmit = e => {
    e.preventDefault()
    // listUsersRole({ amount: 20, page: 1, role: privilegeUser.value })
    //   .then(response => setUsers([...response]))
  }
  return (
    <div>
      <h1>Reports Management</h1>
      {/* <Navbar className="justify-content-between">
        <div>
          <Form inline onSubmit={onSearchSubmit}>
            <FormControl
              type="text"
              placeholder="Search"
              value={textSearchValue}
              onChange={onSearchChange}
              className="mr-sm-2 search-width-staff"
            />
            <Button type="submit" variant="info" className="btn btn-padding-7">
              <FaSearch className="FaSearch" />
            </Button>
          </Form>
        </div>
      </Navbar> */}
      <Modal show={isModalProfileUser} centered onHide={() => showModalDetail(false)}>
      </Modal>
      <TableWithLoading
        className="style-table-customer"
        isLoading={isLoading}
        columns={columns}
        data={reports}
       
        noDataComponent='Không có dữ liệu'
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


export default ReportPage;