import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  Moon,
  Settings as SettingsIcon,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function Settings() {
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
              PREFERENCES
            </span>

            <h1>Settings</h1>

            <p>
              Manage your VeyraDrive preferences.
            </p>
          </div>

          <div className="settings-card">
            <div className="settings-card-header">
              <div className="settings-main-icon">
                <SettingsIcon size={23} />
              </div>

              <div>
                <h2>Application settings</h2>

                <p>
                  Simple preferences for your
                  dealership workspace.
                </p>
              </div>
            </div>

            <div className="settings-list">
              <div className="settings-row">
                <div className="settings-row-icon">
                  <Bell size={20} />
                </div>

                <div className="settings-row-content">
                  <strong>Notifications</strong>

                  <span>
                    Receive inventory alerts and
                    important updates.
                  </span>
                </div>

                <span className="settings-badge">
                  Enabled
                </span>
              </div>

              <div className="settings-row">
                <div className="settings-row-icon">
                  <ShieldCheck size={20} />
                </div>

                <div className="settings-row-content">
                  <strong>Account security</strong>

                  <span>
                    Your account is protected with
                    authenticated access.
                  </span>
                </div>

                <span className="settings-badge">
                  Secure
                </span>
              </div>

              <div className="settings-row">
                <div className="settings-row-icon">
                  <Moon size={20} />
                </div>

                <div className="settings-row-content">
                  <strong>Appearance</strong>

                  <span>
                    VeyraDrive currently uses its
                    default light workspace.
                  </span>
                </div>

                <span className="settings-badge">
                  Light
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
