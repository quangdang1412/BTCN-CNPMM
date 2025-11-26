import React, { useContext } from "react";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { loginApi } from "../util/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/auth.context";
import { ArrowLeftOutlined } from "@ant-design/icons";
import * as yup from "yup";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Định dạng email không hợp lệ")
      .required("Email là bắt buộc"),
    password: yup.string().required("Mật khẩu là bắt buộc"),
  });

  const onFinish = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      const { email, password } = values;

      const res = await loginApi(email, password);

      if (res && res.EC == 0) {
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        notification.success({
          message: "Đăng nhập thành công",
          description: "Thành công",
        });
        setAuth({
          isAuthenticated: true,
          user: {
            email: res?.user?.email ?? "",
            name: res?.user?.name ?? "",
            role: res?.user?.role ?? "",
          },
        });
        navigate("/");
      } else {
        notification.error({
          message: "Đăng nhập thất bại",
          description: res.EM ?? "Lỗi",
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
    <Row justify="center" style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>Đăng Nhập</legend>
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
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          <Link to="/">
            <ArrowLeftOutlined /> Quay lại trang chủ
          </Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Chưa có tài khoản? <Link to="/register">Đăng ký tài đây</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginPage;
