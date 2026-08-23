import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CarFront,
  Check,
  ChevronDown,
  Edit3,
  MoreHorizontal,
  Package,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

import {
  createVehicle,
  deleteVehicle,
  getVehicles,
  purchaseVehicle,
  restockVehicle,
  updateVehicle,
} from "../services/api";


// =========================================================
// ANIMATED NUMBER
// =========================================================

function AnimatedNumber({ value, prefix = "" }) {
  const numericValue = Number(value) || 0;

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame;

    const duration = 700;
    const start = performance.now();

    function animate(now) {
      const progress = Math.min(
        (now - start) / duration,
        1,
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      setDisplayValue(
        Math.round(numericValue * eased),
      );

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [numericValue]);

  return (
    <>
      {prefix}
      {displayValue.toLocaleString("en-US")}
    </>
  );
}


// =========================================================
// VEHICLE IMAGE
// =========================================================

function VehicleVisual({ vehicle }) {
  const make = String(
    vehicle.make || "",
  ).toLowerCase();

  let image =
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=85";

  if (make.includes("bmw")) {
    image =
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=85";
  }

  if (make.includes("toyota")) {
    image =
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1000&q=85";
  }

  return (
    <div className="vehicle-visual">
      <img
        src={image}
        alt={`${vehicle.make} ${vehicle.model}`}
        onError={(event) => {
          event.currentTarget.style.display =
            "none";
        }}
      />

      <div className="vehicle-visual-overlay" />

      <div className="vehicle-category-pill">
        {vehicle.category || "Vehicle"}
      </div>

      <div className="vehicle-visual-brand">
        <CarFront size={18} />

        <span>
          {vehicle.make}
        </span>
      </div>
    </div>
  );
}


// =========================================================
// VEHICLE CARD
// =========================================================

function VehicleCard({
  vehicle,
  onEdit,
  onDelete,
  onPurchase,
  onRestock,
  isAdmin,
}) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const quantity =
    Number(vehicle.quantity || 0);

  const price =
    Number(vehicle.price || 0);

  const stockStatus =
    quantity <= 0
      ? "Out of stock"
      : quantity <= 2
        ? "Low stock"
        : "In stock";

  const stockClass =
    quantity <= 0
      ? "out"
      : quantity <= 2
        ? "low"
        : "good";

  return (
    <article className="premium-vehicle-card">

      <VehicleVisual vehicle={vehicle} />

      <div className="vehicle-card-body">

        <div className="vehicle-card-heading">

          <div>
            <span className="vehicle-eyebrow">
              {vehicle.category ||
                "VEHICLE"}
            </span>

            <h3>
              {vehicle.make}{" "}
              {vehicle.model}
            </h3>
          </div>

          <div className="vehicle-menu-wrapper">

            <button
              type="button"
              className={`vehicle-menu-button ${
                menuOpen ? "active" : ""
              }`}
              onClick={() =>
                setMenuOpen(
                  (value) => !value,
                )
              }
              aria-label="Vehicle actions"
            >
              <MoreHorizontal size={20} />
            </button>

            {menuOpen && (
              <div className="vehicle-action-menu">

                {/* EDIT */}
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit(vehicle);
                  }}
                >
                  <Edit3 size={16} />
                  Edit vehicle
                </button>

                {/* RESTOCK - ADMIN ONLY */}
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onRestock(vehicle);
                    }}
                  >
                    <Package size={16} />
                    Restock vehicle
                  </button>
                )}

                {/* DELETE */}
                <button
                  type="button"
                  className="danger-action"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(vehicle);
                  }}
                >
                  <Trash2 size={16} />
                  Delete vehicle
                </button>

              </div>
            )}

          </div>

        </div>


        <div className="vehicle-price">
          $
          {price.toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
            },
          )}
        </div>


        <div className="vehicle-card-footer">

          <div className="vehicle-stock">
            <Package size={17} />

            <span>
              {quantity}{" "}
              {quantity === 1
                ? "unit"
                : "units"}
            </span>
          </div>

          <span
            className={`stock-badge ${stockClass}`}
          >
            <span />
            {stockStatus}
          </span>

        </div>


        <div className="vehicle-purchase-action">

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              onPurchase(vehicle)
            }
            disabled={quantity === 0}
          >
            {quantity === 0
              ? "Out of Stock"
              : "Purchase"}
          </button>

        </div>

      </div>

    </article>
  );
}


// =========================================================
// VEHICLE MODAL
// =========================================================

function VehicleModal({
  vehicle,
  onClose,
  onSaved,
}) {
  const editing = Boolean(vehicle);

  const [form, setForm] = useState({
    make: vehicle?.make || "",
    model: vehicle?.model || "",
    category: vehicle?.category || "",
    price: vehicle?.price || "",
    quantity: vehicle?.quantity || "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]:
        event.target.value,
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
      setError(
        "Please fill in all vehicle details.",
      );

      return;
    }

    if (
      Number(form.price) <= 0 ||
      Number(form.quantity) < 0
    ) {
      setError(
        "Price must be greater than zero and quantity cannot be negative.",
      );

      return;
    }

    try {
      setLoading(true);

      const payload = {
        make: form.make.trim(),
        model: form.model.trim(),
        category: form.category.trim(),
        price: Number(form.price),
        quantity: Number(form.quantity),
      };

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
          event.target ===
            event.currentTarget &&
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
                min="0"
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


// =========================================================
// RESTOCK MODAL
// =========================================================

function RestockModal({
  vehicle,
  onClose,
  onRestocked,
}) {
  const [quantity, setQuantity] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const amount =
      Number(quantity);

    if (
      !Number.isInteger(amount) ||
      amount <= 0
    ) {
      setError(
        "Restock quantity must be a positive whole number.",
      );

      return;
    }

    try {
      setLoading(true);

      await restockVehicle(
        vehicle.id,
        amount,
      );

      await onRestocked();

      onClose();

    } catch (err) {
      setError(
        err.message ||
          "Unable to restock vehicle.",
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
          event.target ===
            event.currentTarget &&
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
              INVENTORY RESTOCK
            </span>

            <h2>
              Restock Vehicle
            </h2>

            <p>
              Add more units to{" "}
              <strong>
                {vehicle.make}{" "}
                {vehicle.model}
              </strong>
              .
            </p>

          </div>


          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            disabled={loading}
          >
            <X size={20} />
          </button>

        </div>


        <form
          className="vehicle-form"
          onSubmit={handleSubmit}
        >

          <div className="vehicle-form-grid">

            <div className="full-width">

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background:
                    "rgba(255,255,255,0.04)",
                  marginBottom: "16px",
                }}
              >

                <span>
                  Current stock
                </span>

                <strong>
                  {Number(
                    vehicle.quantity || 0,
                  )}{" "}
                  units
                </strong>

              </div>

            </div>


            <label className="full-width">

              <span>
                Quantity to add
              </span>

              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(event) =>
                  setQuantity(
                    event.target.value,
                  )
                }
                placeholder="e.g. 5"
                autoFocus
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

                  Restocking...
                </>
              ) : (
                <>
                  <Package size={17} />

                  Restock Vehicle
                </>
              )}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}


// =========================================================
// INVENTORY PAGE
// =========================================================

function Inventory() {
  const navigate =
    useNavigate();

  const location =
    useLocation();


  const [vehicles, setVehicles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All categories");

  const [categoryOpen, setCategoryOpen] =
    useState(false);


  const [modalVehicle, setModalVehicle] =
    useState(null);

  const [restockVehicleData, setRestockVehicleData] =
    useState(null);


  const searchRef =
    useRef(null);


  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("user") ||
        "null",
    );
  } catch {
    user = null;
  }


  // -------------------------------------------------------
  // Load inventory
  // -------------------------------------------------------

  async function loadVehicles() {
    try {
      setLoading(true);
      setError("");

      const response =
        await getVehicles(
          1,
          100,
        );

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


  // -------------------------------------------------------
  // Read search from URL
  // -------------------------------------------------------

  useEffect(() => {
    const params =
      new URLSearchParams(
        location.search,
      );

    const query =
      params.get("search") || "";

    setSearch(query);
  }, [location.search]);


  // -------------------------------------------------------
  // Categories
  // -------------------------------------------------------

  const categories =
    useMemo(() => {
      const unique =
        new Set();

      vehicles.forEach(
        (vehicle) => {
          if (vehicle.category) {
            unique.add(
              vehicle.category,
            );
          }
        },
      );

      return [
        "All categories",
        ...Array.from(unique),
      ];
    }, [vehicles]);


  // -------------------------------------------------------
  // Filter
  // -------------------------------------------------------

  const filteredVehicles =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return vehicles.filter(
        (vehicle) => {
          const matchesSearch =
            !query ||
            String(
              vehicle.make || "",
            )
              .toLowerCase()
              .includes(query) ||
            String(
              vehicle.model || "",
            )
              .toLowerCase()
              .includes(query) ||
            String(
              vehicle.category || "",
            )
              .toLowerCase()
              .includes(query);

          const matchesCategory =
            category ===
              "All categories" ||
            String(
              vehicle.category || "",
            )
              .toLowerCase() ===
              category.toLowerCase();

          return (
            matchesSearch &&
            matchesCategory
          );
        },
      );
    }, [
      vehicles,
      search,
      category,
    ]);


  const totalUnits =
    useMemo(
      () =>
        filteredVehicles.reduce(
          (sum, vehicle) =>
            sum +
            Number(
              vehicle.quantity || 0,
            ),
          0,
        ),
      [filteredVehicles],
    );


  // -------------------------------------------------------
  // Search
  // -------------------------------------------------------

  function handleSearch(event) {
    const value =
      event.target.value;

    setSearch(value);

    const params =
      new URLSearchParams();

    if (value.trim()) {
      params.set(
        "search",
        value.trim(),
      );
    }

    navigate(
      `/inventory${
        params.toString()
          ? `?${params.toString()}`
          : ""
      }`,
      {
        replace: true,
      },
    );
  }


  // -------------------------------------------------------
  // Delete
  // -------------------------------------------------------

  async function handleDelete(
    vehicle,
  ) {
    const confirmed =
      window.confirm(
        `Delete ${vehicle.make} ${vehicle.model} from inventory?`,
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteVehicle(
        vehicle.id,
      );

      await loadVehicles();

    } catch (err) {
      setError(
        err.message ||
          "Unable to delete vehicle.",
      );
    }
  }


  // -------------------------------------------------------
  // Purchase
  // -------------------------------------------------------

  async function handlePurchase(
    vehicle,
  ) {
    if (
      Number(
        vehicle.quantity || 0,
      ) <= 0
    ) {
      return;
    }

    try {
      setError("");

      await purchaseVehicle(
        vehicle.id,
      );

      await loadVehicles();

    } catch (err) {
      setError(
        err.message ||
          "Unable to purchase vehicle.",
      );
    }
  }


  // -------------------------------------------------------
  // Restock
  // -------------------------------------------------------

  function handleRestock(
    vehicle,
  ) {
    if (!user?.is_admin) {
      return;
    }

    setRestockVehicleData(
      vehicle,
    );
  }


  // -------------------------------------------------------
  // Render
  // -------------------------------------------------------

  return (
    <div className="app-shell">

      <Sidebar
        activePage="inventory"
        isAdmin={Boolean(
          user?.is_admin,
        )}
      />


      <main className="main-content">

        <Topbar user={user} />


        <div className="inventory-page">

          <div className="inventory-page-header">

            <button
              type="button"
              className="back-button"
              onClick={() =>
                navigate("/")
              }
            >
              <ArrowLeft size={17} />
              Dashboard
            </button>


            <div className="inventory-heading-row">

              <div>

                <div className="hero-eyebrow">
                  <CarFront size={16} />
                  INVENTORY MANAGEMENT
                </div>

                <h1>
                  Vehicle Inventory
                </h1>

                <p>
                  Manage every vehicle in
                  your dealership inventory.
                </p>

              </div>


              <button
                type="button"
                className="primary-button inventory-add-button"
                onClick={() =>
                  setModalVehicle({})
                }
              >
                <Plus size={19} />
                Add Vehicle
              </button>

            </div>

          </div>


          {error && (
            <div className="dashboard-error">

              <div>

                <strong>
                  Inventory error
                </strong>

                <span>
                  {error}
                </span>

              </div>


              <button
                type="button"
                onClick={
                  loadVehicles
                }
              >
                <RefreshCw size={16} />
                Retry
              </button>

            </div>
          )}


          {/* SEARCH BAR */}

          <section className="inventory-toolbar">

            <div
              className={`inventory-search ${
                search
                  ? "search-active"
                  : ""
              }`}
            >

              <Search size={21} />

              <input
                ref={searchRef}
                value={search}
                onChange={
                  handleSearch
                }
                placeholder="Search make, model or category..."
              />


              {search && (
                <button
                  type="button"
                  className="inventory-search-clear"
                  onClick={() => {
                    setSearch("");

                    navigate(
                      "/inventory",
                      {
                        replace: true,
                      },
                    );

                    searchRef.current?.focus();
                  }}
                >
                  <X size={16} />
                </button>
              )}

            </div>


            {/* CATEGORY */}

            <div className="category-filter-wrapper">

              <button
                type="button"
                className={`category-filter ${
                  categoryOpen
                    ? "open"
                    : ""
                }`}
                onClick={() =>
                  setCategoryOpen(
                    (value) =>
                      !value,
                  )
                }
              >

                <span className="category-filter-label">
                  {category}
                </span>

                <ChevronDown
                  size={18}
                  className={
                    categoryOpen
                      ? "rotate"
                      : ""
                  }
                />

              </button>


              {categoryOpen && (
                <div className="category-dropdown">

                  {categories.map(
                    (item) => (
                      <button
                        type="button"
                        key={item}
                        className={
                          category === item
                            ? "selected"
                            : ""
                        }
                        onClick={() => {
                          setCategory(
                            item,
                          );

                          setCategoryOpen(
                            false,
                          );
                        }}
                      >

                        <span>
                          {item}
                        </span>

                        {category ===
                          item && (
                          <Check
                            size={16}
                          />
                        )}

                      </button>
                    ),
                  )}

                </div>
              )}

            </div>


            <button
              type="button"
              className="refresh-inventory-button"
              onClick={
                loadVehicles
              }
              disabled={loading}
              title="Refresh inventory"
            >
              <RefreshCw
                size={19}
                className={
                  loading
                    ? "spin"
                    : ""
                }
              />
            </button>

          </section>


          {/* SUMMARY */}

          <section className="inventory-summary">

            <div>

              <strong>
                <AnimatedNumber
                  value={
                    filteredVehicles.length
                  }
                />
              </strong>

              <span>
                vehicles displayed
              </span>

            </div>


            <div>

              <strong>
                <AnimatedNumber
                  value={
                    totalUnits
                  }
                />
              </strong>

              <span>
                total units
              </span>

            </div>

          </section>


          {/* VEHICLES */}

          {loading ? (

            <div className="premium-vehicle-grid">

              {[1, 2, 3].map(
                (item) => (
                  <div
                    className="premium-skeleton"
                    key={item}
                  />
                ),
              )}

            </div>

          ) : filteredVehicles.length ===
            0 ? (

            <div className="premium-empty-state">

              <div className="empty-icon">
                <CarFront size={30} />
              </div>

              <h2>
                No vehicles found
              </h2>

              <p>
                Try another search or add
                a new vehicle to your inventory.
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={() =>
                  setModalVehicle({})
                }
              >
                <Plus size={17} />
                Add Vehicle
              </button>

            </div>

          ) : (

            <div className="premium-vehicle-grid">

              {filteredVehicles.map(
                (vehicle, index) => (

                  <div
                    className="vehicle-card-enter"
                    style={{
                      "--card-delay": `${
                        index * 70
                      }ms`,
                    }}
                    key={vehicle.id}
                  >

                    <VehicleCard
                      vehicle={
                        vehicle
                      }

                      onEdit={
                        (item) =>
                          setModalVehicle(
                            item,
                          )
                      }

                      onDelete={
                        handleDelete
                      }

                      onPurchase={
                        handlePurchase
                      }

                      onRestock={
                        handleRestock
                      }

                      isAdmin={
                        Boolean(
                          user?.is_admin,
                        )
                      }
                    />

                  </div>

                ),
              )}

            </div>

          )}

        </div>

      </main>


      {/* ADD / EDIT MODAL */}

      {modalVehicle !== null && (
        <VehicleModal
          vehicle={
            modalVehicle.id
              ? modalVehicle
              : null
          }

          onClose={() =>
            setModalVehicle(
              null,
            )
          }

          onSaved={
            loadVehicles
          }
        />
      )}


      {/* RESTOCK MODAL */}

      {restockVehicleData !== null && (
        <RestockModal
          vehicle={
            restockVehicleData
          }

          onClose={() =>
            setRestockVehicleData(
              null,
            )
          }

          onRestocked={
            loadVehicles
          }
        />
      )}

    </div>
  );
}


export default Inventory;