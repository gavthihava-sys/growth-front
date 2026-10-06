const configuredApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
// Paths below already include /api; tolerate an older environment value that included it.
const API_URL = configuredApiUrl.replace(/\/+$/, '').replace(/\/api$/, '')

export async function apiGet(path) {
  const response = await fetch(`${API_URL}${path}`, { credentials: 'include' })
  if (!response.ok) throw new Error((await response.json().catch(() => null))?.error || `Request failed (${response.status})`)
  return response.json()
}

export async function apiPost(path, body = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error((await response.json().catch(() => null))?.error || `Request failed (${response.status})`)
  return response.json()
}

export { API_URL }
