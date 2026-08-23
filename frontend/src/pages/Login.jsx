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
} from "lucide-react";

import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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
      const data = await loginUser(form);

      localStorage.setItem("access_token", data.access_token);

      navigate("/");
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
                SMART INVENTORY MANAGEMENT
              </div>

              <h1>
                Drive your
                <span> inventory </span>
                forward.
              </h1>

              <p>
                One powerful workspace to manage vehicles,
                monitor stock, and keep your dealership moving.
              </p>

              <div className="showcase-features">
                <div>
                  <CheckCircle2 size={18} />
                  <span>Real-time inventory control</span>
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  <span>Secure dealership access</span>
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  <span>Simple stock management</span>
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

              <span>YOUR INVENTORY. YOUR CONTROL.</span>
            </div>

          </div>
        </section>

        {/* LOGIN PANEL */}
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
                DEALERSHIP PORTAL
              </span>

              <h2>Welcome back.</h2>

              <p>
                Sign in to continue managing your
                dealership inventory.
              </p>
            </div>

            <form
              className="premium-auth-form"
              onSubmit={handleSubmit}
            >

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
                <div className="label-row">
                  <label htmlFor="password">
                    Password
                  </label>

                  <span className="secure-label">
                    <LockKeyhole size={12} />
                    Secure
                  </span>
                </div>

                <div className="auth-input-wrapper">
                  <LockKeyhole size={18} />

                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
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
                    ? "Signing in..."
                    : "Sign in to VeyraDrive"}
                </span>

                {!loading && (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>

            <div className="auth-security-note">
              <ShieldCheck size={17} />

              <span>
                Your dealership data is protected
                with secure authentication.
              </span>
            </div>

            <p className="premium-auth-footer">
              Don't have an account?{" "}
              <Link to="/register">
                Create your account
              </Link>
            </p>

          </div>
        </section>

      </div>
    </div>
  );
}

export default Login;
