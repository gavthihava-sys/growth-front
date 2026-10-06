import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-bold tracking-tight ${light ? 'text-paper' : 'text-ink'}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-white"><Sparkles size={18} /></span>
      <span>Growth OS</span>
    </Link>
  )
}
