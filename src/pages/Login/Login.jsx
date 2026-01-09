import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Quick login function for testing
  const quickLogin = (userType = "admin") => {
    if (userType === "admin") {
      setEmail("admin@mindpower.com");
      setPassword("admin123");
    } else {
      setEmail("user@mindpower.com");
      setPassword("user123");
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const result = login(email, password);
      
      if (result.success) {
        // Redirect to dashboard (root path) after successful login
        navigate("/");
      } else {
        setError(result.error || "Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">🚗</div>
            <h1>Mind Power Solutions</h1>
            <p className="login-subtitle">Car Rental Management System</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoComplete="email"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            <button 
              type="submit" 
              className="login-button" 
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="login-footer">
            <div className="default-credentials">
              <p className="credentials-title">🔐 Default Login Credentials</p>
              <div className="credentials-list">
                <div className="credential-item">
                  <span className="credential-label">👤 Admin Account:</span>
                  <div className="credential-details">
                    <span className="credential-email">admin@mindpower.com</span>
                    <span className="credential-separator">/</span>
                    <span className="credential-password">admin123</span>
                  </div>
                  <button 
                    type="button"
                    className="quick-login-btn"
                    onClick={() => quickLogin("admin")}
                    disabled={loading}
                  >
                    Use This
                  </button>
                </div>
                <div className="credential-item">
                  <span className="credential-label">👤 User Account:</span>
                  <div className="credential-details">
                    <span className="credential-email">user@mindpower.com</span>
                    <span className="credential-separator">/</span>
                    <span className="credential-password">user123</span>
                  </div>
                  <button 
                    type="button"
                    className="quick-login-btn"
                    onClick={() => quickLogin("user")}
                    disabled={loading}
                  >
                    Use This
                  </button>
                </div>
              </div>
              <p className="credentials-note">Click "Use This" to auto-fill credentials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
