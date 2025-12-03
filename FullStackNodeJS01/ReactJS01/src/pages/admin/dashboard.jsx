import { Card, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const AdminDashboardPage = () => {
  return (
    <div style={{ padding: "40px 20px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h1
          style={{ marginBottom: "30px", fontSize: "28px", fontWeight: "bold" }}
        >
          Dashboard Quản Trị
        </h1>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng Người Dùng"
                value={1128}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng Sản Phẩm"
                value={234}
                prefix={<ShoppingOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng Đơn Hàng"
                value={567}
                prefix={<ShoppingCartOutlined />}
                valueStyle={{ color: "#fa8c16" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Doanh Thu"
                value={93280000}
                prefix={<DollarOutlined />}
                valueStyle={{ color: "#cf1322" }}
                formatter={(value) =>
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(value)
                }
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]} style={{ marginTop: "30px" }}>
          <Col span={24}>
            <Card title="Thống Kê Nhanh">
              <p style={{ fontSize: "16px", color: "#666" }}>
                Chào mừng đến trang quản trị. Sử dụng menu bên trái để quản lý
                hệ thống.
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
