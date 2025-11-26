import { notification, Table } from "antd";
import { useEffect, useState, useContext } from "react";
import { getUserApi } from "../util/api";
import { AuthContext } from "../components/context/auth.context";

const UserPage = () => {
  const { auth } = useContext(AuthContext);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserApi();
      if (!res?.message) {
        setDataSource(res);
      } else {
        notification.error({
          message: "Unauthorized",
          description: res.message,
        });
      }
    };
    fetchUser();
  }, []);

  if (auth.user.role !== "admin") {
    return (
      <div style={{ padding: 30 }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "role",
      dataIndex: "role",
    },
  ];

  return (
    <div style={{ padding: 30 }}>
      <Table bordered dataSource={dataSource} columns={columns} rowKey="_id" />
    </div>
  );
};

export default UserPage;
