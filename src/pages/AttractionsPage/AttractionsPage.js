import React, { useState } from 'react';
import { Button, Form, Navbar, FormControl } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FaSearch, FaUserAltSlash, FaUserCheck } from "react-icons/fa"
import { IoIosAddCircle } from "react-icons/io"
import "../../styles/ButtonStyle.css"
import '../../styles/LabelStyle.css'
import '../../styles/page/RestaurantsPage/RestaurantsPage.css'
import { TableWithLoading, Select, ConfirmModal } from "../../components"

function AttractionsPage() {
  const [attractions, setAttractions] = useState([
    { "name": "Sun World Danang Wonders", "street_address": "01 Phan Dang Luu", "extended_address": "Hai Chau", "locality": "Da Nang 550000, ", "country_name": "Vietnam", },
    { "name": "Golden Bridge", "street_address": null, "extended_address": "Ba Na Hills", "locality": "Da Nang 550000, ", "country_name": "Vietnam", },
    { "name": "My Khe Beach", "street_address": null, "extended_address": null, "locality": "Da Nang, ", "country_name": "Vietnam", "feedback": ["Very nice beach and good restaurant along the board walk you can rent beach loungers and umbrellas as it dose get very hot they keep the beach clean", "A perfect beach to enjoy with all the good things included clean and long smooth beach, white sand, amazing blue water, many my beautiful private pictures taken here.", "The sand is soft and provides a cushion if you want to take a long walk down the long beach overlooking the colorful boats and distant island."], },
    { "name": "Da Nang Museum of Cham Sculpture", "street_address": "No 2, 2 Thang 9 Street", "extended_address": null, "locality": "Da Nang, ", "country_name": "Vietnam", "feedback": ["If you have visited the My Son temple complexes then this adds a wonderful layer of depth, as it shows in sumptuous detail the surface decoration the buildings would have contained, in addition to altar pieces and...", "Strongly recommend getting the audio guide as it helps you appreciate the history better.", "There is a great collection of Cham sculpture here and excellently presented with explanations in English."], },
  ])
  const columns = [{
    name: "Attractions",
    selector: "name",
    sortable: true,
    width: '250px',
    wrap: true
  },
  {
    name: "Địa chỉ",
    selector: "street_address",
    sortable: true,
    width: '250px',
    wrap: true
  },
  {
    name: "Đánh giá",
    selector: "feedback",
    sortable: true,
    width: '180px',
    // wrap: true
  },
  // {
  //   name: "User requset",
  //   width: 200,
  //   cell: (row) => {
  //     return (
  //       <Link to="/admin/attractions/requests">
  //         <Button variant="success" className="btn-padding-9 btn-add-tablet">
  //           Hiển thị<IoIosAddCircle />
  //         </Button>
  //       </Link>
  //     )
  //   }
  // },
  {
    name: "User report",
    width: 200,
    cell: (row) => {
      return (
        <Link to="/admin/attractions/reports">
          <Button variant="success" className="btn-padding-9 btn-add-tablet">
            Hiển thị<IoIosAddCircle />
          </Button>
        </Link>
      )
    }
  },
  ]
  const [isLoading, setLoading] = useState(false);

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
      <h1>Attractions</h1>
      <Navbar className="justify-content-between">
        <div>
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
        <div>
          <Link to="/admin/attractions/requests">
            <Button variant="success" className="btn-padding-9 btn-add-tablet">
              Requests
            </Button>
          </Link>
          <Link to="/admin/attractions/new">
            <Button variant="success" className="btn-padding-9 btn-add-tablet">
              Thêm attractions <IoIosAddCircle />
            </Button>
          </Link>  </div>
      </Navbar>
      <TableWithLoading
        className="style-table-customer"
        isLoading={isLoading}
        columns={columns}
        data={attractions}
        pagination={true}
        paginationServer={true}
        paginationDefaultPage={2}
        paginationTotalRows={20} s
        paginationPerPage={10}
        noDataComponent='Không có dữ liệu'
        persistTableHead={true}
        selectableRows={true}
        clearSelectedRows={true}
        clearSelectedRows={true}
        onChangePage={page => {
          console.log(page)
        }}
        onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
          console.log(currentRowsPerPage, currentPage)
        }}
        paginationRowsPerPageOptions={[20, 50, 100]}
      />
    </div>
  );
}


export default AttractionsPage;