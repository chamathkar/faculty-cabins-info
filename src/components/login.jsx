import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import GoogleSignIn from './googlesignin';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.warn("Please enter both email and password.", { position: "top-center" });
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      toast.success("Login Successful! Redirecting...", { position: "top-center" });
      window.location.href = "https://faculty-cabin-info-d25o.vercel.app/";
    } catch (err) {
      console.error("Login error:", err);
      let errorMsg = "Failed to log in. Please check your credentials.";
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        errorMsg = "Invalid email or password.";
      } else if (err.code === "auth/too-many-requests") {
        errorMsg = "Too many failed attempts. Please try again later.";
      } else if (err.code === "auth/invalid-email") {
        errorMsg = "Invalid email address.";
      } else if (err.message) {
        errorMsg = err.message;
      }
      toast.error(errorMsg, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} noValidate>
        <h3>Login</h3>

        <div className="mb-3">
          <label htmlFor="login-email">Email Address</label>
          <input
            id="login-email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            autoComplete="email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="login-password">Password</label>
          <div className="input-group">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
            </button>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Signing in..." : "Submit"}
          </button>
        </div>

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          New user?{" "}
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              background: "linear-gradient(90deg, #794AEE 0%, #775FF1 50%, #7272F2 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Register here
          </Link>
        </p>

        <GoogleSignIn />
      </form>
    </div>
  );
}

export default Login;
