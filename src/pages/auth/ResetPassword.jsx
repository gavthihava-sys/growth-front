import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { apiPost } from '../../lib/api'
import Logo from '../../components/common/Logo'

export default function ResetPassword() {
  const [params] = useSearchParams(); const [password, setPassword] = useState(''); const [confirm, setConfirm] = useState(''); const [message, setMessage] = useState(''); const [error, setError] = useState('')
  const submit = async (event) => { event.preventDefault(); setError(''); if (password !== confirm) return setError('Passwords do not match.'); try { const response = await apiPost('/api/auth/reset-password', { token: params.get('token'), password }); setMessage(response.message) } catch (requestError) { setError(requestError.message) } }
  return <main className="min-h-screen bg-paper px-6 py-10"><header className="mx-auto max-w-3xl"><Logo /></header><section className="mx-auto mt-20 max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-sm"><h1 className="text-2xl font-bold">Set a new password</h1>{message ? <><p className="mt-4 text-sm text-emerald-700">{message}</p><Link className="mt-6 inline-block font-semibold text-stone-500" to="/login">Return to login</Link></> : <form onSubmit={submit} className="mt-6 grid gap-4"><label className="text-sm font-semibold">New password<input required minLength="6" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-stone-200 px-3" /></label><label className="text-sm font-semibold">Confirm password<input required minLength="6" type="password" value={confirm} onChange={(event) => setConfirm(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-stone-200 px-3" /></label>{error && <p className="text-sm text-red-700">{error}</p>}<button className="min-h-11 rounded-xl bg-ink px-4 font-semibold text-white">Reset password</button></form>}</section></main>
}
