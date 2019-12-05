import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AttractionsForm } from '../AttractionsPage'

function AttractionsNew(props) {
  // const onCreate = food => {
  //   // submit api and redirect to ingredients page
  //   return createFood(food).then(() => props.history.push("/admin/foods"));
  // };

  // const onCreateAndContinue = food => {
  //   return createFood(food);
  // };
  
  return (
    <>
      <h1 className="title">Attractions</h1>
      <Breadcrumb>
        <LinkContainer to="/admin/attractions">
          <Breadcrumb.Item>Attractions</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Thêm Attraction</Breadcrumb.Item>
      </Breadcrumb>
      <AttractionsForm
      // onCreate={onCreate}
      // onCreateAndContinue={onCreateAndContinue}
      />
    </>
  );
}

export default AttractionsNew;
