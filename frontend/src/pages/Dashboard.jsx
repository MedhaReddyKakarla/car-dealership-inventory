import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  CarFront,
  Check,
  Package,
  Plus,
  RefreshCw,
  Sparkles,
  X,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import StatCard from "../components/dashboard/StatCard";
import InventoryOverview from "../components/dashboard/InventoryOverview";
import VehicleCard from "../components/vehicles/VehicleCard";

import {
  createVehicle,
  deleteVehicle,
  getVehicles,
  updateVehicle,
} from "../services/api";


/* =========================================================
   VEHICLE MODAL
========================================================= */

function VehicleModal({
  vehicle,
  onClose,
  onSaved,
}) {
  const editing = Boolean(vehicle?.id);

  const [form, setForm] = useState({
    make: vehicle?.make || "",
    model: vehicle?.model || "",
    category: vehicle?.category || "",
    price: vehicle?.price || "",
    quantity: vehicle?.quantity || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (
      !form.make.trim() ||
      !form.model.trim() ||
      !form.category.trim()
    ) {
      setError("Please fill in all vehicle details.");
      return;
    }

    if (
      Number(form.price) <= 0 ||
      Number(form.quantity) <= 0
    ) {
      setError(
        "Price and quantity must be greater than zero.",
      );
      return;
    }

    const payload = {
      make: form.make.trim(),
      model: form.model.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      quantity: Number(form.quantity),
    };

    try {
      setLoading(true);

      if (editing) {
        await updateVehicle(
          vehicle.id,
          payload,
        );
      } else {
        await createVehicle(payload);
      }

      await onSaved();
      onClose();

    } catch (err) {
      setError(
        err.message ||
          "Unable to save vehicle.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="vehicle-modal-backdrop"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !loading
        ) {
          onClose();
        }
      }}
    >
      <div className="vehicle-modal">

        <div className="vehicle-modal-header">
          <div>
            <span className="eyebrow">
              {editing
                ? "INVENTORY UPDATE"
                : "NEW INVENTORY"}
            </span>

            <h2>
              {editing
                ? "Edit Vehicle"
                : "Add Vehicle"}
            </h2>

            <p>
              {editing
                ? "Update the details of this inventory record."
                : "Add a vehicle to your dealership inventory."}
            </p>
          </div>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form
          className="vehicle-form"
          onSubmit={handleSubmit}
        >
          <div className="vehicle-form-grid">

            <label>
              <span>Make</span>

              <input
                name="make"
                value={form.make}
                onChange={handleChange}
                placeholder="e.g. BMW"
                autoFocus
              />
            </label>

            <label>
              <span>Model</span>

              <input
                name="model"
                value={form.model}
                onChange={handleChange}
                placeholder="e.g. 3 Series"
              />
            </label>

            <label>
              <span>Category</span>

              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Sedan"
              />
            </label>

            <label>
              <span>Price</span>

              <input
                name="price"
                type="number"
                min="1"
                value={form.price}
                onChange={handleChange}
                placeholder="45000"
              />
            </label>

            <label className="full-width">
              <span>Quantity</span>

              <input
                name="quantity"
                type="number"
                min="1"
                value={form.quantity}
                onChange={handleChange}
                placeholder="5"
              />
            </label>

          </div>

          {error && (
            <div className="modal-error">
              {error}
            </div>
          )}

          <div className="vehicle-form-actions">

            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw
                    size={17}
                    className="spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={17} />

                  {editing
                    ? "Save Changes"
                    : "Add Vehicle"}
                </>
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}


/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard() {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  const [modalVehicle, setModalVehicle] =
    useState(null);


  /* =======================================================
     USER
  ======================================================= */

  const storedUser =
    localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch {
    user = null;
  }


  /* =======================================================
     LOAD VEHICLES
  ======================================================= */

  async function loadVehicles() {
    try {
      setLoading(true);
      setError("");

      const response =
        await getVehicles(1, 100);

      const items =
        Array.isArray(response)
          ? response
          : response?.items || [];

      setVehicles(items);

    } catch (err) {
      setError(
        err.message ||
          "Unable to load inventory.",
      );
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    loadVehicles();
  }, []);


  /* =======================================================
     DELETE
  ======================================================= */

  async function handleDeleteVehicle(vehicle) {
    const confirmed = window.confirm(
      `Delete ${vehicle.make} ${vehicle.model} from your inventory?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteVehicle(vehicle.id);

      setVehicles((currentVehicles) =>
        currentVehicles.filter(
          (item) =>
            item.id !== vehicle.id,
        ),
      );

    } catch (err) {
      setError(
        err.message ||
          "Unable to delete vehicle.",
      );
    }
  }


  /* =======================================================
     EDIT
  ======================================================= */

  function handleEditVehicle(vehicle) {
    setModalVehicle(vehicle);
  }


  /* =======================================================
     DASHBOARD CALCULATIONS
  ======================================================= */

  const totalUnits = useMemo(() => {
    return vehicles.reduce(
      (total, vehicle) =>
        total +
        Number(vehicle.quantity || 0),
      0,
    );
  }, [vehicles]);


  const totalValue = useMemo(() => {
    return vehicles.reduce(
      (total, vehicle) =>
        total +
        Number(vehicle.price || 0) *
          Number(vehicle.quantity || 0),
      0,
    );
  }, [vehicles]);


  const lowStockCount = useMemo(() => {
    return vehicles.filter(
      (vehicle) =>
        Number(vehicle.quantity || 0) <= 2,
    ).length;
  }, [vehicles]);


  const categories = useMemo(() => {
    return new Set(
      vehicles.map(
        (vehicle) => vehicle.category,
      ),
    ).size;
  }, [vehicles]);


  const recentVehicles =
    vehicles.slice(0, 6);


  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="app-shell">

      {/* SIDEBAR */}

      <Sidebar
        activePage="dashboard"
        isAdmin={Boolean(user?.is_admin)}
        mobileOpen={mobileSidebarOpen}
        onClose={() =>
          setMobileSidebarOpen(false)
        }
      />


      {/* MAIN */}

      <main className="main-content">

        <Topbar
          user={user}
          onMenuClick={() =>
            setMobileSidebarOpen(true)
          }
        />


        <div className="dashboard-content">

          {/* HERO */}

          <section className="hero-section">

            <div>

              <div className="hero-eyebrow">
                <Sparkles size={15} />
                DEALERSHIP INTELLIGENCE
              </div>

              <h1>
                Good to see you,{" "}
                {user?.name?.split(" ")[0] ||
                  "there"}
                .
              </h1>

              <p>
                Here's what's happening across
                your vehicle inventory today.
              </p>

            </div>

            <button
              type="button"
              className="primary-button hero-button"
              onClick={() =>
                navigate("/inventory")
              }
            >
              <Plus size={18} />
              Add Vehicle
            </button>

          </section>


          {/* ERROR */}

          {error && (
            <div className="dashboard-error">

              <div>
                <strong>
                  Inventory action failed
                </strong>

                <span>
                  {error}
                </span>
              </div>

              <button
                type="button"
                onClick={loadVehicles}
              >
                <RefreshCw size={16} />
                Retry
              </button>

            </div>
          )}


          {/* STATS */}

          <section className="stats-grid">

            <StatCard
              title="Vehicles"
              value={vehicles.length}
              subtitle="Unique vehicles in inventory"
              type="vehicles"
            />

            <StatCard
              title="Inventory Value"
              value={`$${totalValue.toLocaleString(
                "en-US",
                {
                  maximumFractionDigits: 0,
                },
              )}`}
              subtitle={`${totalUnits} total units`}
              type="value"
            />

            <StatCard
              title="Categories"
              value={categories}
              subtitle="Vehicle categories"
              type="stock"
            />

            <StatCard
              title="Low Stock"
              value={lowStockCount}
              subtitle="Vehicles needing attention"
              type="growth"
            />

          </section>


          {/* MAIN GRID */}

          <section className="dashboard-grid">

            <InventoryOverview
              vehicles={vehicles}
            />

            <section className="quick-action-card">

              <div className="quick-action-icon">
                <CarFront size={24} />
              </div>

              <span className="eyebrow">
                QUICK ACTION
              </span>

              <h2>
                Keep your inventory moving.
              </h2>

              <p>
                Add vehicles, update stock,
                and keep your dealership data
                accurate.
              </p>

              <button
                type="button"
                className="text-button"
                onClick={() =>
                  navigate("/inventory")
                }
              >
                Manage inventory
                <ArrowRight size={17} />
              </button>

            </section>

          </section>


          {/* RECENT VEHICLES */}

          <section className="recent-section">

            <div className="section-heading">

              <div>

                <span className="eyebrow">
                  LIVE INVENTORY
                </span>

                <h2>
                  Recent vehicles
                </h2>

                <p>
                  Your latest inventory records.
                </p>

              </div>

              <button
                type="button"
                className="view-all-button"
                onClick={() =>
                  navigate("/inventory")
                }
              >
                View all
                <ArrowRight size={16} />
              </button>

            </div>


            {/* LOADING */}

            {loading ? (

              <div className="vehicle-grid">

                {[1, 2, 3].map(
                  (item) => (
                    <div
                      className="vehicle-skeleton"
                      key={item}
                    >
                      <div className="skeleton-image" />
                      <div className="skeleton-line large" />
                      <div className="skeleton-line" />
                      <div className="skeleton-line small" />
                    </div>
                  ),
                )}

              </div>

            ) : recentVehicles.length === 0 ? (

              /* EMPTY */

              <div className="empty-state">

                <div className="empty-icon">
                  <Package size={30} />
                </div>

                <h3>
                  Your inventory is empty
                </h3>

                <p>
                  Add your first vehicle to
                  start managing your dealership
                  inventory.
                </p>

                <button
                  type="button"
                  className="primary-button"
                  onClick={() =>
                    navigate("/inventory")
                  }
                >
                  <Plus size={17} />
                  Add your first vehicle
                </button>

              </div>

            ) : (

              /* VEHICLES */

              <div className="vehicle-grid">

                {recentVehicles.map(
                  (vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      onEdit={
                        handleEditVehicle
                      }
                      onDelete={
                        handleDeleteVehicle
                      }
                    />
                  ),
                )}

              </div>

            )}

          </section>

        </div>
      </main>


      {/* EDIT / ADD MODAL */}

      {modalVehicle !== null && (
        <VehicleModal
          vehicle={modalVehicle}
          onClose={() =>
            setModalVehicle(null)
          }
          onSaved={loadVehicles}
        />
      )}

    </div>
  );
}

export default Dashboard;