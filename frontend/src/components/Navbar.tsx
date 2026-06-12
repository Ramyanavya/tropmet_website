import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ChevronRight, ArrowRight, LayoutDashboard } from 'lucide-react'
import ncmrwfLogo from '../assets/ncmrwf-logo.png'
import imsLogo from '../assets/ims-logo.png'

// Full nav (mobile drawer)
const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Conference', to: '/about' },
  { label: 'Themes', to: '/themes' },
  { label: 'Committees', to: '/committees' },
  {
    label: 'Call for Papers',
    to: '/call-for-papers',
    workflow: true,
    children: [
      { label: 'Author Registration',  to: '/author-registration', desc: 'Create your author account',            step: 1 },
      { label: 'Abstract Submission',  to: '/submit-abstract',     desc: 'Submit your research abstract',        step: 2 },
      { label: 'Review Process',       to: '/review-process',      desc: 'How abstracts are evaluated',          step: 3 },
      { label: 'Acceptance',           to: '/acceptance',          desc: 'Notifications & acceptance letters',   step: 4 },
      { label: 'Registration & Payment', to: '/registration',      desc: 'Pay conference fee via secure payment gateway',      step: 5 },
      { label: 'Spot Registration',    to: '/spot-registration',   desc: 'Register directly at the venue',       step: 6 },
    ]
  },
  { label: 'Programme Schedule',      to: '/schedule' },
  { label: 'Speakers',                to: '/speakers' },
  { label: 'Accommodation',           to: '/accommodation' },
  { label: 'Industry Exhibition',     to: '/industry-exhibition' },
  { label: 'Gallery',                 to: '/gallery' },
  { label: 'Places to Explore · Noida', to: '/explore-noida' },
  { label: 'Contact',                 to: '/contact' },
]

// Desktop primary strip
const primaryLinks = [
  { label: 'Home',   to: '/' },
  { label: 'About',  to: '/about' },
  { label: 'Themes', to: '/themes' },
  {
    label: 'Call for Papers',
    to: '/call-for-papers',
    workflow: true,
    children: [
      { label: 'Author Registration',    to: '/author-registration', desc: 'Create your author account',          step: 1 },
      { label: 'Abstract Submission',    to: '/submit-abstract',     desc: 'Submit your research abstract',      step: 2 },
      { label: 'Review Process',         to: '/review-process',      desc: 'How abstracts are evaluated',        step: 3 },
      { label: 'Acceptance',             to: '/acceptance',          desc: 'Notifications & acceptance letters', step: 4 },
      { label: 'Registration & Payment', to: '/registration',        desc: 'Pay conference fee via secure payment gateway',    step: 5 },
      { label: 'Spot Registration',      to: '/spot-registration',   desc: 'Register directly at the venue',     step: 6 },
    ]
  },
  { label: 'Programme', to: '/schedule' },
  { label: 'Speakers',  to: '/speakers' },
  {
    label: 'More',
    to: '#',
    children: [
      { label: 'Committees',              to: '/committees',     desc: 'Organizing & scientific committees' },
      { label: 'Accommodation',           to: '/accommodation',  desc: 'Hotels & transport info' },
      { label: 'Industry Exhibition',     to: '/industry-exhibition', desc: 'Exhibition & presentations' },
      { label: 'Gallery',                 to: '/gallery',        desc: 'Photos & media' },
      { label: 'Places to Explore · Noida', to: '/explore-noida', desc: 'Attractions & landmarks near venue' },
      { label: 'Contact',                 to: '/contact',        desc: 'Get in touch with organizers' },
    ]
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  useEffect(() => { setOpen(false); setDropdown(null); setMobileExpanded(null) }, [location])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled ? 'bg-white/97 shadow-lg backdrop-blur-sm border-b border-[#c8d9f0]' : 'bg-white border-b border-[#c8d9f0]'}`}>

      {/* Top deadline strip */}
      <div className="bg-[#0b2d5e] text-white text-xs py-1.5 text-center font-sans font-semibold tracking-wide">
        Abstract Deadline: <strong>15 Aug 2026</strong>&ensp;·&ensp;Early Bird: <strong>31 Oct 2026</strong>&ensp;·&ensp;Conference: <strong>19–21 Nov 2026, Noida</strong>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[64px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={ncmrwfLogo} alt="NCMRWF" className="w-10 h-10 object-contain rounded" />
            <img src={imsLogo}    alt="IMS"    className="w-10 h-10 object-contain rounded" />
            <div className="leading-none">
              <div className="text-[#0b2d5e] font-display font-bold text-base tracking-tight">
                TROPMET <span className="text-[#1a5fa8]">2026</span>
              </div>
              <div className="text-slate-500 font-sans text-[10px] tracking-widest uppercase">PRaGaTI · Noida</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-0">
            {primaryLinks.map(link =>
              link.children ? (
                <div key={link.label} className="relative"
                  onMouseEnter={() => setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}>
                  <button className={`flex items-center gap-1 px-2.5 py-2 text-[13px] font-sans font-medium transition-colors
                    ${link.workflow ? 'text-[#0b2d5e] hover:text-[#1a5fa8]' : 'text-slate-600 hover:text-[#0b2d5e]'}`}>
                    {link.label}
                    <ChevronDown size={12} className={`transition-transform ${dropdown === link.label ? 'rotate-180' : ''}`} />
                    {link.workflow && <span className="ml-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
                  </button>
                  {dropdown === link.label && (
                    <div className="absolute top-full left-0 mt-0 bg-white border border-[#c8d9f0] shadow-2xl rounded-xl py-2 z-50"
                      style={{ minWidth: link.workflow ? '270px' : '210px' }}>
                      {link.workflow && (
                        <div className="px-4 pt-1 pb-2 border-b border-[#e6effa] mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 font-sans">Submission Workflow</span>
                        </div>
                      )}
                      {link.children.map((c: any) => (
                        <Link key={c.to} to={c.to}
                          className="flex items-start gap-3 px-4 py-2.5 hover:bg-[#eef4fc] transition-colors group/item">
                          {link.workflow && c.step && (
                            <span className="w-5 h-5 rounded-full bg-[#0b2d5e] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 group-hover/item:bg-amber-500 transition-colors">
                              {c.step}
                            </span>
                          )}
                          <div>
                            <div className="text-sm font-sans font-semibold text-[#0b2d5e] flex items-center gap-1">
                              {c.label}
                              <ChevronRight size={11} className="opacity-0 group-hover/item:opacity-100 transition-opacity text-amber-500" />
                            </div>
                            {c.desc && <div className="text-xs text-slate-400 mt-0.5">{c.desc}</div>}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.to} to={link.to}
                  className={`px-2.5 py-2 text-[13px] font-sans font-medium transition-colors relative
                    ${location.pathname === link.to ? 'text-[#0b2d5e]' : 'text-slate-600 hover:text-[#0b2d5e]'}`}>
                  {link.label}
                  {location.pathname === link.to && (
                    <span className="absolute bottom-0 inset-x-2 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </Link>
              )
            )}

            {/* CTA buttons */}
            <Link to="/author-registration"
              className="ml-2 bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white text-xs px-4 py-2 font-bold rounded-lg transition-colors shadow-sm flex items-center gap-1.5">
              Submit Abstract <ArrowRight size={12} />
            </Link>

            {/* Login / Author Dashboard */}
            <Link to="/author-dashboard"
              className={`ml-1.5 flex items-center gap-1.5 border text-xs px-3 py-2 font-semibold rounded-lg transition-colors
                ${location.pathname === '/author-dashboard' ? 'bg-[#0b2d5e] text-white border-[#0b2d5e]' : 'border-[#c8d9f0] text-[#0b2d5e] hover:bg-[#eef4fc]'}`}>
              <LayoutDashboard size={13} /> Login
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="xl:hidden text-[#0b2d5e] p-2 rounded hover:bg-[#eef4fc]">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="xl:hidden border-t border-[#c8d9f0] pb-4 pt-2 max-h-[80vh] overflow-y-auto">
            {navLinks.map(link =>
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-sans font-medium text-slate-700 hover:bg-[#eef4fc] rounded-lg transition-colors">
                    <span className="flex items-center gap-2">
                      {link.label}
                      {link.workflow && <span className="text-[9px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Workflow</span>}
                    </span>
                    <ChevronDown size={14} className={`transition-transform text-slate-400 ${mobileExpanded === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === link.label && (
                    <div className="ml-3 mt-1 mb-1 border-l-2 border-[#c8d9f0] pl-3 space-y-0.5">
                      {link.children.map((c: any) => (
                        <Link key={c.to} to={c.to}
                          className="flex items-center gap-2 py-2 px-2 text-sm font-sans text-slate-600 hover:text-[#0b2d5e] rounded-lg hover:bg-[#eef4fc] transition-colors">
                          {link.workflow && c.step && (
                            <span className="w-5 h-5 rounded-full bg-[#0b2d5e]/10 text-[#0b2d5e] flex items-center justify-center text-[10px] font-bold shrink-0">
                              {c.step}
                            </span>
                          )}
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.to} to={link.to}
                  className={`block px-3 py-2.5 text-sm font-sans rounded-lg transition-colors
                    ${location.pathname === link.to ? 'text-[#0b2d5e] bg-[#eef4fc] font-semibold' : 'text-slate-600 hover:text-[#0b2d5e] hover:bg-[#eef4fc]'}`}>
                  {link.label}
                </Link>
              )
            )}
            <div className="px-3 pt-3 space-y-2 border-t border-[#e6effa] mt-2">
              <Link to="/author-registration" className="bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white w-full flex justify-center items-center gap-2 text-sm py-2.5 rounded-lg font-bold">
                Submit Abstract <ArrowRight size={14} />
              </Link>
              <Link to="/author-dashboard" className="text-center border border-[#c8d9f0] text-[#0b2d5e] text-xs font-semibold py-2 rounded-lg hover:bg-[#eef4fc] flex items-center justify-center gap-1">
                <LayoutDashboard size={12} /> Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
