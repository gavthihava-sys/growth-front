import { Bell, Building2, ChevronDown, CircleHelp, FileBarChart, Gauge, LayoutDashboard, LogOut, Settings, ShieldCheck, Users, Workflow, Plug } from 'lucide-react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { apiPost } from '../lib/api'
import './admin-theme.css'

const groups = [
  ['Agency', [['Admin overview', '/admin', LayoutDashboard], ['Clients / organizations', '/admin/clients', Building2], ['Users', '/admin/users', Users], ['Website onboarding', '/admin/websites', Workflow]]],
  ['Growth operations', [['Crawler jobs', '/admin/jobs', Gauge], ['Integrations', '/admin/integrations', Plug], ['Reports', '/admin/reports', FileBarChart]]],
]

export default function AdminLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const pageName = location.pathname.split('/').at(-1) || 'dashboard'
  const logout = async () => { await apiPost('/api/auth/logout').catch(() => {}); localStorage.removeItem('growth-os-demo-role'); navigate('/admin/login') }
  return <div className="go-workspace"><aside className="go-sidebar"><Link className="go-wordmark" to="/admin"><span>growth</span>os</Link><div className="go-workspace-switch"><span className="go-mini-logo">O</span><span>Growth OS <small>Platform administration</small></span><ChevronDown size={16} /></div><div className="go-role"><ShieldCheck size={15} />Administrator <span>Platform access</span></div><nav>{groups.map(([name, links]) => <div className="go-nav-group" key={name}><p>{name}</p>{links.map(([label, path, Icon]) => <NavLink key={path} to={path} end={path === '/admin'} className={({ isActive }) => `go-nav-link ${isActive ? 'active' : ''}`}><Icon size={16} />{label}</NavLink>)}</div>)}</nav><div className="go-side-foot"><NavLink to="/admin/settings" className="go-nav-link"><Settings size={16} />Settings</NavLink><button type="button" className="go-profile" onClick={logout}><span>AD</span><div>Admin user<small>Administrator</small></div><LogOut size={15} /></button></div></aside><div className="go-main"><header className="go-topbar"><div className="go-crumb"><Link to="/admin">Growth OS</Link><span>/</span>{pageName.replaceAll('-', ' ')}</div><div className="go-top-actions"><button type="button" className="go-help" aria-label="Help"><CircleHelp size={18} /></button><Bell className="go-alert" size={16} /><Link className="go-primary" to="/admin/websites?add=1">+ Add website</Link></div></header>{children}</div></div>
}
