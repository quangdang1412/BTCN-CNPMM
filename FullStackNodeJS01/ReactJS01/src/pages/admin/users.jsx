import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from "../../util/api";

const AdminUsersPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUserApi();
      if (!res?.message) {
        setDataSource(res);
      } else {
        notification.error({
          message: "Lỗi",
          description: res.message,
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể tải danh sách người dùng",
      });
    }
    setLoading(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <div style={{ padding: "40px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{ marginBottom: "30px", fontSize: "28px", fontWeight: "bold" }}
        >
          Quản Lý Người Dùng
        </h1>
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} người dùng`,
          }}
        />
      </div>
    </div>
  );
};

export default AdminUsersPage;
