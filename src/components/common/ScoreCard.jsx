export default function ScoreCard({ label, score, change, tone = 'orange' }) {
  const colors = {
    orange: 'bg-lime-100 text-stone-500', emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600', sky: 'bg-sky-50 text-sky-600',
  }
  return (
    <article className="panel p-5">
      <p className="metric-label">{label}</p>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-3xl font-bold tracking-tight">{score}<span className="text-base text-slate-400">/100</span></p>
        <span className={`rounded-lg px-2 py-1 text-xs font-bold ${colors[tone]}`}>{change}</span>
      </div>
    </article>
  )
}
