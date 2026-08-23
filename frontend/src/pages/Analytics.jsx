import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CarFront,
  DollarSign,
  Package,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { getVehicles } from "../services/api";

function Analytics() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  async function loadAnalytics() {
    try {
      setLoading(true);
      setError("");

      const response = await getVehicles(1, 100);

      const items = Array.isArray(response)
        ? response
        : response?.items || [];

      setVehicles(items);
    } catch (err) {
      setError(err.message || "Unable to load analytics.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnalytics();
  }, []);

  const totalUnits = useMemo(
    () =>
      vehicles.reduce(
        (sum, vehicle) => sum + Number(vehicle.quantity || 0),
        0,
      ),
    [vehicles],
  );

  const totalValue = useMemo(
    () =>
      vehicles.reduce(
        (sum, vehicle) =>
          sum +
          Number(vehicle.price || 0) *
            Number(vehicle.quantity || 0),
        0,
      ),
    [vehicles],
  );

  const averagePrice = vehicles.length
    ? totalValue / totalUnits
    : 0;

  const lowStock = vehicles.filter(
    (vehicle) => Number(vehicle.quantity || 0) <= 2,
  );

  const categoryData = useMemo(() => {
    const counts = {};

    vehicles.forEach((vehicle) => {
      const category = vehicle.category || "Other";
      counts[category] =
        (counts[category] || 0) + Number(vehicle.quantity || 0);
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [vehicles]);

  const maxCategoryValue = Math.max(
    ...categoryData.map((item) => item[1]),
    1,
  );

  const topVehicles = useMemo(
    () =>
      [...vehicles]
        .sort(
          (a, b) =>
            Number(b.price || 0) * Number(b.quantity || 0) -
            Number(a.price || 0) * Number(a.quantity || 0),
        )
        .slice(0, 5),
    [vehicles],
  );

  return (
    <div className="app-shell">
      <Sidebar
        activePage="analytics"
        isAdmin={Boolean(user?.is_admin)}
      />

      <main className="main-content">
        <Topbar user={user} />

        <div className="analytics-content">
          <section className="analytics-hero">
            <div>
              <div className="analytics-eyebrow">
                <BarChart3 size={15} />
                INVENTORY ANALYTICS
              </div>

              <h1>Know your inventory.</h1>

              <p>
                Understand stock levels, vehicle value,
                and where your inventory is concentrated.
              </p>
            </div>

            <button
              type="button"
              className="analytics-refresh"
              onClick={loadAnalytics}
              disabled={loading}
            >
              <RefreshCw size={17} />
              Refresh data
            </button>
          </section>

          {error && (
            <div className="dashboard-error">
              <div>
                <strong>Unable to load analytics</strong>
                <span>{error}</span>
              </div>

              <button type="button" onClick={loadAnalytics}>
                Retry
              </button>
            </div>
          )}

          <section className="analytics-stats">
            <div className="analytics-stat-card">
              <div className="analytics-stat-icon">
                <CarFront size={21} />
              </div>

              <span>Total vehicles</span>

              <strong>{loading ? "—" : vehicles.length}</strong>

              <small>Unique inventory records</small>
            </div>

            <div className="analytics-stat-card">
              <div className="analytics-stat-icon">
                <Package size={21} />
              </div>

              <span>Total units</span>

              <strong>{loading ? "—" : totalUnits}</strong>

              <small>Vehicles currently in stock</small>
            </div>

            <div className="analytics-stat-card">
              <div className="analytics-stat-icon">
                <DollarSign size={21} />
              </div>

              <span>Inventory value</span>

              <strong>
                {loading
                  ? "—"
                  : `$${totalValue.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}`}
              </strong>

              <small>Estimated stock value</small>
            </div>

            <div className="analytics-stat-card">
              <div className="analytics-stat-icon">
                <TrendingUp size={21} />
              </div>

              <span>Average unit price</span>

              <strong>
                {loading
                  ? "—"
                  : `$${averagePrice.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}`}
              </strong>

              <small>Across current inventory</small>
            </div>
          </section>

          <section className="analytics-grid">
            <div className="analytics-panel">
              <div className="analytics-panel-header">
                <div>
                  <span className="eyebrow">
                    STOCK DISTRIBUTION
                  </span>

                  <h2>Inventory by category</h2>

                  <p>
                    See how your current units are distributed.
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="analytics-empty">
                  Loading inventory data...
                </div>
              ) : categoryData.length === 0 ? (
                <div className="analytics-empty">
                  <BarChart3 size={32} />
                  <strong>No analytics yet</strong>
                  <span>
                    Add vehicles to start seeing inventory trends.
                  </span>
                </div>
              ) : (
                <div className="category-chart">
                  {categoryData.map(([category, value]) => (
                    <div
                      className="category-row"
                      key={category}
                    >
                      <div className="category-label">
                        <span>{category}</span>
                        <strong>{value} units</strong>
                      </div>

                      <div className="category-track">
                        <div
                          className="category-bar"
                          style={{
                            width: `${
                              (value / maxCategoryValue) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="analytics-panel attention-panel">
              <div className="analytics-panel-header">
                <div>
                  <span className="eyebrow">
                    ATTENTION
                  </span>

                  <h2>Low stock</h2>

                  <p>
                    Vehicles with two or fewer units.
                  </p>
                </div>

                <div className="attention-count">
                  <AlertTriangle size={19} />
                  {lowStock.length}
                </div>
              </div>

              {lowStock.length === 0 ? (
                <div className="attention-empty">
                  <div>
                    <TrendingUp size={25} />
                  </div>

                  <strong>Inventory looks healthy</strong>

                  <span>
                    No vehicles currently need immediate
                    stock attention.
                  </span>
                </div>
              ) : (
                <div className="low-stock-list">
                  {lowStock.slice(0, 5).map((vehicle) => (
                    <div
                      className="low-stock-item"
                      key={vehicle.id}
                    >
                      <div>
                        <strong>
                          {vehicle.make} {vehicle.model}
                        </strong>

                        <span>{vehicle.category}</span>
                      </div>

                      <b>
                        {vehicle.quantity}{" "}
                        {vehicle.quantity === 1
                          ? "unit"
                          : "units"}
                      </b>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="analytics-panel top-vehicles-panel">
            <div className="analytics-panel-header">
              <div>
                <span className="eyebrow">
                  INVENTORY VALUE
                </span>

                <h2>Highest-value vehicles</h2>

                <p>
                  Vehicles contributing the most to your
                  current inventory value.
                </p>
              </div>
            </div>

            {topVehicles.length === 0 ? (
              <div className="analytics-empty">
                No vehicles available.
              </div>
            ) : (
              <div className="top-vehicle-list">
                {topVehicles.map((vehicle, index) => {
                  const value =
                    Number(vehicle.price || 0) *
                    Number(vehicle.quantity || 0);

                  return (
                    <div
                      className="top-vehicle-row"
                      key={vehicle.id}
                    >
                      <div className="vehicle-rank">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="vehicle-mini-icon">
                        <CarFront size={19} />
                      </div>

                      <div className="top-vehicle-name">
                        <strong>
                          {vehicle.make} {vehicle.model}
                        </strong>

                        <span>
                          {vehicle.category} ·{" "}
                          {vehicle.quantity} units
                        </span>
                      </div>

                      <strong className="top-vehicle-value">
                        ${value.toLocaleString("en-US", {
                          maximumFractionDigits: 0,
                        })}
                      </strong>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Analytics;