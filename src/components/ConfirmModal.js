import React from 'react'
import {Modal, Button} from 'react-bootstrap'

function ConfirmModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.confirmtext}
        </p>
      {props.msg ? (
          <p className="error">{props.msg}</p>
      ) : ''}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="outline-primary">Không</Button>
        <Button onClick={props.onConfirm}>Đồng Ý</Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ConfirmModal
