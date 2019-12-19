import React, { useState, useEffect } from 'react'
import { Button, Form, Navbar, FormControl, Modal, Col } from "react-bootstrap"

import { FaSearch, FaUserAltSlash, FaUserCheck } from "react-icons/fa"

import { TableWithLoading, Select, ConfirmModal } from "../../components"
import '../../styles/page/UsersPage/UsersPage.css'
import '../../styles/ButtonStyle.css'
import '../../styles/LabelStyle.css'
import { grantUser, listUsersRole } from '../../services'
const UsersPage = (props) => {
  const [roleObject, setRoleObject] = useState({})
  const [privilegeUser, setPrivilegeUser] = useState({ value: 3, label: "User" })
  const [textSearchValue, setTextSearchValue] = useState('');
  const [currentRow, setCurrentRow] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [isModalProfileUser, setIsModalProfileUser] = useState(false)
  const [isLoading, setLoading] = useState(false);
  const [modalShowRole, setModalShowRole] = useState(false)
  const [currentRoleId, setCurrentRoleId] = useState('')
  const [roleCurrent, setRoleCurrent] = useState({})
  const [users, setUsers] = useState([{
    id: '124212',
    fullName: 'Võ Xuân Hùng',
    email: 'xuanhung@gmail.com',
    username: 'xuanhung',
    password: '123123',
    role: 2,
  },
  {
    id: '1241232',
    fullName: 'Võ Xuân Hùng',
    email: 'xuanhung1@gmail.com',
    username: 'xuanhung2',
    password: '123123',
    role: 1,
  },
  {
    id: '124412',
    fullName: 'Võ Xuân Hùng',
    email: 'xuanhung2@gmail.com',
    username: 'xuanhung3',
    password: '123123',
    role: 0,
  }, {
    id: '144212',
    fullName: 'Võ Xuân Hùng',
    email: 'xuanhung2@gmail.com',
    username: 'xuanhung4',
    password: '123123',
    role: 0,
  }])
  const [amount, setAmount] = useState(20)
  const [page, setPage] = useState(1)
  const [role, setRole] = useState(3)
  const columns = [
    {
      name: "Tên khách hàng",
      selector: "fullName",
      sortable: true,
      width: '200px'
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      width: '200px'
    },
    {
      name: "Tên đăng nhập",
      selector: "username",
      sortable: true,
      width: '180px'
    },
    {
      name: "Quyền",
      selector: "role",
      sortable: true,
      width: '100px',
      cell: (row) => {
        return (
          <>
            <div> {row.role === 3 && "Người dùng"} </div>
            <div> {row.role === 2 && "Quản trị viên"} </div>
            <div> {row.role === 1 && "Admin"} </div>
            {/* <div> {row.role === 4 && } </div> */}
          </>
        )
      }
    },
    {
      name: "Cấp quyền",
      width: '250px',
      cell: (row) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }} >
            <Select
              className='select-format'
              placeholder='Quyền'
              options={[
                {
                  value: 2,
                  label: 'Staff'
                },
                {
                  value: 3,
                  label: 'User'
                },
                {
                  value: 1,
                  label: 'Admin'
                },
              ]}
              value={roleObject[row.username]}
              onChange={(e) => grantRightsUser(e, row)}
            ></Select>
            <Button variant="success" disabled={!roleObject[row.username]} onClick={() => acceptsRole(row)} className="btn-margin btn-act  btn-pd btn-width">Xác nhận</Button>
          </div >

        )
      },
      left: true
    },
    {
      name: "",
      width: '400px',
      cell: (row) => {
        return (
          <div className="ml-20 group-btn-customer">
            {row.role === 4 ? (
              <Button variant="success" onClick={() => active(row)} className="btn-margin btn-act  btn-pd btn-width">Hoạt Động <FaUserCheck /></Button>
            ) : (
                <Button variant="danger" onClick={() => destroy(row)} className="btn-margin  btn-pd btn-width">Vô Hiệu Hóa <FaUserAltSlash /></Button>
              )}
            <Button variant="success" onClick={() => showProfile(row)} className="btn-margin btn-act  btn-pd btn-width">Chi tiết<FaUserCheck /></Button>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    listUsersRole(amount, page, role)
      .then(repsonse => {
        console.log(repsonse)
        setUsers([...users])
      })
  }, [])

  const showProfile = row => {
    setIsModalProfileUser(true)
  }
  const acceptsRole = (row) => {
    setModalShowRole(true);
    setCurrentRoleId(row.username)
  }

  const active = (row) => {
    const item = users.find((u) => u.id === row.id)
    item.role = 3
    setUsers([...users])
    const active = { username: row.username, role: 3 }
    // grantUser(active)
  }
  
  const _destroy = () => {
    console.log(currentRow.username)
    const block = { username: currentRow.username, role: 4 }
    const item = users.find((u) => u.id === currentRow.id)
    item.role = 4
    // grantUser(block)
    setUsers([...users])
    setModalShow(false)
  }
  const destroy = row => {
    setCurrentRow(row)
    setModalShow(true)
  }
  const onSearchChange = e => {
    e.preventDefault()
    setTextSearchValue(e.target.value)
  }
  const onSearchSubmit = e => {
    e.preventDefault()
    console.log(privilegeUser, textSearchValue)
    // listUsersRole({ amount: 20, page: 1, role: privilegeUser.value })
    //   .then(response => setUsers([...response]))
  }

  const grantRightsUser = (e, row) => {
    setRoleObject({ [row.username]: e })
    setRoleCurrent({ username: row.username, role: e.value })
    // console.log({ username: row.username, role: e.value })
  }
  const _acceptsRole = (e) => {
    setModalShowRole(false)
    console.log(roleCurrent)
    setRoleObject({ [roleCurrent.username]: false })
    // grantUser(roleCurrent)
    //   .then(response => {
    //     console.log(response.data)
    //     const item = users.find((u) => u.id === response.data.id)
    //     item.role = response.data.role
    //     setUsers([...users])
    //   })

  }
  const changeSearchRole = (e) => {
    console.log(e)
    setPrivilegeUser(e)
  }

  return (
    <div>
      <ConfirmModal show={modalShow} onConfirm={_destroy} confirmtext="Bạn có chắc chắn muốn vô hiệu hoá tài khoản này không?" onHide={() => setModalShow(false)} />
      <ConfirmModal show={modalShowRole} onConfirm={_acceptsRole} confirmtext="Cấp quyền cho user này" onHide={() => setModalShowRole(false)} />
      <h1>Quản Lý Nhân Viên</h1>
      <Navbar className="justify-content-between">
        <div>
          <label className="search-explain">Bạn có thể tìm kiếm bằng cách nhập tên nhân viên</label>
          <Form inline onSubmit={onSearchSubmit}>
            <FormControl
              type="text"
              placeholder="Nhập từ khoá tìm kiếm"
              value={textSearchValue}
              onChange={onSearchChange}
              className="mr-sm-2 search-width-staff"
            />
            <Select
              className='select-width-staff'
              options={[
                {
                  value: 2,
                  label: 'Staff'
                },
                {
                  value: 3,
                  label: 'User'
                },
                {
                  value: 1,
                  label: 'Admin'
                }, {
                  value: 4,
                  label: 'Block'
                }
              ]}
              value={privilegeUser}
              onChange={changeSearchRole}
            ></Select>
            <Button type="submit" variant="info" className="btn btn-padding-7">
              <FaSearch className="FaSearch" />
            </Button>
          </Form>
        </div>
      </Navbar>
      <Modal show={isModalProfileUser} centered onHide={() => setIsModalProfileUser(false)}>
        <Form.Group as={Col} lg="6">
          <Form.Label className="title-weight-400">Tên đăng nhập:</Form.Label>
        </Form.Group>
        <Form.Group as={Col} lg="6">
          <Form.Label className="title-weight-400">Tên đầy đủ:</Form.Label>
        </Form.Group>
        <Form.Group as={Col} lg="6">
          <Form.Label className="title-weight-400">Email:</Form.Label>
          {/* <Form.Control type="email" name="email" placeholder="Email" value={accountUser.email} onChange={(e) => onChange(e, 'email')} /> */}
        </Form.Group>
      </Modal>
      <TableWithLoading
        className="style-table-customer"
        isLoading={isLoading}
        columns={columns}
        data={users}
        pagination={true}
        paginationServer={true}
        paginationDefaultPage={2}
        paginationTotalRows={20}
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
  )
}


export default UsersPage