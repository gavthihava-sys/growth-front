import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/common/Logo'

const mainLinks = [['01', 'Home', '/'], ['02', 'Features', '/features'], ['03', 'Contact', '/contact']]

export default function MainLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && closeMenu()
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return <div className="min-h-screen bg-paper text-ink">
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200/70 bg-paper/90 backdrop-blur"><div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center px-5 py-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr]">
      <Logo />
      <nav className="hidden items-center gap-7 text-sm font-semibold text-stone-700 lg:col-start-2 lg:flex" aria-label="Desktop navigation"><Link className="transition hover:text-stone-500" to="/features">Features</Link><Link className="transition hover:text-stone-500" to="/contact">Contact</Link></nav>
      <div className="flex items-center justify-self-end gap-4 lg:col-start-3"><div className="hidden items-center gap-4 lg:flex"><Link className="text-sm font-semibold text-stone-700 transition hover:text-stone-500" to="/login">Log in</Link><Link className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink" to="/register">Get started</Link></div><button type="button" className={`grid h-11 w-11 place-items-center rounded-full border border-lime-300 transition focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 lg:hidden ${menuOpen ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-lime-100'}`} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
    </div></header>
    {menuOpen && <section id="site-menu" role="dialog" aria-modal="true" aria-label="Site menu" className="fixed inset-0 z-40 overflow-y-auto bg-ink px-6 pb-8 pt-28 text-paper lg:hidden"><div className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-xl content-between gap-12"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-lime-200/60">Menu</p><nav className="mt-6" aria-label="Mobile navigation"><ul className="space-y-1">{mainLinks.map(([number, label, href]) => <li key={label}><Link to={href} onClick={closeMenu} className="flex items-baseline gap-3 py-2 text-[clamp(3.1rem,14vw,5.5rem)] leading-[.9] text-paper transition hover:text-lime-200"><sup className="w-6 text-xs font-semibold tracking-normal text-lime-200/60">{number}</sup><span className="display-type">{label}</span></Link></li>)}</ul></nav></div><div className="border-t border-orange-100/20 pt-5"><Link onClick={closeMenu} to="/register" className="inline-flex items-center gap-2 font-semibold text-lime-200 hover:text-white">Start your audit <ArrowUpRight size={17} /></Link></div></div></section>}
    <div className="pt-20 sm:pt-24">{children}</div>
    <footer className="bg-paper px-6 py-14 text-stone-500"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto_1fr] md:items-end"><div><h2 className="display-type text-4xl leading-none">Growth OS</h2><p className="mt-2 text-sm text-stone-500/70">© {new Date().getFullYear()} Growth OS</p><div className="mt-6 flex gap-4 text-sm"><a className="transition hover:text-ink" href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a><a className="transition hover:text-ink" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></div></div><div className="text-left md:text-center"><p className="text-sm font-semibold uppercase tracking-[.18em]">Build visibility with intent.</p><div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm md:justify-center"><Link to="/features">Features</Link><Link to="/contact">Contact</Link><Link to="/privacy">Privacy</Link></div></div><div className="md:text-right"><p className="text-sm font-semibold uppercase tracking-[.18em]">Contact</p><a className="mt-3 inline-block text-sm transition hover:text-ink" href="mailto:hello@growthos.com">hello@growthos.com</a></div></div></footer>
  </div>
}
