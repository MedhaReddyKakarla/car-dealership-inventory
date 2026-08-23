import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CarFront,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await registerUser(form);

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="premium-auth-page">
      <div className="auth-background-glow auth-glow-one" />
      <div className="auth-background-glow auth-glow-two" />

      <div className="premium-auth-shell">

        {/* LEFT AUTOMOTIVE PANEL */}
        <section className="auth-showcase">

          <div className="showcase-grid" />

          <div className="showcase-content">

            <div className="brand-lockup">
              <div className="brand-mark">
                <CarFront size={27} strokeWidth={2.2} />
              </div>

              <div>
                <strong>VeyraDrive</strong>
                <span>DEALERSHIP OS</span>
              </div>
            </div>

            <div className="showcase-main">

              <div className="showcase-eyebrow">
                <Sparkles size={15} />
                BUILT FOR MODERN DEALERSHIPS
              </div>

              <h1>
                Your cars.
                <span> Your business.</span>
              </h1>

              <p>
                Create your dealership workspace and
                take control of your vehicle inventory
                from one place.
              </p>

              <div className="showcase-features">

                <div>
                  <CheckCircle2 size={18} />
                  <span>Organize your entire inventory</span>
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  <span>Track stock and vehicle value</span>
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  <span>Manage your dealership securely</span>
                </div>

              </div>
            </div>

            <div className="showcase-car">

              <div className="car-glow" />

              <CarFront
                size={170}
                strokeWidth={0.75}
              />

              <div className="showcase-car-line" />

              <span>BUILD YOUR INVENTORY. BUILD YOUR BUSINESS.</span>
            </div>

          </div>
        </section>

        {/* REGISTER PANEL */}
        <section className="auth-form-panel">

          <div className="auth-form-container">

            <div className="mobile-brand">
              <div className="brand-mark">
                <CarFront size={22} />
              </div>

              <strong>VeyraDrive</strong>
            </div>

            <div className="auth-heading">

              <span className="auth-small-label">
                GET STARTED
              </span>

              <h2>Create your workspace.</h2>

              <p>
                Set up your account and start managing
                your dealership inventory.
              </p>
            </div>

            <form
              className="premium-auth-form"
              onSubmit={handleSubmit}
            >

              <div className="auth-input-group">
                <label htmlFor="name">
                  Full name
                </label>

                <div className="auth-input-wrapper">
                  <UserRound size={18} />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="email">
                  Email address
                </label>

                <div className="auth-input-wrapper">
                  <Mail size={18} />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@dealership.com"
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="password">
                  Password
                </label>

                <div className="auth-input-wrapper">
                  <LockKeyhole size={18} />

                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a secure password"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="premium-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="auth-submit-button"
                disabled={loading}
              >
                <span>
                  {loading
                    ? "Creating account..."
                    : "Create dealership account"}
                </span>

                {!loading && (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>

            <div className="auth-security-note">
              <ShieldCheck size={17} />

              <span>
                Your account is protected with secure
                authentication.
              </span>
            </div>

            <p className="premium-auth-footer">
              Already have an account?{" "}
              <Link to="/login">
                Sign in
              </Link>
            </p>

          </div>
        </section>

      </div>
    </div>
  );
}

export default Register;
