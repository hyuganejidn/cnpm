import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table, Image, Form, Modal, FormControl } from "react-bootstrap";
import validator from "validator";
import { IoIosClose } from "react-icons/io";

import "../../styles/ButtonStyle.css";
import "../../styles/page/PlacesPage/PlacesPage.css";
import { Select, Images, TableWithLoading } from "../../components";
import { FormValidator } from '../../services'

const formValidator = new FormValidator([
  {
    field: "title",
    method: validator.isEmpty,
    validWhen: false,
    message: "Vui lòng nhập tên địa điểm"
  },
  {
    field: "content",
    method: validator.isEmpty,
    validWhen: false,
    message: "Vui lòng nhập mô t địa điểm"
  }
]);

const options = [{
  label: 'Nhà hàng + coffee',
  value: 1
}, {
  label: 'Khách sạn',
  value: 2
}, {
  label: 'Attract',
  value: 3
}, {
  label: 'Transport',
  value: 4
}]

const PlacesPage = (props) => {
  const [isReset, setIsReset] = useState(false)
  const [place, setPlace] = useState({
    title: '', content: '', time: '', paths: [], old_paths: [], catagory: ''
  })
  const [validationResult, setValidationResult] = useState({ isValid: false })
  const [isCatagory, setIsCatagory] = useState({});

  const [allFilesImage, setAllFilesImage] = useState([])
  const _validation = (isAll) => {
    const rs = formValidator.validate(place, isAll)
    setValidationResult(rs)
    return rs
  }
  const onChange = (e, attr) => {
    e.preventDefault()
    place[attr] = e.target.value
    setPlace({ ...place })
    formValidator.setOnTouch(attr)
    const rs = _validation()
    setValidationResult(rs)
  }

  const onChangeCatagories = (e, idx) => {
    setPlace({ ...place, catagory: e });
  };

  // const [images, setImages] = useState([])
  const onImageAdded = (imageId, file) => {
    allFilesImage.push(file)
    place.paths.push(imageId);
    setPlace({ ...place });
  };
  const onReset = (files, allFilesImage) => {
    allFilesImage.forEach(f => f.remove())
  }
  const onImageRemoved = imageId => {
    const images = place.paths.filter(id => id !== imageId);
    setPlace({ ...place, paths: images });
  };

  const deleteImages = (e, imageId, i) => {
    const images = place.paths.filter(id => id !== imageId);
    place.old_paths.splice(i, 1);
    setPlace({ ...place, paths: images });
  };

  const onUpdate = (e) => {
    e.preventDefault()
    // validation
    if (_validation(true).isValid) {
      props.history.push('/admin/home')
    }
  }
  return (
    <div>
      <h1>Dashboard Page</h1>
      <Row>

        <Col >

          <Form.Group as={Col} >
            <Select
              value={place.catagory}
              placeholder='Loại khu vực'
              options={options}
              onChange={onChangeCatagories}
            ></Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="title-weight-400">Tiêu đề:</Form.Label>
            <Form.Control placeholder="Tiêu đề" value={place.title} onChange={(e) => onChange(e, 'title')} />
            <div className="error">
              {validationResult.title && validationResult.title.isInvalid && validationResult.title.message}
            </div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="title-weight-400">Nội dung:</Form.Label>
            <Form.Control placeholder="Nội dung" as='textarea' value={place.content} onChange={(e) => onChange(e, 'content')} rows='4' />
            <div className="error">
              {validationResult.content && validationResult.content.isInvalid && validationResult.content.message}
            </div>
          </Form.Group>
        </Col>

        <Col >

          <div className="Image-List">
            {place.old_paths.map((image, i) => {
              return (
                <div className="Image-Item" key={i}>
                  <img
                    className="Image-Food img-fluid z-depth-1"
                    alt="food image"
                    key={image.id}
                    // src={`${config.url}/${image.path}`}
                    width="100"
                  />
                  <IoIosClose
                    onClick={e => deleteImages(e, image.id, i)}
                    className="Close-Image"
                  />

                </div>
              );
            })}
          </div>
          <Images removeImageRemote={!isReset} onAdded={onImageAdded} onSubmit={onReset} className='add-images' onRemoved={onImageRemoved}></Images>
        </Col>
      </Row>

      <Button type="submit" onClick={onUpdate} className="btn-default gruop-btn-margin btn-mg-l">
        Cập Nhật
          </Button>
    </div>
  );
}


export default PlacesPage;