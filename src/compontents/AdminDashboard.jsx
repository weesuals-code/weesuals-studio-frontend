import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "../AdminDashboard.scss";

function AdminDashboard({ admin, onLogout }) {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Connect to Socket.io for live updates
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to backend server");
    });

    socket.on("admin-notification", (notification) => {
      console.log("Received admin notification:", notification);

      if (notification.type === "new-contact") {
        setContacts((prev) => [notification.data, ...prev]);
      } else if (notification.type === "contact-deleted") {
        setContacts((prev) =>
          prev.filter((contact) => contact.id !== notification.data.id)
        );
      } else if (notification.type === "new-admin-user") {
        console.log("New admin user created:", notification.data);
      } else if (notification.type === "admin-user-deleted") {
        console.log("Admin user deleted:", notification.data);
      }
    });

    socket.emit("admin-login", { id: admin.id, email: admin.email });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [admin]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/contacts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setContacts(result.contacts);
      } else {
        setError("Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this contact submission?"
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/contacts/${contactId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setContacts((prev) =>
          prev.filter((contact) => contact.id !== contactId)
        );
      } else {
        setError("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
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
            <h1>Panou de Administrare</h1>
            <p>Autentificat ca: <strong>{admin.email}</strong></p>
          </div>
          <div className="admin-actions"><button
              className="admin-button secondary"
              onClick={() => navigate("/admin/verified-users")}
            >
              Utilizatori Verificati
            </button>
            <button
              className="admin-button secondary"
              onClick={() => navigate("/admin/users")}
            >
              Gestionează Utilizatori
            </button>
            <button className="admin-button danger" onClick={onLogout}>
              Deconectare
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="contacts-section">
          <div className="section-header">
            <h2>Contact Submissions</h2>
          </div>

          {error && (
            <div className="response-note error">
              {error}
              <button onClick={() => setError("")}>×</button>
            </div>
          )}

          {isLoading ? (
            <div className="loading">Loading contacts...</div>
          ) : contacts.length === 0 ? (
            <div className="empty-state">
              <p>No contact submissions yet.</p>
            </div>
          ) : (
            <div className="contacts-grid">
              {contacts.map((contact) => (
                <div key={contact.id} className="contact-card">
                  <div className="contact-header">
                    <div className="contact-info">
                      <h3>{contact.name}</h3>
                      <a
                        href={`mailto: ${contact.email}`}
                        className="contact-email"
                      >
                        {contact.email}
                      </a>
                      <p className="contact-date">
                        {formatDate(contact.timestamp)}
                      </p>
                    </div>
                    <div className="contact-actions">
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteContact(contact.id)}
                        title="Delete contact"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  <div className="contact-details">
                    <div className="detail-item">
                      <strong>Service:</strong> {contact.service}
                    </div>
                    <div className="detail-item">
                      <strong>Budget:</strong> {contact.budget}
                    </div>
                    <div className="detail-item">
                      <strong>Description:</strong>
                      <p className="description">{contact.description}</p>
                    </div>
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

export default AdminDashboard;



/**
 * 
 * 1.2 grosime
 */