import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap'
import validator from 'validator'

import { FormValidator } from '../../services'
import '../../styles/FormStyle.css'
import '../../styles/ButtonStyle.css'

const passwordMinRule = {
  field: 'password',
  method: validator.isLength,
  validWhen: true,
  args: [{ min: 6, max: undefined }],
  message: 'Mật khẩu phải ít nhất 6 ký tự.'
}

const formValidator = new FormValidator([
  {
    field: 'username',
    method: validator.isEmpty,
    validWhen: false,
    message: 'Vui lòng nhập tên khách hàng.'
  },
  {
    field: 'email',
    method: validator.isEmpty,
    validWhen: false,
    message: 'Vui lòng nhập Email.'
  },
  {
    field: 'email',
    method: validator.isEmail,
    validWhen: true,
    message: 'Vui lòng nhập đúng định dạng Email.'
  },
  {
    field: 'fullname',
    method: validator.isEmpty,
    validWhen: false,
    message: 'Vui lòng nhập tên đầy đủ'
  },
])

const ProfilePage = (props) => {
  const [accountUser, setAccountUser] = useState({ username: '', fullname: '', password: '', email: '' })
  const [validationResult, setValidationResult] = useState({ isValid: false })
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isMatchPasswordConfirm, setIsMatchPasswordConfirm] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)

  useEffect(() => {
    setAccountUser({
      username: 'xuanhung',
      fullname: 'Xuân Hùng',
      email: 'xuanhung@gmail.com',
      password: ''
    })
  }, [])
  const _validation = (isAll) => {
    if (accountUser.password) {
      formValidator.validations.push(passwordMinRule)
    }
    const rs = formValidator.validate(accountUser, isAll)
    setValidationResult(rs)
    return rs
  }
  const onChange = (e, attr) => {
    e.preventDefault()
    accountUser[attr] = e.target.value
    setAccountUser({ ...accountUser })
    formValidator.setOnTouch(attr)
    const rs = _validation()
    setValidationResult(rs)
    if (accountUser.password) {
      setIsTyping(false)
    }
    else {
      setIsTyping(true)
    }
  }

  const getPasswordComfirm = (e) => {
    setIsPasswordConfirm(false)
    setIsMatchPasswordConfirm(false)
    setPasswordConfirm(e.target.value)
  }
  const checkPasswordConfirm = () => {
    if (!isTyping) {
      if (!passwordConfirm) {
        return setIsPasswordConfirm(true)
      }
      if (passwordConfirm !== accountUser.password) {
        setIsMatchPasswordConfirm(true)
        return false
      }
      return true
    }
  }
  const onUpdate = (e) => {
    e.preventDefault()
    // validation
    if (checkPasswordConfirm()) {
      return;
    }
    if (_validation(true).isValid) {
      props.history.push('/admin/home')
    }
  }
  return (
    <div>
      <h1>Quản Lý Khách Hàng</h1>
      <Row>
        <Col lg={10}>
          <Form noValidate={true} autoComplete="off">
            <Form.Group as={Col} lg="6">
              <Form.Label className="title-weight-400">Tên người dùng:</Form.Label>
              <Form.Control placeholder="Tên khách hàng" value={accountUser.username} onChange={(e) => onChange(e, 'username')} />
              <div className="error">
                {validationResult.username && validationResult.username.isInvalid && validationResult.username.message}
              </div>
            </Form.Group>
            <Form.Group as={Col} lg="6">
              <Form.Label className="title-weight-400">Tên người dùng:</Form.Label>
              <Form.Control placeholder="Tên khách hàng" value={accountUser.fullname} onChange={(e) => onChange(e, 'fullname')} />
              <div className="error">
                {validationResult.fullname && validationResult.fullname.isInvalid && validationResult.fullname.message}
              </div>
            </Form.Group>
            <Form.Group as={Col} lg="6">
              <Form.Label className="title-weight-400">Email:</Form.Label>
              <Form.Control type="email" name="email" placeholder="Email" value={accountUser.email} onChange={(e) => onChange(e, 'email')} />
              <div className="error">
                {validationResult.email && validationResult.email.isInvalid && validationResult.email.message}
              </div>
            </Form.Group>


            <Form.Group as={Col} lg="6">
              <Form.Label className="title-weight-400">Mật Khẩu:</Form.Label>
              <Form.Control type="password" placeholder="Password" value={accountUser.password} onChange={(e) => onChange(e, 'password')} />
              <div className="error">
                {validationResult.password && validationResult.password.isInvalid && validationResult.password.message}
              </div>
            </Form.Group>
            <Form.Group as={Col} lg="6">
              <Form.Label className="title-weight-400">Xác nhận lại mật khẩu:</Form.Label>
              <Form.Control type="password" placeholder="Password" value={passwordConfirm} disabled={isTyping} onChange={getPasswordComfirm} />
              <div className="error">
                {isPasswordConfirm && 'Vui lòng xác nhận lại mật khẩu'}
              </div>
              {isMatchPasswordConfirm && 'Mật khẩu không trùng khớp'}
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Button type="submit" onClick={onUpdate} className="btn-default gruop-btn-margin btn-mg-l">
        Cập Nhật
          </Button>
    </div>
  );
}


export default ProfilePage;