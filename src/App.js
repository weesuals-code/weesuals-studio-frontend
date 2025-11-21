import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./style.scss";
import Navbar from "./compontents/Navbar";
import Home from "./compontents/Home";
import Work from "./compontents/Work";
import Services from "./compontents/Services";
import How from "./compontents/How";
import Why from "./compontents/Why";
import Testimonials from "./compontents/Testimonials";
import Pricing from "./compontents/Pricing";
import FAQ from "./compontents/FAQ";
import Form from "./compontents/Form";
import Footer from "./compontents/Footer";
import AdminLogin from "./compontents/AdminLogin";
import AdminDashboard from "./compontents/AdminDashboard";
import AdminUsers from "./compontents/AdminUsers";
import VerifiedUsers from "./compontents/VerifiedUsers";
import PricingForm from "./compontents/PricingForm";
import PriceOffer from "./pages/PriceOffer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      const adminData = localStorage.getItem('adminData');

      if (token && adminData) {
        try {
          setAdmin(JSON.parse(adminData));
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminData');
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (adminData, token) => {
    setAdmin(adminData);
    setIsAuthenticated(true);
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminData', JSON.stringify(adminData));
  };

  const handleLogout = () => {
    setAdmin(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <PricingForm/>
                <Work />
                <Services />
                <Why />
                <How />
                <Form />
                <Footer />
              </>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/login"
            element={
              isLoading ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  color: '#074440',
                  fontSize: '18px',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      border: '4px solid #e9ecef',
                      borderTop: '4px solid #f38a1e',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      margin: '0 auto 15px'
                    }}></div>
                    <div>Loading...</div>
                  </div>
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              ) : isAuthenticated ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <AdminLogin onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              isLoading ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  color: '#074440',
                  fontSize: '18px',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      border: '4px solid #e9ecef',
                      borderTop: '4px solid #f38a1e',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      margin: '0 auto 15px'
                    }}></div>
                    <div>Loading...</div>
                  </div>
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              ) : isAuthenticated ? (
                <AdminDashboard admin={admin} onLogout={handleLogout} />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />

          <Route
            path="/admin/users"
            element={
              isLoading ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  color: '#074440',
                  fontSize: '18px',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      border: '4px solid #e9ecef',
                      borderTop: '4px solid #f38a1e',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      margin: '0 auto 15px'
                    }}></div>
                    <div>Loading...</div>
                  </div>
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              ) : isAuthenticated ? (
                <AdminUsers admin={admin} onLogout={handleLogout} />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />

          <Route
            path="/admin/verified-users"
            element={
              isLoading ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  color: '#074440',
                  fontSize: '18px',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      border: '4px solid #e9ecef',
                      borderTop: '4px solid #f38a1e',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      margin: '0 auto 15px'
                    }}></div>
                    <div>Loading...</div>
                  </div>
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              ) : isAuthenticated ? (
                <VerifiedUsers admin={admin} onLogout={handleLogout} />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
          
          {/* Price Offer Route */}
          <Route 
            path="/price-offer/:token" 
            element={
              <>
                <Navbar />
                <PriceOffer />
                <Footer />
              </>
            } 
          />

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
