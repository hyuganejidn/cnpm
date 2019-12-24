import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { RestaurantsForm } from '../RestaurantsPage'

function RestaurantsNew(props) {
  // const onCreate = food => {
  //   // submit api and redirect to ingredients page
  //   return createFood(food).then(() => props.history.push("/admin/foods"));
  // };

  // const onCreateAndContinue = food => {
  //   return createFood(food);
  // };

  return (
    <>
      <h1 className="title">Quản Lý nhà hàng</h1>
      <Breadcrumb>
        <LinkContainer to="/admin/restaurants">
          <Breadcrumb.Item>Danh sách nhà hàng</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Thêm nhà hàng</Breadcrumb.Item>
      </Breadcrumb> 
      <RestaurantsForm  {...props}
      // onCreate={onCreate}
      // onCreateAndContinue={onCreateAndContinue}
      />
    </>
  );
}

export default RestaurantsNew;
