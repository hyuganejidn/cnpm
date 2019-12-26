import React, { useState, useEffect } from 'react'
import { Breadcrumb, Navbar, Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { getService } from '../../services'

function DetailHotels(props) {
  const id = props.match.params.id
  const [places, setPlaces] = useState([])

  useEffect(() => {
    getService(id)
      .then((response) => {
        setPlaces(response.data.message);
        console.log(response.data)
        //compareDate(response.data.order_list,currentDate)
      })
  }, [])

  return (
    <div>
      <Breadcrumb>
        <LinkContainer to="/admin/hotels">
          <Breadcrumb.Item>Danh sách nhà hàng</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Chi tiết nhà hàng</Breadcrumb.Item>
      </Breadcrumb>
      <section>
        <p>Tên khách sạn:<b> {places.name}</b></p>
        <p>Nội dung:  <b>{places.content}</b></p>
        <p>Số điện thoại: <b>{places.mobile}</b></p>
        <p>Địa chỉ:<b>{places.street_address + " " + places.extended_address}</b>   </p>
        <p>Tiện nghi:  <b>{places.property_amenities}</b></p>
        <p>Giá tièn:<b> {places.price}</b></p>
        <p>Đánh giá:  <b>{places.total_rating}</b></p>
      </section>
    </div>
  )
}


export default DetailHotels
