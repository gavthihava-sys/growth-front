import { Navigate, Route, Routes, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'
import Home from '../pages/landing/Home'
import Features from '../pages/landing/Features'
import Contact from '../pages/landing/Contact'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import AdminLogin from '../pages/auth/AdminLogin'
import ResetPassword from '../pages/auth/ResetPassword'
import Overview from '../pages/dashboard/Overview'
import SeoAnalysis from '../pages/dashboard/SeoAnalysis'
import GeoAnalysis from '../pages/dashboard/GeoAnalysis'
import AeoAnalysis from '../pages/dashboard/AeoAnalysis'
import SearchVisibility from '../pages/dashboard/SearchVisibility'
import Recommendations from '../pages/dashboard/Recommendations'
import Reports from '../pages/dashboard/Reports'
import Settings from '../pages/dashboard/Settings'
import AdminOverview from '../pages/admin/AdminOverview'
import Clients from '../pages/admin/Clients'
import Websites from '../pages/admin/Websites'
import Jobs from '../pages/admin/Jobs'
import SystemSettings from '../pages/admin/SystemSettings'
import Integrations from '../pages/admin/Integrations'
import Users from '../pages/admin/Users'
import AdminReports from '../pages/admin/Reports'
import ReportTemplates from '../pages/admin/ReportTemplates'
import AuditLog from '../pages/admin/AuditLog'
import Billing from '../pages/admin/Billing'
import AiUsage from '../pages/admin/AiUsage'
import ScoringRules from '../pages/admin/ScoringRules'
import Support from '../pages/admin/Support'

function RequireRole({ role, children }) {
  const location = useLocation()
  const [state, setState] = useState({ loading: true, user: null })
  useEffect(() => { let active = true; apiGet('/api/auth/me').then((response) => active && setState({ loading: false, user: response.user })).catch(() => active && setState({ loading: false, user: null })); return () => { active = false } }, [])

  if (state.loading) return <main className="grid min-h-screen place-items-center bg-paper text-sm text-stone-500">Loading workspace…</main>
  if (state.user?.role !== role) return <Navigate to={role === 'admin' ? '/admin/login' : '/login'} replace state={{ from: location }} />
  return children
}

function Privacy() {
  return <main className="min-h-screen bg-paper px-6 py-20"><div className="mx-auto max-w-3xl"><Link className="font-semibold text-stone-500" to="/">← Back to Growth OS</Link><h1 className="display-type mt-12 text-6xl">Privacy policy</h1><p className="mt-6 leading-8 text-stone-700">Growth OS stores account, website, crawl, and connected Search Console reporting data in the configured backend database so authorized users can access their workspace.</p><p className="mt-5 leading-8 text-stone-700">OAuth tokens are encrypted before storage, client workspaces are isolated by user, and recommendations remain drafts until approved. Production deployments must publish their final retention, deletion, integration, and contact details.</p></div></main>
}

function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-paper px-6 text-center"><div><p className="text-sm font-semibold uppercase tracking-[.2em] text-stone-500">404</p><h1 className="display-type mt-4 text-6xl">Page not found.</h1><Link className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 font-semibold text-white" to="/">Return home</Link></div></main>
}

export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/features" element={<Features />} /><Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /><Route path="/admin/login" element={<AdminLogin />} /><Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/dashboard" element={<RequireRole role="user"><Overview /></RequireRole>} /><Route path="/dashboard/seo" element={<RequireRole role="user"><SeoAnalysis /></RequireRole>} /><Route path="/dashboard/geo" element={<RequireRole role="user"><GeoAnalysis /></RequireRole>} /><Route path="/dashboard/aeo" element={<RequireRole role="user"><AeoAnalysis /></RequireRole>} />
    <Route path="/dashboard/visibility" element={<RequireRole role="user"><SearchVisibility /></RequireRole>} /><Route path="/dashboard/recommendations" element={<RequireRole role="user"><Recommendations /></RequireRole>} />
    <Route path="/dashboard/reports" element={<RequireRole role="user"><Reports /></RequireRole>} /><Route path="/dashboard/settings" element={<RequireRole role="user"><Settings /></RequireRole>} />
    <Route path="/admin" element={<RequireRole role="admin"><AdminOverview /></RequireRole>} /><Route path="/admin/clients" element={<RequireRole role="admin"><Clients /></RequireRole>} />
    <Route path="/admin/websites" element={<RequireRole role="admin"><Websites /></RequireRole>} /><Route path="/admin/jobs" element={<RequireRole role="admin"><Jobs /></RequireRole>} /><Route path="/admin/users" element={<RequireRole role="admin"><Users /></RequireRole>} /><Route path="/admin/integrations" element={<RequireRole role="admin"><Integrations /></RequireRole>} /><Route path="/admin/reports" element={<RequireRole role="admin"><AdminReports /></RequireRole>} /><Route path="/admin/report-templates" element={<RequireRole role="admin"><ReportTemplates /></RequireRole>} /><Route path="/admin/audit-log" element={<RequireRole role="admin"><AuditLog /></RequireRole>} /><Route path="/admin/billing" element={<RequireRole role="admin"><Billing /></RequireRole>} /><Route path="/admin/ai-usage" element={<RequireRole role="admin"><AiUsage /></RequireRole>} /><Route path="/admin/scoring-rules" element={<RequireRole role="admin"><ScoringRules /></RequireRole>} /><Route path="/admin/support" element={<RequireRole role="admin"><Support /></RequireRole>} /><Route path="/admin/settings" element={<RequireRole role="admin"><SystemSettings /></RequireRole>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
}
