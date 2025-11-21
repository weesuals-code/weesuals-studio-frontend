import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminDashboard.scss";

function VerifiedUsers({ admin, onLogout }) {
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchVerifiedUsers();
  }, []);

  const fetchVerifiedUsers = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/admin/verified-users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        // Transform the data to match the structure we expect
        const users = Object.entries(result).map(([phone, userData]) => ({
          phoneNumber: phone,
          ...userData,
          // Convert timestamp strings to Date objects if needed
          lastActive: userData.lastActive?.toDate ? userData.lastActive.toDate() : new Date(userData.lastActive),
          lastUpdated: userData.lastUpdated?.toDate ? userData.lastUpdated.toDate() : new Date(userData.lastUpdated),
          verifiedAt: userData.verifiedAt?.toDate ? userData.verifiedAt.toDate() : new Date(userData.verifiedAt),
          requestedAt: userData.requestedAt ? new Date(userData.requestedAt) : null
        }));
        setVerifiedUsers(users);
      } else {
        setError("Failed to fetch verified users");
      }
    } catch (error) {
      console.error("Error fetching verified users:", error);
      setError("Network error while fetching verified users");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    if (timestamp._seconds) {
      return new Date(timestamp._seconds * 1000).toLocaleString("ro-RO");
    }
    return new Date(timestamp).toLocaleString("ro-RO");
  };

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('ro-RO', { 
      style: 'currency', 
      currency: 'RON',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="admin-dashboard">
        <div className="admin-header">
          <div className="admin-header-content">
            <div className="admin-info">
              <h1>Panou de Administrare</h1>
              <p>Autentificat ca: <strong>{admin?.email}</strong></p>
            </div>
            <div className="admin-actions">
              <button 
                className="admin-button secondary"
                onClick={() => navigate("/admin/dashboard")}
              >
                Dashboard
              </button>
              <button
                className="admin-button secondary"
                onClick={() => navigate("/admin/users")}
              >
                Gestionează Utilizatori
              </button>
              <button 
                className="admin-button danger" 
                onClick={onLogout}
              >
                Deconectare
              </button>
            </div>
          </div>
        </div>
        <div className="admin-content">
          <div className="loading">
            <div className="spinner"></div>
            <p>Se încarcă utilizatorii...</p>
          </div>
        </div>
      </div>
    );
  }

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
              onClick={() => navigate("/admin/dashboard")}
            > 
              Dashboard
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
            <h2>Lista Utilizatori Verificați</h2>
          </div>

          {error && (
            <div className="response-note error">
              {error}
              <button onClick={() => setError("")}>×</button>
            </div>
          )}

          {verifiedUsers.length === 0 && !isLoading ? (
            <div className="empty-state">
              <p>Nu s-au găsit utilizatori verificați</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Număr Telefon</th>
                    <th>Cost Anunț</th>
                    <th>Management Anunțuri</th>
                    <th>Cost Postare</th>
                    <th>Postări/Săptămână</th>
                    <th>Cost Video</th>
                    <th>Video-uri/Săptămână</th>
                    <th>Preț Total</th>
                    <th>Data Cererii</th>
                  </tr>
                </thead>
                <tbody>
                  {verifiedUsers.length > 0 ? (
                    verifiedUsers.map((user, index) => (
                      <tr key={user.phoneNumber || index}>
                        <td><a style={{color:"#f38a1e"}} href={`tel:${user.phoneNumber}`}>{user.phoneNumber || 'N/A'}</a></td>
                        <td>{formatCurrency(user.adCost)}</td>
                        <td>{user.includeAdManagement ? 'Da' : 'Nu'}</td>
                        <td>{formatCurrency(user.postCost)}</td>
                        <td>{user.postsPerWeek || '0'}</td>
                        <td>{formatCurrency(user.videoCost)}</td>
                        <td>{user.videosPerWeek || '0'}</td>
                        <td>{formatCurrency(user.totalPrice)}</td>
                        <td>{formatDate(user.requestedAt)}</td>
                      </tr>
                    ))
                  ) : null}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifiedUsers;