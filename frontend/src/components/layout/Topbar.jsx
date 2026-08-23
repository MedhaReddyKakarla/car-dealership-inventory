import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  Check,
  ChevronDown,
  LogOut,
  Search,
  Settings,
  UserCircle,
  X,
} from "lucide-react";

import { logout } from "../../services/api";

function Topbar({ user, onMenuClick }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] =
    useState(false);
  const [showProfile, setShowProfile] =
    useState(false);

  const searchRef = useRef(null);

  // ---------------------------------------------------------
  // Search
  // ---------------------------------------------------------

  function handleSearch(event) {
    event.preventDefault();

    const value = search.trim();

    if (!value) {
      return;
    }

    setShowProfile(false);
    setShowNotifications(false);

    navigate(
      `/inventory?search=${encodeURIComponent(value)}`,
    );
  }

  function clearSearch() {
    setSearch("");
    searchRef.current?.focus();
  }

  // ---------------------------------------------------------
  // Profile / Settings
  // ---------------------------------------------------------

  function openProfile() {
    setShowProfile(false);
    setShowNotifications(false);

    navigate("/profile");
  }

  function openSettings() {
    setShowProfile(false);
    setShowNotifications(false);

    navigate("/settings");
  }

  // ---------------------------------------------------------
  // Keyboard shortcuts
  // ---------------------------------------------------------

  useEffect(() => {
    function handleKeyboard(event) {
      // Ctrl + K / Cmd + K
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        searchRef.current?.focus();
      }

      // Escape
      if (event.key === "Escape") {
        setShowNotifications(false);
        setShowProfile(false);
        searchRef.current?.blur();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyboard,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard,
      );
    };
  }, []);

  // ---------------------------------------------------------
  // Dropdown controls
  // ---------------------------------------------------------

  function toggleNotifications() {
    setShowNotifications((value) => !value);
    setShowProfile(false);
  }

  function toggleProfile() {
    setShowProfile((value) => !value);
    setShowNotifications(false);
  }

  // ---------------------------------------------------------
  // User information
  // ---------------------------------------------------------

  const displayName = user?.name || "User";

  const initial =
    displayName.trim().charAt(0).toUpperCase() ||
    "U";

  const role = user?.is_admin
    ? "Administrator"
    : "Inventory Manager";

  const email =
    user?.email || "Inventory Manager";

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------

  return (
    <header className="topbar">
      {/* =====================================================
          LEFT SIDE
          ===================================================== */}

      <div className="topbar-left">
        {onMenuClick && (
          <button
            type="button"
            className="mobile-menu-button"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        )}

        {/* Search */}
        <form
          className={`topbar-search ${
            search ? "has-value" : ""
          }`}
          onSubmit={handleSearch}
        >
          <Search size={21} />

          <input
            ref={searchRef}
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search your inventory..."
            aria-label="Search your inventory"
          />

          {/* Clear search */}
          {search && (
            <button
              type="button"
              className="search-clear"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}

          {/* Keyboard shortcut */}
          {!search && <kbd>Ctrl K</kbd>}
        </form>
      </div>

      {/* =====================================================
          RIGHT SIDE
          ===================================================== */}

      <div className="topbar-actions">

        {/* ===================================================
            NOTIFICATIONS
            =================================================== */}

        <div className="topbar-dropdown-wrapper">
          <button
            type="button"
            className={`topbar-icon-button ${
              showNotifications ? "active" : ""
            }`}
            onClick={toggleNotifications}
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <Bell size={21} />

            <span className="notification-dot" />
          </button>

          {showNotifications && (
            <div className="topbar-dropdown notification-dropdown">
              <div className="dropdown-header">
                <div>
                  <strong>
                    Notifications
                  </strong>

                  <span>
                    Stay updated
                  </span>
                </div>

                <div className="notification-status">
                  <Check size={14} />
                </div>
              </div>

              <div className="notification-empty">
                <div className="notification-empty-icon">
                  <Bell size={22} />
                </div>

                <strong>
                  You're all caught up
                </strong>

                <span>
                  No new inventory alerts
                  right now.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ===================================================
            USER PROFILE
            =================================================== */}

        <div className="topbar-dropdown-wrapper">
          <button
            type="button"
            className={`profile-trigger ${
              showProfile ? "active" : ""
            }`}
            onClick={toggleProfile}
            aria-label="Open user menu"
            aria-expanded={showProfile}
          >
            <div className="profile-avatar">
              {initial}
            </div>

            <div className="profile-info">
              <strong>
                {displayName}
              </strong>

              <span>
                {role}
              </span>
            </div>

            <ChevronDown
              size={16}
              className={`profile-chevron ${
                showProfile ? "rotated" : ""
              }`}
            />
          </button>

          {/* =================================================
              USER DROPDOWN
              ================================================= */}

          {showProfile && (
            <div className="topbar-dropdown profile-dropdown">

              {/* User summary */}
              <div className="profile-dropdown-user">
                <div className="large-profile-avatar">
                  {initial}
                </div>

                <div>
                  <strong>
                    {displayName}
                  </strong>

                  <span>
                    {email}
                  </span>
                </div>
              </div>

              <div className="dropdown-divider" />

              {/* My Profile */}
              <button
                type="button"
                className="dropdown-action"
                onClick={openProfile}
              >
                <UserCircle size={18} />

                <span>
                  My profile
                </span>
              </button>

              {/* Settings */}
              <button
                type="button"
                className="dropdown-action"
                onClick={openSettings}
              >
                <Settings size={18} />

                <span>
                  Settings
                </span>
              </button>

              <div className="dropdown-divider" />

              {/* Logout */}
              <button
                type="button"
                className="dropdown-action logout-action"
                onClick={logout}
              >
                <LogOut size={18} />

                <span>
                  Logout
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;