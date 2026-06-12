import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const callForPapersLinks = [
  ['Call for Papers', '/call-for-papers'],
  ['Author Registration', '/registration'],
  ['Abstract Submission', '/submit-abstract'],
  ['Review Process', '/review-process'],
]

const conferenceLinks = [
  ['Home', '/'],
  ['About Conference', '/about'],
  ['Themes', '/themes'],
  ['Committees', '/committees'],
  ['Programme Schedule', '/schedule'],
  ['Speakers', '/speakers'],
]

const infoLinks = [
  ['Accommodation', '/accommodation'],
  ['Industry Exhibition', '/industry-exhibition'],
  ['Gallery', '/gallery'],
  ['Contact', '/contact'],
]

export default function Footer() {
  return (
    <footer className="bg-[#021b3e] text-sky-200">
      {/* Top amber rule */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      {/* CTA strip */}
      <div className="bg-[#0b2d5e]/60 border-b border-sky-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-white font-bold text-lg">Ready to submit your abstract?</p>
            <p className="text-sky-300 text-sm font-sans">Deadline: 15 August 2026 · Early bird ends 31 Oct 2026</p>
          </div>
          <Link to="/submit-abstract"
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#021b3e] font-bold text-sm px-6 py-2.5 rounded-lg transition-colors shadow-lg shrink-0">
            Submit Abstract <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="font-display text-white text-2xl font-bold mb-1">
            TROPMET <span className="text-amber-400">2026</span>
          </div>
          <div className="w-10 h-0.5 bg-amber-500 mb-4" />
          <p className="text-sm leading-relaxed text-sky-300 mb-1 font-sans">
            <em>PRaGaTI</em> — Physics-driven and AI-enabled Research for Advanced Guidance in Tropical Intelligence.
          </p>
          <p className="text-xs text-sky-400 mb-5 font-sans">19–21 November 2026 · NCMRWF, Noida, India</p>
          <div className="space-y-2 text-sm font-sans">
            <div className="flex items-start gap-2.5">
              <MapPin size={13} className="text-amber-400 mt-0.5 shrink-0" />
              <span className="text-sky-300">NCMRWF, A-50, Sector 62, Noida, UP 201309</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={13} className="text-amber-400 shrink-0" />
              <a href="tel:+919873344860" className="text-sky-300 hover:text-amber-400 transition-colors">+91 98733 44860</a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={13} className="text-amber-400 shrink-0" />
              <a href="mailto:imsnoidachapter@gmail.com" className="text-sky-300 hover:text-amber-400 transition-colors break-all">
                imsnoidachapter@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Call for Papers Workflow */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 font-sans flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Call for Papers
          </h4>
          <ul className="space-y-2">
            {callForPapersLinks.map(([label, to], i) => (
              <li key={to} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-sky-800 text-sky-300 flex items-center justify-center text-[9px] font-bold shrink-0">{i + 1}</span>
                <Link to={to} className="text-sm text-sky-300 hover:text-amber-400 transition-colors font-sans">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Conference links */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 font-sans">Conference</h4>
          <ul className="space-y-2">
            {conferenceLinks.map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-sm text-sky-300 hover:text-amber-400 transition-colors font-sans">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info links */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 font-sans">Information</h4>
          <ul className="space-y-2">
            {infoLinks.map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-sm text-sky-300 hover:text-amber-400 transition-colors font-sans">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-sky-800/40">
            <p className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-2 font-sans">Organised By</p>
            <p className="text-sky-300 text-xs font-sans leading-relaxed">Indian Meteorological Society (IMS), Noida Chapter</p>
            <p className="text-sky-400 text-xs font-sans mt-1">NCMRWF, Ministry of Earth Sciences</p>
          </div>
        </div>
      </div>

      <div className="border-t border-sky-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-sans text-sky-500">
          <span>© 2026 TROPMET · Indian Meteorological Society, Noida Chapter</span>
          <span>NCMRWF, Ministry of Earth Sciences, Government of India</span>
        </div>
      </div>
    </footer>
  )
}
