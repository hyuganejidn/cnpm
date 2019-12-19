import React, { useState } from "react";
import { Breadcrumb, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { TableWithLoading, RequestsUserDetail } from "../../components";

function HotelsRequestsUser(props) {
  // const onCreate = food => {
  //   // submit api and redirect to ingredients page
  //   return createFood(food).then(() => props.history.push("/admin/foods"));
  // };

  // const onCreateAndContinue = food => {
  //   return createFood(food);
  // };
  const [modalShow, setModalShow] = useState(false);
  const [usernameRequest, setUsernameRequest] = useState('')
  const [contentRequestText, setContentRequestText] = useState('')
  const [isLoading, setLoading] = useState(false);
  const [requests, setRequest] = useState([{ username: 'xuanhung', fullname: 'Xuân Hùng A', time: 'as' },
  { username: 'xuanhung1', fullname: 'Xuân Hùng B', time: 'as' }])

  const columns = [{
    name: "Tên đăng nhâp",
    selector: "username",
    sortable: true,
    width: "180px",
    wrap: true,
    hide: 'sm'
  },
  {
    name: "Tên đầy đủ",
    selector: "fullname",
    sortable: true,
    width: '150px',
    wrap: true
  },
  {
    name: "Thời gian",
    selector: "time",
    sortable: true,
    width: '200px',
    center: true,
  }, {
    name: "",
    width: "200px",
    cell: (row) => {
      return (
        <Button variant="info" type="submit" className="btn btn-padding-7" onClick={() => detailFeedback(row)}>
          Chi tiết
        </Button>
      )
    }
  },]
  const _confirm = () => {
    setModalShow(false)
  }
  const detailFeedback = (row) => {
    console.log(row, "asdf")
    console.log('asdf')
    setModalShow(true)
    setUsernameRequest(row.fullname)
    setContentRequestText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel diam quis dui dignissim interdum id et dui. Quisque eget aliquam augue, vel accumsan velit. Nam erat libero, egestas maximus elit in, faucibus tristique velit. Vivamus risus nisi, auctor vitae pellentesque et, pulvinar ut diam. Cras nec mauris tellus. Praesent vehicula nibh consectetur tempor vehicula. Vivamus ultrices enim sapien, non condimentum mi eleifend posuere. Nulla in felis tristique, pulvinar nunc et, feugiat ipsum. Mauris lobortis tincidunt magna, malesuada placerat justo pharetra sed. Nunc hendrerit laoreet ante, ut ultricies ante bibendum sed. Proin ut sodales metus, eu lobortis ligula. Pellentesque massa eros, posuere ac ante vel, fringilla tincidunt elit. Ae")
  }
  return (
    <>
      <RequestsUserDetail show={modalShow} contentRequestText={contentRequestText} onConfirm={_confirm} title={usernameRequest} onHide={() => {
        setModalShow(false)
      }} ></RequestsUserDetail>
      <h1 className="title">User request</h1>
      <Breadcrumb>
        <LinkContainer to="/admin/hotels">
          <Breadcrumb.Item>Danh sách khách sạn</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>User request</Breadcrumb.Item>
      </Breadcrumb>
      <TableWithLoading
        className="style-table-customer"
        isLoading={isLoading}
        columns={columns}
        data={requests}
        pagination={true}
        paginationServer={true}
        paginationDefaultPage={2}
        paginationTotalRows={20}
        paginationPerPage={10}
        noDataComponent='Không có dữ liệu'
        persistTableHead={true}
        selectableRows={true}
        clearSelectedRows={true}
        clearSelectedRows={true}
        paginationRowsPerPageOptions={[20, 50, 100]}
        onChangePage={page => {
          console.log(page)
        }}
        onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
          console.log(currentRowsPerPage, currentPage)
        }}
      >
      </TableWithLoading>
    </>
  );
}

export default HotelsRequestsUser;
