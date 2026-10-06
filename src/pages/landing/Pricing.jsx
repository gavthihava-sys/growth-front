import { Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'

const plans = [
  ['Starter', 'For one growing website', '$99', ['1 website', 'Weekly SEO and performance monitoring', 'PDF reports', 'Manual Approval Mode']],
  ['Growth', 'For teams building an organic growth engine', '$249', ['5 websites', 'Daily monitoring and priority alerts', 'SEO, GEO, and AEO analysis', 'Content strategy and AI drafts', 'Google integrations']],
  ['Scale', 'For agencies and multi-location businesses', 'Let’s talk', ['Unlimited managed websites', 'Multi-location and white-label reporting', 'Dedicated onboarding', 'Custom integrations and controls']],
]

export default function Pricing() {
  return <MainLayout><main><section className="warm-grid px-6 pb-20 pt-14 sm:pt-20"><div className="mx-auto max-w-7xl text-center"><p className="text-sm font-semibold text-stone-500">SIMPLE, TRANSPARENT PRICING</p><h1 className="display-type mx-auto mt-4 max-w-4xl text-[clamp(3.5rem,8vw,7rem)] font-normal leading-[.88]">A plan for every stage of growth.</h1><p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-stone-700">Start with a clear view of your site. Expand monitoring, intelligence, and collaboration as your growth operation matures.</p></div></section>
    <section className="bg-white px-6 py-20"><div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">{plans.map(([name, audience, price, items], index) => <article key={name} className={`rounded-3xl border p-7 ${index === 1 ? 'border-ink bg-ink text-paper shadow-xl' : 'border-stone-200 bg-paper'}`}><p className={`text-sm font-semibold ${index === 1 ? 'text-lime-200' : 'text-stone-500'}`}>{audience}</p><h2 className="mt-4 text-3xl font-bold">{name}</h2><p className="mt-5 text-4xl font-bold">{price}{price.startsWith('$') && <span className={`text-base font-medium ${index === 1 ? 'text-stone-100/60' : 'text-stone-500'}`}> / month</span>}</p><ul className="mt-8 space-y-4">{items.map(item => <li key={item} className={`flex gap-3 text-sm ${index === 1 ? 'text-stone-100' : 'text-stone-700'}`}><Check size={18} className="shrink-0 text-lime-700" />{item}</li>)}</ul><Link to="/contact" className={`mt-10 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 font-semibold ${index === 1 ? 'bg-paper text-ink hover:bg-lime-100' : 'bg-ink text-white hover:bg-ink'}`}>{name === 'Scale' ? 'Contact sales' : 'Start with Growth OS'} <ArrowRight size={17} /></Link></article>)}</div></section>
    <section className="px-6 py-16 text-center"><p className="text-sm text-stone-600">All plans start in Manual Approval Mode. You can change or cancel your plan at any time.</p></section>
  </main></MainLayout>
}
