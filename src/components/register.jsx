import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fname.trim()) {
      toast.warn("Please enter your first name.", { position: "top-center" });
      return;
    }
    if (!email.trim()) {
      toast.warn("Please enter your email.", { position: "top-center" });
      return;
    }
    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters.", { position: "top-center" });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          fname: fname.trim(),
          lname: lname.trim(),
          email: email.trim(),
          uid: user.uid,
          createdAt: new Date().toISOString()
        });
      }

      toast.success("Registered Successfully! Redirecting...", { position: "top-center" });
      window.location.href = "https://faculty-cabin-info-d25o.vercel.app/";
    } catch (err) {
      console.error("Registration error:", err);
      let errorMsg = "Registration failed. Please try again.";
      if (err.code === "auth/email-already-in-use") {
        errorMsg = "This email is already registered. Please login.";
      } else if (err.code === "auth/invalid-email") {
        errorMsg = "Invalid email format.";
      } else if (err.code === "auth/weak-password") {
        errorMsg = "Password is too weak. Must be at least 6 characters.";
      } else if (err.message) {
        errorMsg = err.message;
      }
      toast.error(errorMsg, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} noValidate>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label htmlFor="reg-fname">First Name</label>
          <input
            id="reg-fname"
            type="text"
            className="form-control"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reg-lname">Last Name</label>
          <input
            id="reg-lname"
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reg-email">Email Address</label>
          <input
            id="reg-email"
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
          <label htmlFor="reg-password">Password</label>
          <div className="input-group">
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="new-password"
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

        <div className="mb-3">
          <label htmlFor="reg-confirm-password">Confirm Password</label>
          <div className="input-group">
            <input
              id="reg-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              <i className={showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
            </button>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </div>

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            to="/login"
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
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
