import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { TransportationsForm } from '../TransportationsPage'

function TransportationsNew(props) {
  // const onCreate = food => {
  //   // submit api and redirect to ingredients page
  //   return createFood(food).then(() => props.history.push("/admin/foods"));
  // };

  // const onCreateAndContinue = food => {
  //   return createFood(food);
  // };
  
  return (
    <>
      <h1 className="title">Transportations</h1>
      <Breadcrumb>
        <LinkContainer to="/admin/hotels">
          <Breadcrumb.Item>Transportations</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Thêm transport</Breadcrumb.Item>
      </Breadcrumb>
      <TransportationsForm
      // onCreate={onCreate}
      // onCreateAndContinue={onCreateAndContinue}
      />
    </>
  );
}

export default TransportationsNew;
