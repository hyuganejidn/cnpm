/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'
import { Button, Form, Navbar, FormControl, Modal, Col } from 'react-bootstrap'

import { FaSearch, FaUserAltSlash, FaUserCheck } from 'react-icons/fa'
import { parse } from 'query-string'
import { TableWithLoading, Select, ConfirmModal } from '../../components'
import '../../styles/page/UsersPage/UsersPage.css'
import '../../styles/ButtonStyle.css'
import '../../styles/LabelStyle.css'
import { grantUser, listUsersRole } from '../../services'

const formatAdmin = (role) => {
  switch (role) {
    case 1: return 'Admin'
    case 2: return "Staff"
    case 3: return "User"
    default: return "Block"
  }
}
const UsersPage = (props) => {
  const columns = [
    {
      name: 'Full name',
      selector: 'fullname',
      sortable: true,
      width: '200px'
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      width: '200px'
    },
    {
      name: 'User name',
      selector: 'username',
      sortable: true,
      width: '180px'
    },
    {
      name: 'Role',
      selector: 'role',
      sortable: true,
      width: '100px',
      cell: (row) => {
        return (
          <>
            <div> {row.role === 3 && 'User'} </div>
            <div> {row.role === 2 && 'Staff'} </div>
            <div> {row.role === 1 && 'Admin'} </div>
            <div> {row.role === 4 && 'Blocked'} </div>
          </>
        )
      }
    },
    {
      name: 'Grant Right',
      width: '250px',
      // eslint-disable-next-line react/display-name
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
      name: '',
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
  const [roleObject, setRoleObject] = useState({})
  const [textSearchValue, setTextSearchValue] = useState('');
  const [currentRow, setCurrentRow] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [isModalProfileUser, setIsModalProfileUser] = useState(false)
  const [isLoading, setLoading] = useState(false);
  const [modalShowRole, setModalShowRole] = useState(false)
  const [currentRoleId, setCurrentRoleId] = useState('')
  const [roleCurrent, setRoleCurrent] = useState({})
  const [users, setUsers] = useState([])
  const params = parse(props.location.search);
  const [amount, setAmount] = useState(20)
  const [page, setPage] = useState(1)
  const [role, setRole] = useState(3)
  const [user, setUser] = useState({})
  if (!params.role) {
    params.role = "1"
  }
  if (!params.page) {
    params.page = "1";
  }
  if (!params.limit) {
    params.amount = "100";
  }
  const [privilegeUser, setPrivilegeUser] = useState({ value: params.role, label: formatAdmin(+params.role) })

  useEffect(() => {
    // console.log(params)
    listUsersRole(params)
      .then(repsonse => {
        console.log(repsonse.data.message)
        setUsers([...repsonse.data.message])
      })
  }, [props.location.search])

  const showProfile = row => {
    setUser(row)
    setIsModalProfileUser(true)
  }


  const active = (row) => {
    const item = users.find((u) => u.id === row.id)
    item.role = 3
    setUsers([...users])
    const active = { username: row.username, role: 3 }
    grantUser(active)
  }


  const onSearchChange = e => {
    e.preventDefault()
    setTextSearchValue(e.target.value)
  }
  const onSearchSubmit = e => {
    e.preventDefault()
    // params.role =  privilegeUser.value
    // console.log(props.)
    params.role = privilegeUser.value
    props.history.push(`?role=${params.role}&page=1&amount=${params.amount}`);
    // listUsersRole(params)
    //   .then(repsonse => setUsers([...repsonse.data.message]))
  }

  const grantRightsUser = (e, row) => {
    setRoleObject({ [row.username]: e })
    setRoleCurrent({ username: row.username, role: e.value })
    // console.log({ username: row.username, role: e.value })
  }
  const acceptsRole = (row) => {
    setModalShowRole(true);
    setCurrentRoleId(row.username)
  }
  const _acceptsRole = (e) => {
    setModalShowRole(false)
    console.log(roleCurrent)
    const item = users.find((u) => u.username === roleCurrent.username)
    item.role = roleObject[item.username].value
    setUsers([...users])
    setRoleObject({ [roleCurrent.username]: false })
    grantUser(roleCurrent)
      .then(response => {
        console.log(response.data)
      })
      .then(r => window.location.reload())
  }
  const _destroy = () => {
    console.log(currentRow.username)
    const block = { username: currentRow.username, role: 4 }
    const item = users.find((u) => u.id === currentRow.id)
    item.role = 4
    grantUser(block)
    setUsers([...users])
    setModalShow(false)
  }
  const destroy = row => {
    setCurrentRow(row)
    setModalShow(true)
  }
  const changeSearchRole = (e) => {
    console.log(e)
    setPrivilegeUser(e)
  }

  return (
    <div>
      <ConfirmModal show={modalShow} onConfirm={_destroy} confirmtext="Bạn có chắc chắn muốn vô hiệu hoá tài khoản này không?" onHide={() => setModalShow(false)} />
      <ConfirmModal show={modalShowRole} onConfirm={_acceptsRole} confirmtext="Cấp quyền cho user này" onHide={() => setModalShowRole(false)} />
      <h1>Users</h1>
      <Navbar className="justify-content-between">
        <div>
          <Form inline onSubmit={onSearchSubmit}>
            <FormControl
              type="text"
              placeholder="Search"
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
          <Form.Label className="title-weight-400">Tên đăng nhập:  {user.username}</Form.Label>
        </Form.Group>
        <Form.Group as={Col} lg="6">
          <Form.Label className="title-weight-400">Tên đầy đủ:  {user.fullname}</Form.Label>
        </Form.Group>
        <Form.Group as={Col} lg="6">
          <Form.Label className="title-weight-400">Email:  {user.email}</Form.Label>
          {/* <Form.Control type="email" name="email" placeholder="Email" value={accountUser.email} onChange={(e) => onChange(e, 'email')} /> */}
        </Form.Group>
      </Modal>
      <TableWithLoading
        className="style-table-customer"
        isLoading={isLoading}
        columns={columns}
        data={users}

        noDataComponent='Không có dữ liệu'
        onChangePage={page => {
          console.log(page)
        }}
        onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
          console.log(currentRowsPerPage, currentPage)
        }}

      />
    </div>
  )
}


export default UsersPage