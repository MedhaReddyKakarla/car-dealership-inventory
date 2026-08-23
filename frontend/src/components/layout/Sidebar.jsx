import {
  BarChart3,
  CarFront,
  ChevronRight,
  Grid2X2,
  LogOut,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { logout } from "../../services/api";

function Sidebar({
  activePage,
  isAdmin,
  mobileOpen,
  onClose,
}) {
  const navigate = useNavigate();

  function goTo(path) {
    navigate(path);

    if (onClose) {
      onClose();
    }
  }

  const navigation = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Grid2X2,
      path: "/",
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: CarFront,
      path: "/inventory",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar ${
          mobileOpen
            ? "sidebar-mobile-open"
            : ""
        }`}
      >

        <div className="sidebar-brand">

          <div className="brand-icon">
            <CarFront size={25} />
          </div>

          <div className="brand-text">
            <strong>
              VeyraDrive
            </strong>

            <span>
              DEALERSHIP INTELLIGENCE
            </span>
          </div>

          <button
            type="button"
            className="mobile-close-button"
            onClick={onClose}
          >
            <X size={19} />
          </button>

        </div>

        <div className="sidebar-section-title">
          WORKSPACE
        </div>

        <nav className="sidebar-nav">

          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              activePage === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar-nav-item ${
                  active
                    ? "sidebar-nav-item-active"
                    : ""
                }`}
                onClick={() =>
                  goTo(item.path)
                }
              >
                <Icon size={20} />

                <span>
                  {item.label}
                </span>

                {active && (
                  <ChevronRight
                    size={16}
                    className="nav-active-arrow"
                  />
                )}
              </button>
            );
          })}

        </nav>

        <div className="sidebar-bottom">

          {isAdmin && (
            <div className="admin-badge">
              <span className="admin-dot" />

              Administrator
            </div>
          )}

          <button
            type="button"
            className="sidebar-logout"
            onClick={logout}
          >
            <LogOut size={19} />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;