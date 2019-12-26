import React, { useState, useEffect } from 'react'
import { Button, Form, Navbar, FormControl, Modal, Col } from 'react-bootstrap'

import { FaSearch, FaUserAltSlash, FaUserCheck } from 'react-icons/fa'
import { parse } from 'query-string'
import { TableWithLoading, Select, ConfirmModal } from '../../components'
import '../../styles/page/UsersPage/UsersPage.css'
import '../../styles/ButtonStyle.css'
import '../../styles/LabelStyle.css'
import { listBlogs } from '../../services'
// import { grantUser, listUsersRole } from '../../services'

const formatAdmin = (role) => {
  switch (role) {
    case 1: return 'Admin'
    case 2: return 'Staff'
    case 3: return 'User'
    default: return 'Block'
  }
}
const BlogsPage = (props) => {
  const columns = [
    {
      name: 'Tiêu đề',
      selector: 'title',
      sortable: true,
      width: '200px'
    },
    {
      name: 'Tổng quát',
      selector: 'overview',
      sortable: true,
      width: '200px'
    },
    {
      name: 'Tên đăng nhập',
      selector: 'username',
      sortable: true,
      width: '180px'
    },
    {
      name: 'Nội dung',
      selector: 'content',
      sortable: true,
      width: '180px'
    },
    // {
    //   name: 'Nội dung',
    //   selector: 'author_id',
    //   sortable: true,
    //   width: '180px'
    // },
  ];
  const [textSearchValue, setTextSearchValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([])
  const params = parse(props.location.search);
  const [amount, setAmount] = useState(20)
  if (!params.page) {
    params.page = '1';
  }
  if (!params.limit) {
    params.amount = '8';
  }
  useEffect(() => {
    listBlogs(params)
      .then(repsonse => {
        console.log(repsonse.data.message)
        setBlogs([...repsonse.data.message])
      })
  }, [props.location.search])



  const onSearchChange = e => {
    e.preventDefault()
    setTextSearchValue(e.target.value)
  }
  const onSearchSubmit = e => {
    e.preventDefault()
    // params.role =  privilegeUser.value
    // console.log(props.)
    // props.history.push(`?role=${params.role}&page=1&amount=${params.amount}`);
    // listUsersRole(params)
    //   .then(repsonse => setUsers([...repsonse.data.message]))
  }


  return (
    <div>
      <h1>Quản Lý Blogs</h1>
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
      <TableWithLoading
        className="style-table-customer"
        isLoading={isLoading}
        columns={columns}
        data={blogs}
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


export default BlogsPage