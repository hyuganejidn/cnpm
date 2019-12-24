import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { RestaurantsForm } from '../RestaurantsPage'
import { getService } from '../../services'

function RestaurantsEdit(props) {
  const id = props.match.params.id
  console.log(id, '@id')
  const [restaurants, setRestaurants] = useState({ name: '', content: '', street_address: '', extended_address: '', mobile: '', food_category: '', special_diet: '', meal: '' })
  // const onCreate = food => {
  //   // submit api and redirect to ingredients page
  //   return createFood(food).then(() => props.history.push("/admin/foods"));
  // };
  useEffect(() => {
    getService(id)
      .then((response) => {
        // setStaff(response.data)
        console.log(response)
        setRestaurants({ ...restaurants })
      })
  }, [])

  const onUpdate = (data) => {
    // submit api and redirect to ingredients page
    props.history.push('/admin/restaurants')
  }


  return (
    <>
      <h1 className="title">Quản Lý nhà hàng</h1>
      <Breadcrumb>
        <LinkContainer to="/admin/restaurants">
          <Breadcrumb.Item>Danh sách nhà hàng</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Cập nhật nhà hàng</Breadcrumb.Item>
      </Breadcrumb>
      <RestaurantsForm isEdit={true} restaurants={restaurants} onUpdate={onUpdate}
      />
    </>
  );
}

export default RestaurantsEdit;
