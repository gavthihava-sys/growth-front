import { useEffect, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import PageHeader from '../../components/common/PageHeader'
import { apiGet, apiPost } from '../../lib/api'

export default function Jobs() {
  const [jobs, setJobs] = useState([]); const [error, setError] = useState(''); const [running, setRunning] = useState(false)
  const load = () => apiGet('/api/admin/jobs').then((response) => setJobs(response.rows || [])).catch((requestError) => setError(requestError.message))
  useEffect(() => { load() }, [])
  const run = async () => { setRunning(true); setError(''); try { await apiPost('/api/admin/jobs/run-crawl'); await load() } catch (requestError) { setError(requestError.message) } finally { setRunning(false) } }
  return <AdminLayout><PageHeader title="Automation jobs" description="Daily crawls, Search Console syncs, report creation, and job failures." action={<button type="button" onClick={run} disabled={running} className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white">{running ? 'Running…' : 'Run monitoring now'}</button>} />{error && <div className="go-panel" style={{ marginBottom: 20, color: '#b42318' }}>{error}</div>}<section className="panel overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-4">Job</th><th className="p-4">Status</th><th className="p-4">Crawls</th><th className="p-4">Crawl failures</th><th className="p-4">Search Console syncs</th><th className="p-4">Sync failures</th></tr></thead><tbody>{jobs.map((job, index) => <tr key={`${job.name}-${index}`} className="border-b last:border-0"><td className="p-4 font-semibold">{job.name}</td><td className="p-4 text-emerald-700">{job.status}</td><td className="p-4">{job.completed ?? '—'}</td><td className="p-4">{job.failed ?? '—'}</td><td className="p-4">{job.searchConsoleSynced ?? '—'}</td><td className="p-4">{job.searchConsoleFailed ?? '—'}</td></tr>)}</tbody></table>{!jobs.length && <p className="p-6 text-sm text-slate-500">No jobs returned.</p>}</div></section></AdminLayout>
}
