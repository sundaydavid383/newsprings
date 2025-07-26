import React, { useEffect, useState } from "react";
import axios from "axios";
import "./connectedUsersList.css";

const ConnectedUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConnectedUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}api/connected-visitors`);
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch connected users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchConnectedUsers();
  }, []);

  if (loading) return (
       <div className="EasterLoader">
  <div className="visualizer">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>
    )
  if (error) return (
        <div className="alert_holder">
            <div className="alert">
                <p>{error}</p>
                <div onClick={() => setError(false)} className="btn">
                    <p>OK</p>
                </div>
            </div>
        </div>
    );
  if (users.length === 0) return <p>No one has filled the connect form yet.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Connected Users</h2>
      <ul>
        {users.map((user, i) => (
          <li key={i} style={{ marginBottom: "1rem" }}>
            <strong>{user.fullname}</strong> <br />
            📧 {user.email} <br />
            📱 {user.phone} <br />
            📅 Service Date: {new Date(user.serviceDate).toLocaleDateString()} <br />
            👥 Guests: {user.guests} <br />
            📞 Contact Method: {user.contactMethod}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConnectedUsersList;