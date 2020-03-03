import React, { useState } from "react";
import { Form, Icon, Input, Button, Checkbox, Typography, message } from "antd";
import axios from "axios";
const env = process.env.NODE_ENV || 'production';
const BASE_URL =
  env === "development"
    ? process.env.REACT_APP_API_BASE_URL
    : process.env.REACT_APP_API_BASE_URL_PROD;

const { Title, Paragraph } = Typography;

const NormalLoginForm = ({ form, history, isAuthenticated }) => {
  const { getFieldDecorator, getFieldsValue } = form;
  const { email, password } = getFieldsValue();
  const [isLoading, setIsloading] = useState(false)

  const handleSubmit = e => {
    setIsloading(true)
    e.preventDefault();

    axios
      .post(`${BASE_URL}/users/login`, {
        email,
        password
      })
      .then(res => {
        const token = res.data.data.token;
        localStorage.setItem("access_token", token);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        message.success(`Successfully login, Welcome ${res.data.data.name}`)
        history.push("/");
      })
      .catch(err => {
        if (err.response) {
          message.error(err.response.data.message)
        }

        message.error(err.message)
      });
  };

  return (
    <div style={{ maxWidth: "50%", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Login
      </Title>
      <Paragraph style={{ textAlign: "center" }}>
        To get started, you most login first
      </Paragraph>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="/forgot">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLoading}
          >
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

const Login = Form.create({ name: "normal_login" })(NormalLoginForm);
export default Login;
