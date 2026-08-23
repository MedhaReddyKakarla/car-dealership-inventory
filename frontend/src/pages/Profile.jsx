import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function Profile() {
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("user") || "null",
    );
  } catch {
    user = null;
  }

  const name = user?.name || "User";
  const email = user?.email || "Not available";

  const initial =
    name.trim().charAt(0).toUpperCase() || "U";

  const role = user?.is_admin
    ? "Administrator"
    : "Inventory Manager";

  return (
    <div className="app-shell">
      <Sidebar
        activePage=""
        isAdmin={Boolean(user?.is_admin)}
        mobileOpen={mobileSidebarOpen}
        onClose={() =>
          setMobileSidebarOpen(false)
        }
      />

      <main className="main-content">
        <Topbar
          user={user}
          onMenuClick={() =>
            setMobileSidebarOpen(true)
          }
        />

        <div className="dashboard-content">
          <div className="simple-page-header">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </button>

            <span className="eyebrow">
              ACCOUNT
            </span>

            <h1>My Profile</h1>

            <p>
              View your dealership account
              information.
            </p>
          </div>

          <div className="profile-page-card">
            <div className="profile-page-hero">
              <div className="profile-page-avatar">
                {initial}
              </div>

              <div>
                <h2>{name}</h2>

                <p>{role}</p>
              </div>
            </div>

            <div className="profile-details">
              <div className="profile-detail">
                <div className="detail-icon">
                  <UserCircle size={20} />
                </div>

                <div>
                  <span>Full name</span>
                  <strong>{name}</strong>
                </div>
              </div>

              <div className="profile-detail">
                <div className="detail-icon">
                  <Mail size={20} />
                </div>

                <div>
                  <span>Email address</span>
                  <strong>{email}</strong>
                </div>
              </div>

              <div className="profile-detail">
                <div className="detail-icon">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <span>Account role</span>
                  <strong>{role}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;