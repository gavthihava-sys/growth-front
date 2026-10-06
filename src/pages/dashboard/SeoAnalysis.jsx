import { useEffect, useState } from 'react'
import FeaturePage from './FeaturePage'
import { apiGet, apiPost } from '../../lib/api'

export default function SeoAnalysis() {
  const [analysis, setAnalysis] = useState(null); const [running, setRunning] = useState(false)
  const load = () => apiGet('/api/seo-analysis').then(setAnalysis).catch(() => {})
  useEffect(() => { load() }, [])
  const run = async () => { setRunning(true); try { const response = await apiGet('/api/websites'); const website = response.websites?.find((item) => /^https?:\/\//i.test(item.url)); if (!website) throw new Error('Add a public http(s) website before running an analysis.'); await apiPost(`/api/websites/${website._id}/crawl`); await load() } catch (error) { setAnalysis((current) => ({ ...(current || {}), error: error.message })) } finally { setRunning(false) } }
  return <FeaturePage title="SEO analysis" description="Technical, on-page, content, and crawl insights from your connected Search Console property." score={analysis?.score ?? '…'} items={(analysis?.findings || []).map((finding) => [finding.name, finding.impact])} source={analysis?.source} websiteLabel={analysis?.siteUrl || 'Your website'} checkedAt={analysis?.syncedAt} error={analysis?.error} onRun={run} running={running} />
}
