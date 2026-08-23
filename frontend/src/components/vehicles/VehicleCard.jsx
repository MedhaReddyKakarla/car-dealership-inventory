import { useState } from "react";
import {
  CarFront,
  Edit3,
  MoreHorizontal,
  Package,
  Trash2,
} from "lucide-react";

function getVehicleImage(vehicle) {
  const make = String(vehicle?.make || "").toLowerCase();
  const model = String(vehicle?.model || "").toLowerCase();

  if (make.includes("bmw")) {
    return "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85";
  }

  if (make.includes("toyota")) {
    return "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=85";
  }

  if (make.includes("mercedes")) {
    return "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85";
  }

  if (make.includes("audi")) {
    return "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85";
  }

  if (make.includes("tesla")) {
    return "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=85";
  }

  if (model.includes("camry")) {
    return "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=85";
  }

  return null;
}

function VehicleCard({
  vehicle,
  onEdit,
  onDelete,
}) {
  const [showMenu, setShowMenu] = useState(false);

  const quantity = Number(vehicle?.quantity || 0);
  const price = Number(vehicle?.price || 0);

  const image = getVehicleImage(vehicle);

  let stockStatus = "In stock";
  let stockClass = "good";

  if (quantity === 0) {
    stockStatus = "Out of stock";
    stockClass = "out";
  } else if (quantity <= 2) {
    stockStatus = "Low stock";
    stockClass = "low";
  }

  function handleEdit() {
    setShowMenu(false);
    onEdit?.(vehicle);
  }

  function handleDelete() {
    setShowMenu(false);
    onDelete?.(vehicle);
  }

  return (
    <article className="premium-vehicle-card dashboard-vehicle-card">
      {/* =====================================================
          VEHICLE IMAGE
      ===================================================== */}

      <div className="vehicle-visual">
        {image ? (
          <img
            src={image}
            alt={`${vehicle.make} ${vehicle.model}`}
            loading="lazy"
          />
        ) : (
          <div className="vehicle-image-fallback">
            <CarFront size={58} strokeWidth={1.2} />
          </div>
        )}

        <div className="vehicle-visual-overlay" />

        <span className="vehicle-category-pill">
          {vehicle.category || "Vehicle"}
        </span>

        <div className="vehicle-visual-brand">
          <CarFront size={15} />
          <span>{vehicle.make}</span>
        </div>
      </div>

      {/* =====================================================
          CARD BODY
      ===================================================== */}

      <div className="vehicle-card-body">
        <div className="vehicle-card-heading">
          <div>
            <span className="vehicle-eyebrow">
              {vehicle.category || "Vehicle"}
            </span>

            <h3 title={`${vehicle.make} ${vehicle.model}`}>
              {vehicle.make} {vehicle.model}
            </h3>
          </div>

          {/* =================================================
              THREE DOT MENU
          ================================================= */}

          <div className="vehicle-menu-wrapper">
            <button
              type="button"
              className={`vehicle-menu-button ${
                showMenu ? "active" : ""
              }`}
              onClick={() =>
                setShowMenu((current) => !current)
              }
              aria-label={`Actions for ${vehicle.make} ${vehicle.model}`}
              aria-expanded={showMenu}
            >
              <MoreHorizontal size={20} />
            </button>

            {showMenu && (
              <div className="vehicle-action-menu">
                <button
                  type="button"
                  onClick={handleEdit}
                >
                  <Edit3 size={16} />
                  <span>Edit vehicle</span>
                </button>

                <button
                  type="button"
                  className="danger-action"
                  onClick={handleDelete}
                >
                  <Trash2 size={16} />
                  <span>Delete vehicle</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            PRICE
        ===================================================== */}

        <div className="vehicle-price">
          $
          {price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>

        {/* =====================================================
            STOCK
        ===================================================== */}

        <div className="vehicle-card-footer">
          <div className="vehicle-stock">
            <Package size={17} />

            <span>
              {quantity}{" "}
              {quantity === 1 ? "unit" : "units"}
            </span>
          </div>

          <span
            className={`stock-badge ${stockClass}`}
          >
            <span />
            {stockStatus}
          </span>
        </div>

        {/* =====================================================
            ACTION BUTTONS
        ===================================================== */}

        <div className="vehicle-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={handleEdit}
          >
            <Edit3 size={16} />
            Edit
          </button>

          <button
            type="button"
            className="danger-button"
            onClick={handleDelete}
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default VehicleCard;