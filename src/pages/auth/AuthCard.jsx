import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/common/Logo";
import { apiPost } from "../../lib/api";

const copy = {
  login: {
    eyebrow: "WELCOME BACK",
    title: "Your next growth move starts here.",
    description:
      "Return to the workspace where your website opportunities become clear, practical actions.",
    submit: "Log in",
  },
  register: {
    eyebrow: "START YOUR WORKSPACE",
    title: "Build a stronger online presence.",
    description:
      "Create your Growth OS workspace and begin with a clear view of your website health.",
    submit: "Create workspace",
  },
  forgot: {
    eyebrow: "ACCOUNT RECOVERY",
    title: "We will help you get back in.",
    description:
      "Enter the email address linked to your Growth OS account. We will send a secure reset link.",
    submit: "Send reset link",
  },
  admin: {
    eyebrow: "ADMINISTRATOR ACCESS",
    title: "Manage the Growth OS platform.",
    description:
      "Use the administrator workspace to manage client organizations, users, monitored websites, and platform operations.",
    submit: "Log in as administrator",
  },
};

function Field({ label, children }) {
  return (
    <label className="block text-sm font-semibold text-ink">
      <span>{label}</span>
      {children}
    </label>
  );
}
const inputClass =
  "mt-2 min-h-12 w-full rounded-none border border-stone-200 bg-white px-4 text-sm font-normal text-ink outline-none transition placeholder:text-stone-400 focus:border-lime-600 focus:ring-2 focus:ring-lime-100";

function ProviderButtons({ action }) {
  return (
    <div className="border border-stone-200 bg-white p-4 text-sm leading-6 text-stone-600">
      {action} with your Growth OS email and password. After login, use Search visibility to securely connect the Google account that owns your Search Console property.
    </div>
  );
}

export default function AuthCard({ type }) {
  const [showPassword, setShowPassword] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const content = copy[type];
  const isRegister = type === "register";
  const isForgot = type === "forgot";
  const isAdmin = type === "admin";
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    if (isForgot) {
      setSubmitting(true);
      try { await apiPost('/api/auth/forgot-password', { email: form.get('email') }); setSent(true) } catch (submitError) { setError(submitError.message) } finally { setSubmitting(false) }
      return
    }
    setSubmitting(true);
    try {
      const endpoint = isRegister ? "/api/auth/register" : isAdmin ? "/api/auth/admin-login" : "/api/auth/login";
      const response = await apiPost(endpoint, { email: form.get("email"), password: form.get("password"), firstName: form.get("firstName"), lastName: form.get("lastName") });
      localStorage.setItem("growth-os-demo-role", response.user.role);
      navigate(response.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-stone-200/80 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo />
          <Link
            className="text-sm font-semibold text-stone-500 hover:text-ink"
            to="/"
          >
            Back to website
          </Link>
        </div>
      </header>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[.78fr_1.22fr] lg:py-24">
        <aside className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-stone-500">
            {content.eyebrow}
          </p>
          <h1 className="display-type mt-5 text-[clamp(3.5rem,6vw,6.4rem)] font-normal leading-[.88] text-ink">
            {content.title}
          </h1>
          <p className="mt-7 max-w-md text-lg leading-8 text-stone-700">
            {content.description}
          </p>
          <div className="mt-10 border-t border-stone-200 pt-6">
            <p className="flex gap-3 text-sm leading-6 text-stone-700">
              <ShieldCheck className="shrink-0 text-stone-500" size={20} />
              Your website is never changed without explicit approval. Manual
              Approval Mode is always the default.
            </p>
          </div>
        </aside>
        <section className="relative overflow-hidden border border-stone-200 bg-[#f0f0ea] p-6 shadow-sm sm:p-10">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(rgba(25,26,22,.12) 1px, transparent 1px)",
              backgroundSize: "13px 13px",
            }}
          />
          <div className="relative">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-stone-500">
                  Growth OS account
                </p>
                <h2 className="mt-2 text-2xl font-bold text-ink">
                  {isForgot
                    ? "Reset password"
                    : isRegister
                      ? "Create your account"
                      : isAdmin
                        ? "Administrator login"
                        : "Log in to your account"}
                </h2>
              </div>
              <LockKeyhole className="text-stone-500" size={24} />
            </div>
            {sent ? (
              <div className="mt-8 border border-lime-300 bg-white/80 p-6">
                <Check className="text-stone-500" size={26} />
                <h3 className="mt-4 text-xl font-bold">Check your inbox</h3>
                <p className="mt-2 leading-7 text-stone-700">
                  If an account exists for that email address, a secure
                  password-reset link is on its way.
                </p>
                <Link
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-stone-500 hover:text-ink"
                  to="/login"
                >
                  Return to login <ArrowRight size={17} />
                </Link>
              </div>
            ) : (
              <form
                className="mt-8 grid gap-5 sm:grid-cols-2"
                onSubmit={handleSubmit}
              >
                {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2" role="alert">{error}</div>}
                {!isForgot && (
                  <div className="sm:col-span-2">
                    <ProviderButtons action={isRegister ? "Create an account" : "Log in"} />
                  </div>
                )}
                {isRegister && (
                  <>
                    <Field label="First name">
                      <input
                        required
                        name="firstName"
                        autoComplete="given-name"
                        className={inputClass}
                        placeholder="Ava"
                      />
                    </Field>
                    <Field label="Last name">
                      <input
                        required
                        name="lastName"
                        autoComplete="family-name"
                        className={inputClass}
                        placeholder="Patel"
                      />
                    </Field>
                  </>
                )}
                <Field label="Email address">
                  <input
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`${inputClass} ${!isRegister ? "sm:col-span-2" : ""}`}
                    placeholder="you@example.com"
                  />
                </Field>
                {isRegister && (
                  <Field label="Website">
                    <input
                      type="url"
                      className={inputClass}
                      placeholder="https://yourwebsite.com"
                    />
                  </Field>
                )}
                {!isForgot && (
                  <Field label="Password">
                    <span className="relative mt-2 block">
                      <input
                        required
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete={
                          isRegister ? "new-password" : "current-password"
                        }
                        className={`${inputClass} mt-0 pr-12`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-stone-500 hover:text-ink"
                      >
                        {showPassword ? (
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </button>
                    </span>
                  </Field>
                )}
                {(type === "login" || isAdmin) && (
                  <div className="flex items-center justify-between text-sm sm:col-span-2">
                    <label className="flex items-center gap-2 text-stone-700">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-lime-500"
                      />{" "}
                      Remember me
                    </label>
                    <span className="text-stone-500">Demo access enabled</span>
                  </div>
                )}
                {isRegister && (
                  <label className="flex items-start gap-3 text-sm leading-6 text-stone-700 sm:col-span-2">
                    <input
                      required
                      type="checkbox"
                      className="mt-1 h-4 w-4 accent-lime-500"
                    />
                    I agree to the Terms of Service and Privacy Policy.
                  </label>
                )}
                <button className="inline-flex min-h-12 items-center justify-center gap-2 bg-ink px-6 font-semibold text-white transition hover:bg-ink sm:col-span-2">
                  {submitting ? "Working…" : content.submit} {!submitting && <ArrowRight size={18} />}
                </button>
              </form>
            )}
            {!sent && (
              <p className="mt-6 text-center text-sm text-stone-700">
                {isRegister ? (
                  <>
                    Already have an account?{" "}
                    <Link
                      className="font-semibold text-stone-500 hover:text-ink"
                      to="/login"
                    >
                      Log in
                    </Link>
                  </>
                ) : isForgot ? (
                  <>
                    Remembered it?{" "}
                    <Link
                      className="font-semibold text-stone-500 hover:text-ink"
                      to="/login"
                    >
                      Return to login
                    </Link>
                  </>
                ) : isAdmin ? (
                  <>
                    Need the client workspace?{" "}
                    <Link
                      className="font-semibold text-stone-500 hover:text-ink"
                      to="/login"
                    >
                      User login
                    </Link>
                  </>
                ) : (
                  <>
                    New to Growth OS?{" "}
                    <Link
                      className="font-semibold text-stone-500 hover:text-ink"
                      to="/register"
                    >
                      Create a workspace
                    </Link>
                  </>
                )}
              </p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
