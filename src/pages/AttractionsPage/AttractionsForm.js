import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, } from 'react-bootstrap';
import validator from 'validator';
import { IoIosClose } from 'react-icons/io';

import '../../styles/ButtonStyle.css';
import '../../styles/page/PlacesPage/PlacesPage.css';
import { Select, Images, TableWithLoading } from '../../components';
import { FormValidator, createServiceHotel } from '../../services'

const formValidator = new FormValidator([
  {
    field: 'name',
    method: validator.isEmpty,
    validWhen: false,
    message: 'Vui lòng nhập tên địa điểm'
  },
  {
    field: 'content',
    method: validator.isEmpty,
    validWhen: false,
    message: 'Vui lòng nhập địa điểm'
  },
  {
    field: 'street_address',
    method: validator.isEmpty,
    validWhen: false,
    message: 'Vui lòng nhập Address'
  },
  {
    field: 'mobile',
    method: validator.isLength,
    validWhen: true,
    args: [{ min: 10, max: 11 }],
    message: 'Vui lòng nhập 10 hoặc 11 số.'
  },
]);

const HotelsForm = (props) => {
  const [isReset, setIsReset] = useState(false)
  const [place, setPlace] = useState({
    name: '', content: '', street_address: '', extended_address: '', mobile: '', note: '',
  })
  const [images, setImages] = useState({ paths: [], old_paths: [] })
  const [validationResult, setValidationResult] = useState({ isValid: false })

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


  // const [images, setImages] = useState([])
  const onImageAdded = (imageId, file) => {
    allFilesImage.push(file)
    images.paths.push(imageId);
    setImages({ ...images });
  };
  const onReset = (files, allFilesImage) => {
    allFilesImage.forEach(f => f.remove())
  }
  const onImageRemoved = imageId => {
    const images = images.paths.filter(id => id !== imageId);
    setImages({ ...images, paths: images });
  };

  const deleteImages = (e, imageId, i) => {
    const images = images.paths.filter(id => id !== imageId);
    images.old_paths.splice(i, 1);
    setImages({ ...images, paths: images });
  };

  const onUpdate = (e) => {
    e.preventDefault()
    // validation
    if (_validation(true).isValid) {
      props.history.push('/admin/hotels')
    }
  }
  return (
    <div>
      <Row>
        <Col >
          <Form.Group as={Col}>
            <Form.Label className="title-weight-400">Name:</Form.Label>
            <Form.Control placeholder="Name" value={place.name} onChange={(e) => onChange(e, 'name')} />
            <div className="error">
              {validationResult.name && validationResult.name.isInvalid && validationResult.name.message}
            </div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="title-weight-400">Mô tả:</Form.Label>
            <Form.Control placeholder="Mô tả" value={place.content} onChange={(e) => onChange(e, 'content')} rows='4' />
            <div className="error">
              {validationResult.content && validationResult.content.isInvalid && validationResult.content.message}
            </div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="title-weight-400">Address:</Form.Label>
            <Form.Control placeholder="Address" value={place.street_address} onChange={(e) => onChange(e, 'street_address')} rows='4' />
            <div className="error">
              {validationResult.street_address && validationResult.street_address.isInvalid && validationResult.street_address.message}
            </div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="title-weight-400">Address chi tiết* :</Form.Label>
            <Form.Control placeholder="Address chi tiết" value={place.extended_address} className='input-number' onChange={(e) => onChange(e, 'extended_address')} />
          </Form.Group>
          <Form.Group as={Col} lg="6">
            <Form.Label className="title-weight-400">Number phone* :</Form.Label>
            <Form.Control placeholder="Number phone" type='number' value={place.mobile} className='input-number' onChange={(e) => onChange(e, 'mobile')} />
            <div className="error">
              {validationResult.mobile && validationResult.mobile.isInvalid && validationResult.mobile.message}
            </div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="title-weight-400">Address chi tiết* :</Form.Label>
            <Form.Control placeholder="Address chi tiết" value={place.extended_address} className='input-number' onChange={(e) => onChange(e, 'extended_address')} />
            <div className="error">
              {validationResult.extended_address && validationResult.extended_address.isInvalid && validationResult.extended_address.message}
            </div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="title-weight-400">Note* :</Form.Label>
            <Form.Control placeholder="Note" type='number' value={place.food_category} className='input-number' onChange={(e) => onChange(e, 'food_category')} />
          </Form.Group>
        </Col>

        <Col >
          <div className="Image-List">
            {images.old_paths.map((image, i) => {
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


export default HotelsForm;