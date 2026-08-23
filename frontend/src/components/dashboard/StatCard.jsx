import {
  CarFront,
  CircleDollarSign,
  Package,
  TrendingUp,
} from "lucide-react";

const icons = {
  vehicles: CarFront,
  value: CircleDollarSign,
  stock: Package,
  growth: TrendingUp,
};

function StatCard({
  title,
  value,
  subtitle,
  type = "vehicles",
}) {
  const Icon = icons[type] || CarFront;

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon size={20} strokeWidth={2} />
        </div>

        <span className="stat-label">
          {title}
        </span>
      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-subtitle">
        {subtitle}
      </div>
    </div>
  );
}

export default StatCard;