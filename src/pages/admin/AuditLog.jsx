import { useEffect, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import PageHeader from '../../components/common/PageHeader'
import { apiGet } from '../../lib/api'

export default function AuditLog() {
  const [jobs, setJobs] = useState([])
  useEffect(() => { apiGet('/api/admin/jobs').then((response) => setJobs(response.rows || [])).catch(() => {}) }, [])
  return <AdminLayout><PageHeader eyebrow="Security and compliance" title="System audit log" description="Review recorded automation runs and platform health events." /><section className="panel overflow-hidden"><div className="divide-y divide-stone-100">{jobs.length ? jobs.map((job, index) => <article key={`${job.name}-${index}`} className="flex items-center justify-between gap-4 p-5"><div><h2 className="font-semibold text-ink">{job.name}</h2><p className="mt-1 text-sm text-stone-600">{job.createdAt ? new Date(job.createdAt).toLocaleString() : 'Scheduled job'}</p></div><span className="rounded-full bg-lime-100 px-3 py-1.5 text-xs font-semibold text-stone-700">{job.status}</span></article>) : <p className="p-5 text-sm text-stone-600">No automation events have been recorded yet.</p>}</div></section></AdminLayout>
}
