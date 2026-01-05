import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(res.data);
      } catch (err) {
        setError("Không thể tải danh sách người dùng ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="status loading">Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p className="status error">{error}</p>;
  }

  return (
    <div className="container">
      <h2>Danh sách người dùng</h2>

      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>📧 {user.email}</p>
            <p>📞 {user.phone}</p>
            <p>🏙 {user.address.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
