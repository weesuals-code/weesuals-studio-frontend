import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminDashboard.scss";

// Price configuration - must match backend
const videoPricing = {
  1: 1500,
  2: 2200,
  3: 3000,
  4: 4000,
  5: 4600,
  6: 5000,
  7: 5400
};

const postPricing = {
  1: 500,
  2: 900,
  3: 1200,
  4: 1400,
  5: 1600,
  6: 1800,
  7: 2000
};

const AD_MANAGEMENT_PRICE = 600;

// Calculate price function - matches backend logic
const calculatePrice = (videosPerWeek, postsPerWeek, includeAdManagement) => {
  const videoCost = videoPricing[videosPerWeek] || 0;
  const postCost = postPricing[postsPerWeek] || 0;
  const basePrice = videoCost + postCost;
  
  // Ad management is free if base price is 4000 RON or more
  const adCost = includeAdManagement ? (basePrice >= 4000 ? 0 : AD_MANAGEMENT_PRICE) : 0;
  const totalPrice = basePrice + adCost;
  
  return {
    videoCost,
    postCost,
    basePrice,
    adCost,
    totalPrice
  };
};

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

  const formatDate = (date) => {
    if (!date) return 'N/A';
    
    // Handle Firestore timestamp
    if (date.seconds) {
      return new Date(date.seconds * 1000).toLocaleString('ro-RO');
    }
    
    // Handle Firestore timestamp with _seconds (legacy format)
    if (date._seconds) {
      return new Date(date._seconds * 1000).toLocaleString('ro-RO');
    }
    
    // Handle Date object or ISO string
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? 'N/A' : parsedDate.toLocaleString('ro-RO');
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
                    <th>Videoclipuri/săptămână</th>
                    <th>Postări/săptămână</th>
                    <th>Management Anunțuri</th>
                    <th>Preț Total</th>
                    <th>Data Cererii</th>
                  </tr>
                </thead>
                <tbody>
                  {verifiedUsers.length > 0 ? (
                    verifiedUsers.map((user, index) => (
                      <tr key={user.phoneNumber || index}>
                        <td><a style={{color:"#f38a1e"}} href={`tel:${user.phoneNumber}`}>{user.phoneNumber || 'N/A'}</a></td>
                        <td>{user.videosPerWeek || 'N/A'}</td>
                        <td>{user.postsPerWeek || 'N/A'}</td>
                        <td>{user.includeAdManagement ? 'Da' : 'Nu'}</td>
                        <td>{
                          user.videosPerWeek && user.postsPerWeek ? 
                          calculatePrice(
                            user.videosPerWeek, 
                            user.postsPerWeek, 
                            user.includeAdManagement
                          ).totalPrice + ' RON' : 'N/A' 
                        }</td>
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