import { X } from 'lucide-react'
import { useState } from 'react'
import { apiPost } from '../../lib/api'

export default function WebsiteModal({ open, onClose, onSubmitted, context = 'workspace', owners = [] }) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [ownerId, setOwnerId] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  if (!open) return null

  const submit = async (event) => {
    event.preventDefault()
    const website = { name: name.trim(), url: url.trim(), ...(context === 'admin' ? { userId: ownerId } : {}) }
    try {
      const response = await apiPost(context === 'admin' ? '/api/admin/websites' : '/api/websites', website)
      onSubmitted?.(response.website || website)
      setSubmitted(true)
      setError('')
    } catch (submitError) { setError(submitError.message) }
  }

  const close = () => { setName(''); setUrl(''); setOwnerId(''); setSubmitted(false); setError(''); onClose() }

  return <div className="fixed inset-0 z-50 grid place-items-center bg-ink/45 px-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}><section className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="website-modal-title"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-stone-500">{context === 'admin' ? 'Website onboarding' : 'Workspace setup'}</p><h2 id="website-modal-title" className="mt-2 text-2xl font-bold text-ink">Add a website</h2></div><button type="button" onClick={close} aria-label="Close add website dialog" className="rounded-lg p-2 text-stone-500 hover:bg-stone-100"><X size={19} /></button></div>{submitted ? <div className="mt-7 rounded-xl border border-lime-200 bg-lime-50 p-5"><h3 className="font-bold text-ink">Website added successfully</h3><p className="mt-2 text-sm leading-6 text-stone-700">{name} is ready for Search Console connection and its first audit.</p><button type="button" onClick={close} className="mt-5 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white">Done</button></div> : <form onSubmit={submit} className="mt-7 grid gap-5"><label className="text-sm font-semibold text-ink">Business or website name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-stone-200 px-4 font-normal outline-none focus:border-lime-600 focus:ring-2 focus:ring-lime-100" placeholder="Acme Dental" /></label><label className="text-sm font-semibold text-ink">Website URL<input required type="url" value={url} onChange={(event) => setUrl(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-stone-200 px-4 font-normal outline-none focus:border-lime-600 focus:ring-2 focus:ring-lime-100" placeholder="https://yourwebsite.com" /></label>{context === 'admin' && <label className="text-sm font-semibold text-ink">Client owner<select required value={ownerId} onChange={(event) => setOwnerId(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-stone-200 bg-white px-4 font-normal"><option value="">Select client</option>{owners.map((owner) => <option key={owner.id} value={owner.id}>{owner.name} · {owner.email}</option>)}</select></label>}{error && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}<p className="text-xs leading-5 text-stone-500">Adding a website does not change it. You will connect Google Search Console and approve any recommendations separately.</p><div className="flex justify-end gap-3"><button type="button" onClick={close} className="rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-700">Cancel</button><button className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white">Add website</button></div></form>}</section></div>
}
