import { BarChart3 } from "lucide-react";

function InventoryOverview({ vehicles = [] }) {
  const categories = vehicles.reduce((result, vehicle) => {
    const category = vehicle.category || "Other";

    result[category] = (result[category] || 0) + 1;

    return result;
  }, {});

  const entries = Object.entries(categories);

  const maximum =
    entries.length > 0
      ? Math.max(...entries.map(([, count]) => count))
      : 1;

  return (
    <section className="overview-card">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            INVENTORY MIX
          </span>

          <h2>Inventory Overview</h2>

          <p>
            Vehicle distribution across your current inventory.
          </p>
        </div>

        <div className="section-icon">
          <BarChart3 size={20} />
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="overview-empty">
          <p>No inventory data available yet.</p>
        </div>
      ) : (
        <div className="category-bars">
          {entries.map(([category, count]) => {
            const percentage = Math.round(
              (count / vehicles.length) * 100,
            );

            const width = Math.max(
              8,
              Math.round((count / maximum) * 100),
            );

            return (
              <div
                className="category-row"
                key={category}
              >
                <div className="category-row-header">
                  <span>{category}</span>

                  <span>
                    {count}{" "}
                    {count === 1 ? "vehicle" : "vehicles"}
                  </span>
                </div>

                <div className="category-track">
                  <div
                    className="category-fill"
                    style={{
                      width: `${width}%`,
                    }}
                  />
                </div>

                <div className="category-percentage">
                  {percentage}% of inventory
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default InventoryOverview;