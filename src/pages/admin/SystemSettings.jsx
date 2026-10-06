import { useEffect, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import PageHeader from '../../components/common/PageHeader'
import { apiGet } from '../../lib/api'

export default function SystemSettings(){
  const [monitoring, setMonitoring] = useState(null)
  useEffect(() => { apiGet('/api/admin/monitoring').then(setMonitoring).catch(() => {}) }, [])
  return <AdminLayout><PageHeader title="System settings" description="Review platform defaults, security controls, and live service health."/><section className="panel p-6"><p className="font-bold">Safe defaults</p><ul className="mt-4 list-inside list-disc space-y-2 text-sm text-slate-600"><li>Manual Approval Mode enabled by default</li><li>Auto-Apply Mode disabled</li><li>All changes require explicit approval</li><li>Production startup rejects default secrets and missing MongoDB</li></ul></section><section className="panel mt-6 p-6"><h2 className="font-bold">Live monitoring</h2><div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm"><div className="rounded-xl bg-slate-50 p-4"><p className="text-slate-500">API status</p><p className="mt-1 font-semibold">{monitoring ? (monitoring.ok ? 'Healthy' : 'Needs attention') : 'Checking…'}</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-slate-500">Storage</p><p className="mt-1 font-semibold">{monitoring?.storage?.storage || 'Checking…'}</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-slate-500">Uptime</p><p className="mt-1 font-semibold">{monitoring ? `${monitoring.uptimeSeconds}s` : 'Checking…'}</p></div></div><p className="mt-4 text-xs text-slate-500">Monitoring data is read-only. Use the health endpoint for external uptime checks.</p></section></AdminLayout>
}
