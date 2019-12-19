import React, { useState } from "react";
import { Button, Form, Row, Alert } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "../styles/LoginPage.css";
import "../styles/LabelStyle.css";
import { auth } from "../services";

const LoginPage = props => {
  if (localStorage.getItem('token')) {
    props.history.push('/admin')
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showText, setShowText] = useState(false);

  const loginFormSubmitHandler = (e) => {
    e.preventDefault();
    auth(username, password)
      .then(response => {
        console.log(response.data.message.user)
        localStorage.setItem('token', response.data.message.user.token)
        props.history.push('/admin/users')
      })
      .catch((error) => {
        // show errors if login failure
        setShowText(true)
        console.log('@ error', error.response)
      })
  };

  return (
    <Row className="justify-content-md-center">
      <Form className="form-margin">
        <h1 className="text-center login-h1-handing">Đăng nhập</h1>
        {showText && <Alert variant="danger">Sai Email hoặc Password</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="title-weight-400">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="title-weight-400">Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          type="submit"
          onClick={loginFormSubmitHandler}
          className="btn-login"
        >
          Đăng nhập
        </Button>
        <div className="text-center forget-password">
          <Link to="" className="btn-password">
            Quên mật khẩu ?
          </Link>
        </div>
      </Form>
    </Row>
  );
};

export default LoginPage;
