import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, } from "react-bootstrap";
import validator from "validator";
import { IoIosClose } from "react-icons/io";

import "../../styles/ButtonStyle.css";
import "../../styles/page/PlacesPage/PlacesPage.css";
import { Select, Images, TableWithLoading } from "../../components";
import { FormValidator, createServiceHotel } from '../../services'

const formValidator = new FormValidator([
  {
    field: "name",
    method: validator.isEmpty,
    validWhen: false,
    message: "Vui lòng nhập tên địa điểm"
  },
  {
    field: "content",
    method: validator.isEmpty,
    validWhen: false,
    message: "Vui lòng nhập địa điểm"
  },
  {
    field: "street_address",
    method: validator.isEmpty,
    validWhen: false,
    message: "Vui lòng nhập địa chỉ"
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
    name: '', content: '', street_address: '', extended_address: '', mobile: '', website: '', app: '',
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
            <Form.Label className="title-weight-400">Tên nhà hàng:</Form.Label>
            <Form.Control placeholder="Tên nhà hàng" value={place.name} onChange={(e) => onChange(e, 'name')} />
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
            <Form.Label className="title-weight-400">Địa chỉ:</Form.Label>
            <Form.Control placeholder="Địa chỉ" value={place.street_address} onChange={(e) => onChange(e, 'street_address')} rows='4' />
            <div className="error">
              {validationResult.street_address && validationResult.street_address.isInvalid && validationResult.street_address.message}
            </div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="title-weight-400">Địa chỉ chi tiết* :</Form.Label>
            <Form.Control placeholder="Địa chỉ chi tiết" value={place.extended_address} className='input-number' onChange={(e) => onChange(e, 'extended_address')} />
          </Form.Group>
          <Form.Group as={Col} lg="6">
            <Form.Label className="title-weight-400">Số Điện Thoại* :</Form.Label>
            <Form.Control placeholder="Số Điện Thoại" type='number' value={place.mobile} className='input-number' onChange={(e) => onChange(e, 'mobile')} />
            <div className="error">
              {validationResult.mobile && validationResult.mobile.isInvalid && validationResult.mobile.message}
            </div>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="title-weight-400">WebSite* :</Form.Label>
            <Form.Control placeholder="WebSite" type='number' value={place.website} className='input-number' onChange={(e) => onChange(e, 'website')} />
            <div className="error">
              {validationResult.website && validationResult.website.isInvalid && validationResult.website.message}
            </div>
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label className="title-weight-400">Bữa ăn* :</Form.Label>
            <Form.Control placeholder="Bữa ăn" value={place.meal} className='input-number' onChange={(e) => onChange(e, 'meal')} />
            <div className="error">
              {validationResult.meal && validationResult.meal.isInvalid && validationResult.meal.message}
            </div>
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label className="title-weight-400">Chế độ ăn* :</Form.Label>
            <Form.Control placeholder="Chế độ ăn" type='number' value={place.special_diet} className='input-number' onChange={(e) => onChange(e, 'special_diet')} />
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