import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import AdminLayout from '../../layouts/AdminLayout'
import PageHeader from '../../components/common/PageHeader'
import WebsiteModal from '../../components/common/WebsiteModal'
import { apiGet } from '../../lib/api'

export default function Websites() {
  const [params, setParams] = useSearchParams()
  const [open, setOpen] = useState(params.get('add') === '1')
  const [websites, setWebsites] = useState([])
  const [owners, setOwners] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { Promise.all([apiGet('/api/admin/websites'), apiGet('/api/admin/clients')]).then(([websiteResponse, clientResponse]) => { setWebsites(websiteResponse.websites || []); setOwners(clientResponse.clients || []) }).catch((requestError) => setError(requestError.message)) }, [])
  const close = () => { setOpen(false); params.delete('add'); setParams(params) }
  return <AdminLayout><PageHeader title="Websites" description="Review monitored domains and ownership-verification status." action={<button type="button" onClick={() => setOpen(true)} className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white">+ Add website</button>} /><section className="panel overflow-hidden">{error && <p className="border-b border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}<div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-4">Website</th><th className="p-4">URL</th><th className="p-4">Owner</th><th className="p-4">Status</th><th className="p-4">Created</th></tr></thead><tbody>{websites.length ? websites.map((website) => { const owner = owners.find((item) => item.id === String(website.userId)); return <tr key={website._id} className="border-b last:border-0"><td className="p-4 font-medium">{website.name}</td><td className="p-4">{website.url}</td><td className="p-4">{owner?.email || '—'}</td><td className="p-4">{website.status}</td><td className="p-4">{website.createdAt ? new Date(website.createdAt).toLocaleDateString() : '—'}</td></tr> }) : <tr><td className="p-4 text-sm text-slate-500" colSpan="5">No websites yet.</td></tr>}</tbody></table></div></section><WebsiteModal open={open} onClose={close} context="admin" owners={owners} onSubmitted={(website) => setWebsites((current) => [website, ...current])} /></AdminLayout>
}
