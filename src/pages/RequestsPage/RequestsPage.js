/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Button, Form, Navbar, FormControl, Modal, Col, Row } from 'react-bootstrap'
import { FaSearch, FaUserAltSlash, FaUserCheck } from 'react-icons/fa'
import { TableWithLoading, ConfirmModal } from '../../components'
import '../../styles/page/UsersPage/UsersPage.css'
import '../../styles/ButtonStyle.css'
import '../../styles/LabelStyle.css'
import { getRequestUser, approveService, getRequestService } from '../../services'
const fomratStatus = (status) => {
  switch (+status) {
    case 0: return 'Đang chờ'
    case 1: return 'Chấp nhận'
    case 2: return 'Từ chối'
    default: return "Không rõ"
  }
}
const fomratKind = (kind) => {
  if (kind) {
    return 'Cập nhật dịch vụ'
  } else {
    return 'Tạo mới dịch vụ'
  }
}
const kindService = (status) => {
  switch (+status) {
    case 1: return 'Khách sạn'
    case 2: return 'Nhà hàng'
    case 3: return 'Attraction'
    case 4: return 'Transports'
    default: return "Không rõ"
  }
}
const RequestsPage = (props) => {
  // console.log()
  const columns = [{
    name: 'Tên người dùng',
    selector: 'fullname',
    sortable: true,
    width: '180px'
  },
  {
    name: 'Tên dịch vụ',
    selector: 'name',
    sortable: true,
    width: '180px'
  },
  {
    name: 'Id dịch vụ mới',
    selector: 'service_new_id',
    sortable: true,
    width: '100px'
  },
  {
    name: 'Tên dịch vụ',
    selector: 'name',
    sortable: true,
    width: '180px'
  },
  {
    name: 'ID request',
    selector: 'id',
    sortable: true,
    width: '100px'
  },
  {
    name: 'Trạng thái',
    selector: 'status',
    sortable: true,
    width: '150px'
  }, {
    name: 'Loại request',
    selector: 'kind',
    sortable: true,
    width: '150px'
  }, {
    name: 'Thời gian',
    selector: 'time',
    sortable: true,
    width: '200px'
  }, {
    name: '',
    sortable: true,
    width: '250px',
    cell: (row) => {
      return (
        <div className="ml-20 group-btn-customer">
          <Button variant="info" onClick={() => getDetailRequest(row)} className="btn-margin btn-act  btn-pd btn-width">Chi tiết</Button>
          {row.status !== "Chấp nhận" && < Button variant="success" onClick={() => acceptsRole(row)} className="btn-margin btn-act  btn-pd btn-width">Xác nhận</Button>}
        </div >
      );
    }
  },
  ]
  const [isModalProfileUser, showModalDetail] = useState(false)
  const [requests, setRequests] = useState([])
  const [textSearchValue, setTextSearchValue] = useState('');
  const [isLoading, setisLoading] = useState(true)
  const [resetData, setResetDate] = useState(false)
  const [requestDetail, setRequestDetail] = useState({})
  useEffect(() => {
    setisLoading(true)
    getRequestUser()
      .then(response => {
        const formatedResponse = response.data.message.map((r, i) => {
          const time = new Date(+r.time)
          return { ...r, time: `${time.toLocaleTimeString()}:${time.toLocaleDateString()}`, status: fomratStatus(r.status), kind: fomratKind(r.service_old_id) }
        })
        console.log(formatedResponse)
        setRequests([...formatedResponse])
        // console.log(response.data.message[0].time, typeof response.data.message[0].time)
        // console.log(new Date(+response.data.message[0].time.toLocaleDateString()))
      })
      .finally(() => setisLoading(false))
  }, [resetData])
  const acceptsRole = (row) => {
    console.log(row)
    approveService(row.id, row.service_new_id, row.service_old_id)
      .then(response => {
        console.log(response)
        setResetDate(!resetData)
        // row.status = 1
      })
  }
  const getDetailRequest = (row) => {
    getRequestService(row.service_new_id)
      .then(response => {
        console.log(response.data.message)
        setRequestDetail(response.data.message)
      })
      .then(r => showModalDetail(true))
  }
  const showProfile = row => {
    showModalDetail(true)
  }
  // const onSearchChange = e => {
  //   e.preventDefault()
  //   setTextSearchValue(e.target.value)
  // }
  // const onSearchSubmit = e => {
  //   e.preventDefault()
  //   // listUsersRole({ amount: 20, page: 1, role: privilegeUser.value })
  //   //   .then(response => setUsers([...response]))
  // }
  return (
    <div>
      <h1>Quản lý requests</h1>
      {/* <Navbar className="justify-content-between">
        <div>
          <Form inline onSubmit={onSearchSubmit}>
            <FormControl
              type="text"
              placeholder="Nhập từ khoá tìm kiếm"
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
        {!!requestDetail.name ? <>
          <Form.Group as={Col}>
            <Form.Label className="title-weight-400">Tên service:</Form.Label>
            <Form.Control value={requestDetail.name} disabled={true} onChange={e => console.log(e)} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="title-weight-400">Nội dung:</Form.Label>
            <Form.Control value={requestDetail.content} disabled={true} onChange={e => console.log(e)} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="title-weight-400">Địa chỉ:</Form.Label>
            <Form.Control value={requestDetail.street_address} disabled={true} onChange={e => console.log(e)} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="title-weight-400">Số điện thoại :</Form.Label>
            <Form.Control value={requestDetail.mobile} disabled={true} onChange={e => console.log(e)} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="title-weight-400">Loại dịch vụ :</Form.Label>
            <Form.Control value={kindService(requestDetail.service_id)} disabled={true} onChange={e => console.log(e)} />
          </Form.Group>
        </> :
          <p>Không tìm thấy chi tiết</p>}
      </Modal>
      <TableWithLoading
        className="style-table-customer"
        isLoading={isLoading}
        columns={columns}
        data={requests}
       
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


export default RequestsPage;