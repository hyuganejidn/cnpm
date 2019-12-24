import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AttractionsForm } from '../AttractionsPage'

function EditAttractions(props) {
  // const onCreate = food => {
  //   // submit api and redirect to ingredients page
  //   return createFood(food).then(() => props.history.push("/admin/foods"));
  // };

  // const onCreateAndContinue = food => {
  //   return createFood(food);
  // };

  return (
    <>
      <h1 className="title">Quản Lý khách sạn</h1>
      <Breadcrumb>
        <LinkContainer to="/admin/hotels">
          <Breadcrumb.Item>Danh sách khách sạn</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Thêm khách sạn</Breadcrumb.Item>
      </Breadcrumb>
      <AttractionsForm isEdit={true}
      // onCreate={onCreate}
      // onCreateAndContinue={onCreateAndContinue}
      />
    </>
  );
}

export default EditAttractions;
