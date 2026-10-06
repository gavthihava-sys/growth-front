import { ArrowRight, Bot, ChartNoAxesCombined, CheckCircle2, FileText, Gauge, MapPin, Search, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'

const features = [
  [Search, 'SEO intelligence', 'Crawl technical SEO, content quality, search intent, internal links, indexability, and structured data in one workspace.', ['On-page and technical audits', 'Keyword and intent opportunities', 'Core Web Vitals monitoring']],
  [Bot, 'GEO and AI visibility', 'Prepare your content and entity signals for generative search experiences, answer engines, and citation opportunities.', ['Entity and topical authority', 'AI-friendly content analysis', 'Citation opportunity tracking']],
  [ChartNoAxesCombined, 'Content strategy', 'Turn data into topic clusters, content gaps, article briefs, and internal linking plans your team can act on.', ['Cluster and funnel planning', 'Content freshness alerts', 'Competitor gap analysis']],
  [MapPin, 'Local SEO', 'Improve the signals that matter for local discovery, Google Business performance, and multi-location visibility.', ['Profile optimization', 'Review monitoring', 'NAP consistency checks']],
  [Gauge, 'Performance and health', 'Watch page experience, accessibility, security, crawl errors, and performance changes every day.', ['Mobile and desktop checks', 'Daily monitoring alerts', 'Issue history and trends']],
  [FileText, 'Reports and approvals', 'Create client-ready reports and keep every proposed website change transparent and under your control.', ['PDF, CSV, and Excel exports', 'Manual Approval Mode', 'Audit trail for every action']],
]

export default function Features() {
  return <MainLayout><main>
    <section className="warm-grid px-6 pb-20 pt-14 sm:pt-20"><div className="mx-auto max-w-7xl"><p className="text-sm font-semibold text-stone-500">THE GROWTH OS TOOLKIT</p><h1 className="display-type mt-4 max-w-5xl text-[clamp(3.5rem,9vw,8rem)] font-normal leading-[.88]">See the whole growth picture.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-stone-700">Everything your team needs to understand visibility, prioritize the next best action, and grow safely across search and AI discovery.</p></div></section>
    <section className="bg-white px-6 py-20"><div className="mx-auto max-w-7xl"><div className="grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">{features.map(([Icon, title, description, benefits], index) => <article key={title} className="border-t border-stone-200 pt-6"><div className="flex items-center justify-between"><Icon className="text-stone-500" size={26} /><span className="text-sm font-semibold text-stone-400">0{index + 1}</span></div><h2 className="mt-7 text-2xl font-bold tracking-tight">{title}</h2><p className="mt-3 leading-7 text-stone-600">{description}</p><ul className="mt-6 space-y-3">{benefits.map((benefit) => <li key={benefit} className="flex gap-2 text-sm font-medium text-stone-700"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-stone-500" />{benefit}</li>)}</ul></article>)}</div></div></section>
    <section className="bg-ink px-6 py-20 text-paper"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><ShieldCheck className="text-lime-200" size={32} /><h2 className="display-type mt-5 max-w-3xl text-5xl font-normal leading-none">Automation that asks before it acts.</h2></div><div><p className="leading-7 text-stone-100/75">Manual Approval Mode is built into every workspace. Growth OS can identify issues, generate drafts, and suggest changes—but it does not touch a live website unless the right person explicitly approves it.</p><Link to="/contact" className="mt-7 inline-flex items-center gap-2 font-bold text-lime-200 hover:text-white">Talk through your workflow <ArrowRight size={18} /></Link></div></div></section>
  </main></MainLayout>
}
