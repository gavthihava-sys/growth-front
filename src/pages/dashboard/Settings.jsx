import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import PageHeader from '../../components/common/PageHeader'
import WebsiteModal from '../../components/common/WebsiteModal'
import { apiGet } from '../../lib/api'
import { useSearchParams } from 'react-router-dom'

export default function Settings() {
  const [params, setParams] = useSearchParams(); const [open, setOpen] = useState(params.get('add') === '1'); const [websites, setWebsites] = useState([]); const [error, setError] = useState('')
  useEffect(() => { apiGet('/api/websites').then((response) => setWebsites(response.websites || [])).catch((requestError) => setError(requestError.message)) }, [])
  const close = () => { setOpen(false); params.delete('add'); setParams(params) }
  return <DashboardLayout><PageHeader title="Workspace settings" description="Manage websites, integrations, notifications, and automation preferences." action={<button type="button" onClick={() => setOpen(true)} className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white">+ Add website</button>} />{error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</div>}<section className="panel max-w-3xl p-6"><h2 className="font-bold">Connected websites</h2><div className="mt-4 space-y-2">{websites.length ? websites.map((website) => <div key={website._id} className="flex items-center justify-between rounded-xl bg-slate-50 p-4"><div><p className="font-semibold">{website.name}</p><p className="mt-1 text-sm text-slate-500">{website.url}</p></div><span className="rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">{website.status}</span></div>) : <p className="text-sm text-slate-500">No websites added yet.</p>}</div><h2 className="mt-8 font-bold">Automation safety</h2><p className="mt-2 text-sm text-slate-500">Manual Approval Mode is active. Growth OS will create drafts but cannot modify your live website.</p><div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-4"><div><p className="font-semibold">Manual Approval Mode</p><p className="mt-1 text-sm text-slate-500">Recommended for all website changes.</p></div><span className="rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">Active</span></div></section><WebsiteModal open={open} onClose={close} onSubmitted={(website) => setWebsites((current) => [website, ...current])} /></DashboardLayout>
}
