import { useEffect, useState } from 'react'
import AdminControlPage from './AdminControlPage'
import { apiGet } from '../../lib/api'

export default function Integrations() {
  const [data, setData] = useState(null)
  useEffect(() => { apiGet('/api/admin/integrations').then(setData).catch(() => {}) }, [])
  const items = [
    ['Google Search Console', 'OAuth authorization and search performance sync', data?.searchConsole?.status || 'Checking…'],
    ['Google Analytics 4', 'Sessions, users, conversions, and revenue', data?.analytics?.status || 'Checking…'],
    ['CRM webhook', 'Leads, sales, and conversion values stored in MongoDB', data?.crm?.status || 'Checking…'],
    ['SMTP notifications', 'Password reset and crawl-failure email delivery', data?.smtp?.status || 'Checking…'],
  ]
  return <AdminControlPage eyebrow="Platform integrations" title="API connections" description="Monitor shared providers and organization-level connection health." items={items} />
}
