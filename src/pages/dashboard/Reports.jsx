import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import PageHeader from '../../components/common/PageHeader'
import { apiGet, API_URL } from '../../lib/api'

export default function Reports() {
  const [reports, setReports] = useState([])
  const [error, setError] = useState('')
  const loadReports = () => apiGet('/api/reports').then((response) => setReports(response.reports || [])).catch((requestError) => setError(requestError.message))
  useEffect(() => { loadReports() }, [])
  return <DashboardLayout><PageHeader eyebrow="Reporting" title="Reports" description="Download summaries generated from the selected Search Console property." action={<button type="button" onClick={loadReports} className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white">Refresh reports</button>} />{error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</div>}<section className="grid gap-5 md:grid-cols-3">{reports.map(([name, type, date, kind]) => <article key={name} className="panel p-6"><p className="metric-label">{type}</p><h2 className="mt-2 text-lg font-bold">{name}</h2><p className="mt-4 text-sm text-slate-500">Last synced: {date === 'Not generated' ? date : new Date(date).toLocaleString()}</p><div className="mt-6 flex gap-4 text-sm font-bold text-stone-500"><a href={`${API_URL}/api/reports/${kind || 'audit'}/download`}>CSV</a><a href={`${API_URL}/api/reports/${kind || 'audit'}/pdf`}>PDF</a></div></article>)}</section></DashboardLayout>
}
