import { CheckCircle2, Clock3, ShieldCheck } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import DashboardLayout from '../../layouts/DashboardLayout'

export default function FeaturePage({ title, description, score = '…', items = [], source, onRun, running = false, error = '', websiteLabel = 'Your website', checkedAt = null }) {
  const numericScore = Number.isFinite(Number(score)) ? Math.max(0, Math.min(100, Number(score))) : 0
  return <DashboardLayout><PageHeader eyebrow={`${websiteLabel}${source ? ` · ${source}` : ''}`} title={title} description={description} action={<button onClick={onRun} disabled={running || !onRun} className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white">{running ? 'Analyzing…' : 'Run analysis'}</button>} />
    {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</div>}
    <section className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><article className="panel p-6"><p className="metric-label">Current score</p><p className="mt-3 text-5xl font-bold">{score}<span className="text-xl text-slate-400">/100</span></p><div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-ink" style={{ width: `${numericScore}%` }} /></div><p className="mt-4 text-sm text-slate-500">Calculated from the latest approved crawl and connected data.</p></article>
      <article className="panel p-6"><h2 className="font-bold">Priority findings</h2><div className="mt-4 space-y-3">{items.map(([finding, status]) => <div key={finding} className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3"><span className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={17} className="text-stone-500"/>{finding}</span><span className="text-xs text-slate-500">{status}</span></div>)}</div></article></section>
    <section className="panel mt-6 p-6"><div className="flex items-center gap-3"><ShieldCheck className="text-emerald-600"/><div><h2 className="font-bold">Manual Approval Mode</h2><p className="text-sm text-slate-500">Recommendations are drafts. No live website changes can be made without your approval.</p></div></div><div className="mt-5 flex items-center gap-3 text-sm text-slate-500"><Clock3 size={17}/> {checkedAt ? `Last checked ${new Date(checkedAt).toLocaleString()}` : 'Not checked yet'}</div></section>
  </DashboardLayout>
}
