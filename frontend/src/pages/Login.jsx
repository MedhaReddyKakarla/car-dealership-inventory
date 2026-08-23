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


/*
 * Decode the payload of the JWT.
 *
 * The JWT payload contains the authenticated user's
 * id, email, and admin status.
 *
 * This does NOT verify the token.
 * Token verification is still handled by the backend.
 */
function getUserFromToken(token) {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const normalizedPayload = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const decodedPayload = decodeURIComponent(
      atob(normalizedPayload)
        .split("")
        .map(
          (character) =>
            "%" +
            ("00" + character.charCodeAt(0).toString(16)).slice(-2),
        )
        .join(""),
    );

    const data = JSON.parse(decodedPayload);

    return {
      id: data.sub ? Number(data.sub) : null,
      email: data.email || "",
      is_admin: Boolean(data.is_admin),
    };
  } catch (error) {
    console.error("Unable to decode login token:", error);
    return null;
  }
}


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
      /*
       * 1. Authenticate with backend
       */
      const data = await loginUser(form);

      if (!data?.access_token) {
        throw new Error(
          "Login succeeded, but no access token was returned.",
        );
      }


      /*
       * 2. Save authentication token
       */
      localStorage.setItem(
        "access_token",
        data.access_token,
      );


      /*
       * 3. Extract user information from JWT
       */
      const user = getUserFromToken(
        data.access_token,
      );


      if (!user) {
        localStorage.removeItem("access_token");

        throw new Error(
          "Unable to read user information from login token.",
        );
      }


      /*
       * 4. Save user information
       *
       * Other parts of the application use this
       * value to determine whether the user is an admin.
       */
      localStorage.setItem(
        "user",
        JSON.stringify(user),
      );


      /*
       * 5. Navigate to dashboard
       */
      navigate("/", {
        replace: true,
      });

    } catch (err) {
      /*
       * Make sure partially-created login state
       * does not remain in localStorage.
       */
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      setError(
        err?.message ||
          "Unable to sign in. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="premium-auth-page">

      <div className="auth-background-glow auth-glow-one" />
      <div className="auth-background-glow auth-glow-two" />


      <div className="premium-auth-shell">

        {/* =====================================================
            LEFT AUTOMOTIVE PANEL
        ====================================================== */}

        <section className="auth-showcase">

          <div className="showcase-grid" />

          <div className="showcase-content">

            <div className="brand-lockup">

              <div className="brand-mark">
                <CarFront
                  size={27}
                  strokeWidth={2.2}
                />
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
                  <span>
                    Real-time inventory control
                  </span>
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  <span>
                    Secure dealership access
                  </span>
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  <span>
                    Simple stock management
                  </span>
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

              <span>
                YOUR INVENTORY. YOUR CONTROL.
              </span>

            </div>

          </div>

        </section>


        {/* =====================================================
            LOGIN PANEL
        ====================================================== */}

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

              <h2>
                Welcome back.
              </h2>

              <p>
                Sign in to continue managing your
                dealership inventory.
              </p>

            </div>


            <form
              className="premium-auth-form"
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}

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
                    autoComplete="email"
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}

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
                    autoComplete="current-password"
                    required
                  />

                </div>

              </div>


              {/* ERROR */}

              {error && (
                <div className="premium-error">
                  {error}
                </div>
              )}


              {/* SUBMIT */}

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


            {/* SECURITY MESSAGE */}

            <div className="auth-security-note">

              <ShieldCheck size={17} />

              <span>
                Your dealership data is protected
                with secure authentication.
              </span>

            </div>


            {/* REGISTER */}

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