import {
  Bot,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";
import { apiGet, apiPost } from "../lib/api";

const items = [
  ["Overview", "/dashboard", LayoutDashboard],
  ["SEO analysis", "/dashboard/seo", Search],
  ["GEO readiness", "/dashboard/geo", Bot],
  ["AEO readiness", "/dashboard/aeo", ShieldCheck],
  ["Search visibility", "/dashboard/visibility", Bot],
  ["Recommendations", "/dashboard/recommendations", ShieldCheck],
  ["Reports", "/dashboard/reports", FileText],
  ["Settings", "/dashboard/settings", Settings],
];

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("Your workspace");
  const closeMenu = () => setMenuOpen(false);
  const logout = async () => {
    await apiPost("/api/auth/logout").catch(() => {})
    localStorage.removeItem("growth-os-demo-role");
    closeMenu();
    navigate("/login");
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);
  useEffect(() => {
    apiGet("/api/websites").then((response) => { if (response.websites?.[0]?.name) setWorkspaceName(response.websites[0].name) }).catch(() => {});
  }, []);
  useEffect(() => {
    const onKeyDown = (event) => event.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-paper lg:flex">
      <header className="sticky top-0 z-30 flex h-[73px] items-center justify-between border-b border-stone-200 bg-white/95 px-5 backdrop-blur lg:hidden">
        <Logo />
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close dashboard menu" : "Open dashboard menu"}
          aria-expanded={menuOpen}
          aria-controls="dashboard-navigation"
          className="grid h-11 w-11 place-items-center rounded-xl border border-stone-200 bg-white text-ink"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      {menuOpen && (
        <button
          type="button"
          aria-label="Close dashboard menu"
          onClick={closeMenu}
          className="fixed inset-0 z-30 bg-ink/35 lg:hidden"
        />
      )}
      <aside
        id="dashboard-navigation"
        className={`fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col border-r border-stone-200 bg-white p-5 shadow-xl transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:translate-x-0 lg:shadow-none ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close dashboard menu"
            className="grid h-9 w-9 place-items-center rounded-lg text-stone-600 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>
        <p className="mt-7 text-xs font-semibold uppercase tracking-wider text-stone-500">
          {workspaceName}
        </p>
        <NavLink to="/dashboard/settings?add=1" className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-ink px-3 py-2.5 text-sm font-semibold text-white">
          + Add website
        </NavLink>
        <nav
          className="mt-3 space-y-1"
          aria-label="Client dashboard navigation"
        >
          {items.map(([label, path, Icon]) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/dashboard"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `nav-item ${isActive ? "nav-item-active" : ""}`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={logout}
          className="nav-item mt-auto w-full border border-stone-200"
        >
          <LogOut size={17} />
          Log out
        </button>
      </aside>
      <main className="min-w-0 flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
