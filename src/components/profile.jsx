import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./profile.css";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          // If no doc in Firestore, fall back to Auth provider data
          setUserData({
            fname: currentUser.displayName?.split(" ")[0] || "User",
            lname: currentUser.displayName?.split(" ").slice(1).join(" ") || "",
            email: currentUser.email,
            photoURL: currentUser.photoURL,
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!", { position: "top-center" });
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to log out. Please try again.", { position: "top-center" });
    }
  };

  const currentUser = auth.currentUser;

  if (loading) {
    return (
      <div className="profile-card">
        <p style={{ margin: 0, fontWeight: 500, color: "#666" }}>Loading profile...</p>
      </div>
    );
  }

  const fullName = userData?.fname
    ? `${userData.fname} ${userData.lname || ""}`.trim()
    : currentUser?.displayName || "Welcome!";

  const initials = userData?.fname
    ? userData.fname[0]?.toUpperCase()
    : currentUser?.email
    ? currentUser.email[0]?.toUpperCase()
    : "U";

  return (
    <div className="profile-card">
      <div className="profile-avatar-wrapper">
        {currentUser?.photoURL || userData?.photoURL ? (
          <img
            src={currentUser?.photoURL || userData?.photoURL}
            alt="Profile Avatar"
            className="profile-avatar"
          />
        ) : (
          <div className="profile-avatar-placeholder">{initials}</div>
        )}
      </div>

      <h2 className="profile-title">{fullName}</h2>
      <p className="profile-email">{currentUser?.email || userData?.email || "No email"}</p>

      <div className="profile-details-list">
        <div className="profile-detail-item">
          <span className="profile-detail-label">First Name</span>
          <span className="profile-detail-value">{userData?.fname || "N/A"}</span>
        </div>
        <div className="profile-detail-item">
          <span className="profile-detail-label">Last Name</span>
          <span className="profile-detail-value">{userData?.lname || "N/A"}</span>
        </div>
        <div className="profile-detail-item">
          <span className="profile-detail-label">UID</span>
          <span
            className="profile-detail-value"
            style={{ fontSize: "0.8rem", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
            title={currentUser?.uid}
          >
            {currentUser?.uid || "N/A"}
          </span>
        </div>
      </div>

      <button type="button" className="btn-logout" onClick={handleLogout}>
        <i className="bi bi-box-arrow-right"></i> Sign Out
      </button>
    </div>
  );
}

export default Profile;
