import React, { useState } from "react";
import googleBtn from "../assets/google-signin-button.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function GoogleSignIn() {
  const [loading, setLoading] = useState(false);

  async function googleLogin() {
    if (loading) return;
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        // Parse display name
        const displayName = user.displayName || "";
        const parts = displayName.trim().split(" ");
        const fname = parts[0] || "User";
        const lname = parts.slice(1).join(" ") || "";

        // Sync user to Firestore
        await setDoc(
          doc(db, "users", user.uid),
          {
            fname,
            lname,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL || "",
          },
          { merge: true }
        );

        toast.success("Login successful! Redirecting...", { position: "top-center" });
        window.location.href = "https://faculty-cabin-info-d25o.vercel.app/";
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        toast.info("Google sign-in was cancelled.", { position: "top-center" });
      } else {
        toast.error(error.message || "Failed to sign in with Google", { position: "top-center" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ marginTop: "20px", marginBottom: "12px", textAlign: "center", fontWeight: "600", color: "#666" }}>
        --- or ---
      </p>
      <button
        type="button"
        style={{
          border: "none",
          background: "transparent",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.6 : 1,
          transition: "opacity 0.2s ease",
          padding: 0,
        }}
        onClick={googleLogin}
        disabled={loading}
      >
        <img
          src={googleBtn}
          alt="Google Sign In"
          style={{ width: "200px", height: "auto" }}
        />
      </button>
    </div>
  );
}

export default GoogleSignIn;
