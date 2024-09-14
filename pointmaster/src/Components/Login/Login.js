import React, { useState } from "react";
import "./login.css";
import { Form, Input, Button, Checkbox, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function Login({ isAuthenticated, setIsAuthenticated }) {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate(); 

  const onFinish = (values) => {
    const url = "http://localhost:3002/employee/login";
    axios
      .post(url, {
        email: values.username,
        password: values.password,
      })
      .then((response) => {
        console.log("API Response:", response);  // Log the full response to inspect it
  
        if (response.status === 200) {
          // Access token might not be in `response.data.accessToken`, so let's check the whole response object
          console.log("Response Data:", response.data);
  
          // Assuming token is inside response.data (check this from the log)
          const accessToken = response.data.accessToken || response.data.token || response.data; 
          console.log("Access Token:", accessToken);  // Log the access token
  
          localStorage.setItem("accessToken", JSON.stringify(accessToken));
          setIsAuthenticated(true);
          navigate("/");  // Redirect to MainLayout after successful login
        } else {
          messageApi.open({
            type: "error",
            content: "Invalid credentials",
          });
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);  // Log error for debugging
        messageApi.open({
          type: "error",
          content: "Login failed",
        });
      });
  };
  
  

  return (
    <div className="login-container">
      {contextHolder}
      <div className="image-section">
        <img src={`${process.env.PUBLIC_URL}images/LogIn.png`} alt="Welcome" />
      </div>
      <div className="form-section">
        <h1>
          Welcome Back! <br />
          Login to your account
        </h1>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log In
            </Button>
          </Form.Item>

          <div className="remember-forgot">
            <Checkbox className="remember-me-checkbox">Remember me</Checkbox>
            <a className="login-form-forgot" href="#">
              Forgot password
            </a>
          </div>

          <div className="register-link">
            <p>
              Don't have an account? <a href="#">Register</a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
