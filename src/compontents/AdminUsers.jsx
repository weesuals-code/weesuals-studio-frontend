import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "../AdminUsers.scss";

function AdminUsers({ admin, onLogout }) {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Connect to Socket.io for live updates
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to backend server");
    });

    socket.on("admin-notification", (notification) => {
      console.log("Received admin notification:", notification);

      if (notification.type === "new-admin-user") {
        setAdmins((prev) => [...prev, notification.data]);
      } else if (notification.type === "admin-user-deleted") {
        setAdmins((prev) =>
          prev.filter((adminUser) => adminUser.id !== notification.data.id)
        );
      } else if (notification.type === "new-contact") {
        console.log("New contact received:", notification.data);
      } else if (notification.type === "contact-deleted") {
        console.log("Contact deleted:", notification.data);
      }
    });

    socket.emit("admin-login", { id: admin.id, email: admin.email });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [admin]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setAdmins(result.admins);
      } else {
        setError("Failed to fetch admin users");
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();

    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      setError("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/admin/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newAdmin),
        }
      );

      if (response.ok) {
        setNewAdmin({ name: "", email: "", password: "" });
        setShowAddForm(false);
        fetchAdmins(); // Refresh the list
      } else {
        const result = await response.json();
        setError(result.error || "Failed to add admin user");
      }
    } catch (error) {
      console.error("Error adding admin:", error);
      setError("Network error");
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this admin user? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/admin/users/${adminId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setAdmins((prev) => prev.filter((a) => a.id !== adminId));
      } else {
        setError("Failed to delete admin user");
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      setError("Network error");
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    if (
      new Date(
        timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6
      ).toLocaleString("ro-RO") === "Invalid Date"
    )
      return "Acum";
    return new Date(
      timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6
    ).toLocaleString("ro-RO");
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-info">
            <h1>Admin Users</h1>
            <p>Manage admin user accounts</p>
          </div>
          <div className="admin-actions">
            <button
              className="admin-button secondary"
              onClick={() => navigate("/admin/dashboard")}
            >
              Dashboard
            </button>
            <button className="admin-button danger" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="users-section">
          <div className="section-header">
            <h2>Admin Users</h2>
            <button
              className="admin-button primary"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? "Cancel" : "Add User"}
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
              <button onClick={() => setError("")}>×</button>
            </div>
          )}

          {showAddForm && (
            <div className="add-admin-form">
              <div className="contact-header">
                <div className="section-tag">
                  <div className="section-tag-inner">
                    <div className="dot" />
                    <p>New Admin</p>
                  </div>
                </div>
                <h3 className="contact-title">Create Admin User</h3>
              </div>

              <form className="contact-form" onSubmit={handleAddAdmin}>
                <div className="form-grid">
                  <label className="form-label">
                    <p className="label-text">Full Name</p>
                    <div className="form-input">
                      <input
                        type="text"
                        value={newAdmin.name}
                        onChange={(e) =>
                          setNewAdmin((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        required
                        placeholder="Administrator Name"
                      />
                    </div>
                  </label>

                  <label className="form-label">
                    <p className="label-text">Email Address</p>
                    <div className="form-input">
                      <input
                        type="email"
                        value={newAdmin.email}
                        onChange={(e) =>
                          setNewAdmin((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        required
                        placeholder="admin@yourdomain.com"
                      />
                    </div>
                  </label>
                </div>

                <label className="form-label long">
                  <p className="label-text">Password</p>
                  <div className="form-input">
                    <input
                      type="password"
                      value={newAdmin.password}
                      onChange={(e) =>
                        setNewAdmin((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      required
                      placeholder="Secure password"
                    />
                  </div>
                </label>

                {error && <div className="response-note error">{error}</div>}

                <div className="form-button-wrapper">
                  <button type="submit" className="submit-button">
                    <p>Create Admin User</p>
                  </button>
                  <button
                    type="button"
                    className="admin-button secondary"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {isLoading ? (
            <div className="loading">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "4px solid rgba(255, 255, 255, 0.1)",
                  borderTop: "4px solid #f38a1e",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 15px",
                }}
              ></div>
              <p>Loading admin users...</p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : admins.length === 0 ? (
            <div className="empty-state">
              <p>No admin users found.</p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#b8b8b8",
                  marginTop: "10px",
                }}
              >
                Click "Add User" to create your first admin account.
              </p>
            </div>
          ) : (
            <div className="admins-grid">
              {admins.map((adminUser) => (
                <div key={adminUser.id} className="admin-card">
                  <div className="admin-info">
                    <h3>{adminUser.name}</h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <p className="admin-email">{adminUser.email}</p>
                    </div>
                    <div style={{ marginBottom: "12px" }}>
                      <p className="admin-uid">UID: {adminUser.id}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "12px",
                      }}
                    >
                      <p className="admin-date">
                        Created: {formatDate(adminUser.createdAt)}
                      </p>
                    </div>
                    {adminUser.role && (
                      <span className="admin-role">{adminUser.role}</span>
                    )}
                  </div>
                  <div className="admin-actions">
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteAdmin(adminUser.id)}
                      title="Delete admin user"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
