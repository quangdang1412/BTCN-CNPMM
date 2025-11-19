import React from "react";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { createUserApi } from "../util/api";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import * as yup from "yup";

const RegisterPage = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Định dạng email không hợp lệ")
      .required("Email là bắt buộc"),
    password: yup
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số"
      )
      .required("Mật khẩu là bắt buộc"),
    name: yup
      .string()
      .min(2, "Tên phải có ít nhất 2 ký tự")
      .required("Tên là bắt buộc"),
  });

  const onFinish = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      const { name, email, password } = values;

      const res = await createUserApi(name, email, password);

      if (res) {
        notification.success({
          message: "Đăng ký thành công",
          description: "Thành công",
        });
        navigate("/login");
      } else {
        notification.error({
          message: "Đăng ký thất bại",
          description: "Lỗi",
        });
      }
    } catch (validationErrors) {
      const errors = {};
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      // Set form errors
      form.setFields(
        Object.keys(errors).map((key) => ({
          name: key,
          errors: [errors[key]],
        }))
      );
    }
  };

  const [form] = Form.useForm();

  return (
    <div justify="center" style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>Đăng Ký Tài Khoản</legend>
          <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email!",
                },
                {
                  type: "email",
                  message: "Vui lòng nhập email hợp lệ!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
                {
                  min: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên!",
                },
                {
                  min: 2,
                  message: "Tên phải có ít nhất 2 ký tự",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
          <Divider />
          <p>
            Bạn đã có tài khoản? <Link to="/login">Đăng Nhập</Link>
          </p>
          <Link to="/">
            <ArrowLeftOutlined /> Quay lại Trang chủ
          </Link>
        </fieldset>
      </Col>
    </div>
  );
};

export default RegisterPage;
