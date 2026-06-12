import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ChevronRight, FileText, CheckCircle, Clock, Users, BookOpen, Award, Building2, Mic2, ArrowRight } from 'lucide-react'

// ── ABOUT ─────────────────────────────────────────────────
export function AboutPage() {
  const contacts = [
    { name: 'Dr. Ashish Routray',          role: 'Organizing Convener, NCMRWF',     chap: 'Chairman, IMS Noida Chapter',  phone: '+91 98733 44860', initial: 'AR' },
    { name: 'Dr. Desamsetti Srinivas',     role: 'Organizing Secretary, NCMRWF',    chap: 'Secretary, IMS Noida Chapter', phone: '+91 94916 86740', initial: 'DS' },
    { name: 'Dr. B.R.R Hari Prasad Kottu', role: 'Organizing Co-Convener, NCMRWF',  chap: 'Treasurer, IMS Noida Chapter', phone: '+91 94980 82732', initial: 'HP' },
  ]
  return (
    <div className="min-h-screen bg-[#f0f5fc] pt-28 pb-16">
      <div className="bg-gradient-to-r from-[#021b3e] to-[#0b2d5e] py-16 border-b border-sky-700/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-400 mb-2">About · 1st Circular</p>
          <h1 className="font-display text-4xl font-bold text-white mb-3">TROPMET 2026 — PRAGaTI</h1>
          <div className="w-10 h-0.5 bg-amber-400 mb-4" />
          <p className="text-sky-300 font-sans text-sm leading-relaxed">
            National Symposium on Physics-driven and AI-enabled Research for Advanced Guidance and Tropical Intelligence
            · 19–21 November 2026 · NCMRWF, Noida
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 space-y-8">
        <div className="bg-white border border-[#c8d9f0] rounded-2xl p-8 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-[#0b2d5e] mb-4">Jointly Hosted By</h2>
          <p className="font-sans text-base text-slate-700 leading-relaxed mb-2">
            <strong className="text-[#0b2d5e]">Indian Meteorological Society (IMS), Noida Chapter</strong>
          </p>
          <p className="font-sans text-base text-slate-700 leading-relaxed">
            <strong className="text-[#0b2d5e]">National Centre for Medium Range Weather Forecasting (NCMRWF)</strong>,
            Ministry of Earth Sciences, Sector-62, Noida, UP — under the auspices of the Indian Meteorological Society (IMS).
          </p>
        </div>

        <div className="bg-white border border-[#c8d9f0] rounded-2xl p-8 shadow-sm space-y-4">
          <h2 className="font-display text-2xl font-bold text-[#0b2d5e]">The Conference</h2>
          <p className="font-sans text-base text-slate-700 leading-relaxed">
            The increasing frequency and intensity of tropical weather and climate extremes — including cyclones, heavy rainfall,
            heat waves, and monsoon variability — demand more accurate and timely prediction systems. Physics-driven numerical
            models provide a fundamental understanding of atmospheric and oceanic processes, while Artificial Intelligence (AI)
            offers powerful capabilities for analyzing large volumes of observational and model-generated data. Integrating
            physics-based approaches with AI can significantly enhance forecast accuracy, early warning systems, and decision
            support. This synergy enables the development of advanced guidance products and tropical intelligence frameworks to
            improve preparedness, reduce risk, and enhance climate resilience in tropical regions.
          </p>
          <p className="font-sans text-base text-slate-700 leading-relaxed">
            The advanced HPC facilities at the NCMRWF play a pivotal role in running physics-based and AI-enabled hybrid
            modelling systems, thereby enhancing forecast accuracy, decision support, and tropical intelligence capabilities.
            These facilities enable high-resolution NWP, large-scale data assimilation, AI model development, and real-time
            analysis of tropical weather and climate systems, thereby improving forecast guidance, early warnings, and
            decision-support capabilities.
          </p>
          <p className="font-sans text-base text-slate-700 leading-relaxed">
            Considering the above aspects, the <strong className="text-teal-700">PRAGaTI</strong> theme of TROPMET-2026
            (19–21 November 2026) represents a bold new approach that integrates deep physical understanding with cutting-edge
            AI to deliver the next generation of accurate and actionable tropical forecasts — paving the way toward a resilient
            future. It also offers a unique opportunity to network with planners, researchers, educationists, extension
            personnel, and stakeholders at different levels to share their experiences and expertise and reduce the impacts of
            climate variability and natural disasters.
          </p>
        </div>

        <div className="border-l-4 border-amber-500 bg-white rounded-r-2xl p-8 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-[#0b2d5e] mb-3">Transport & Accommodation</h2>
          <p className="font-sans text-base text-slate-700 leading-relaxed">
            TROPMET-2026 has extremely limited resources for offering travel and accommodation support, and all participants are
            expected to secure support from their own sources. However, some support may be extended on a case-to-case basis
            subject to the availability of resources, with priority given to IMS members with no affiliations and students
            without financial support. As it is a peak tourist season for Delhi-NCR, we request that you book your accommodation
            in hotels in Noida at the earliest.
          </p>
        </div>

        <div className="bg-white border border-[#c8d9f0] rounded-2xl p-8 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-[#0b2d5e] mb-3">Industry Presentation & Exhibition</h2>
          <p className="font-sans text-base text-slate-700 leading-relaxed">
            Special sessions are planned to provide a platform for industry and entrepreneurs. A presentation slot of
            15–20 minutes will be provided to industry/entrepreneurs. Provision is also made for companies, start-ups, etc.
            to exhibit their products and services.
          </p>
        </div>

        <div className="bg-white border border-[#c8d9f0] rounded-2xl p-8 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-[#0b2d5e] mb-3">Venue</h2>
          <p className="font-sans text-base text-slate-700 leading-relaxed">
            NCMRWF, MoES, A-50, Sector-62, Noida, Uttar Pradesh — 201309.
          </p>
        </div>

        <div className="bg-white border border-[#c8d9f0] rounded-2xl p-8 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-[#0b2d5e] mb-5">Contacts</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {contacts.map(c => (
              <div key={c.name} className="border border-[#c8d9f0] rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0b2d5e] to-[#1a5fa8] rounded-xl flex items-center justify-center text-white font-bold text-sm mb-3">{c.initial}</div>
                <p className="font-sans font-bold text-[#0b2d5e] text-sm">{c.name}</p>
                <p className="text-slate-500 text-xs mt-1">{c.role}</p>
                <p className="text-slate-500 text-xs">{c.chap}</p>
                <p className="text-[#0b2d5e] text-xs mt-2 font-mono font-semibold">{c.phone}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-sm font-sans mt-5">
            E-mail for all correspondence:{' '}
            <a href="mailto:imsnoidachapter@gmail.com" className="text-amber-600 font-semibold hover:underline">
              imsnoidachapter@gmail.com
            </a>
          </p>
        </div>

        <div className="text-center">
          <Link to="/call-for-papers" className="inline-flex items-center gap-2 bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white px-8 py-3 text-sm font-bold rounded-lg transition-colors shadow-md">
            View Call for Papers <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}


// ── THEMES ────────────────────────────────────────────────
export function ThemesPage() {
  const themes = [
    "Extreme Weather Events: Prediction, Impact Assessment, and Early Warning Systems",
    "Satellite, Radar, and Multi-Platform Observations for Tropical Weather and Climate",
    "Advances in Numerical Weather Prediction and Seamless Forecasting",
    "Artificial Intelligence and Machine Learning Applications in Weather and Climate Science",
    "Physics-Driven and Hybrid AI Approaches for Tropical Meteorology and Forecasting",
    "Data Assimilation, Observing System Experiments, and Impact Studies",
    "Monsoon Dynamics, Land–Ocean–Atmosphere Interactions, and Tropical Processes",
    "Climate Variability, Climate Change, and Long-Term Tropical Climate Projections",
    "Forecast Verification, Uncertainty Quantification, and Process-Based Evaluation",
    "Weather and Climate Services for Agriculture, Water Resources, Disaster Risk Reduction, Transport, etc.",
    "Emerging Technologies and Future Observing Systems in Tropical Meteorology",
    "High-Impact Weather and Climate Extremes over the Indian Subcontinent and Surrounding Seas",
    "Multi-Scale Interactions: From Convective Scales to Large-Scale Tropical Dynamics",
    "Applications of Weather and Climate Intelligence for Societal Resilience and Sustainable Development",
    "Session themes from SAMA, IRS, AAM, OSI, etc.",
  ]
  return (
    <div className="min-h-screen bg-[#f0f5fc] pt-28 pb-16">
      <div className="bg-gradient-to-r from-[#021b3e] to-[#0b2d5e] py-16 border-b border-sky-700/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-400 mb-2">Research Areas</p>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Conference Themes</h1>
          <div className="w-10 h-0.5 bg-amber-400 mb-4" />
          <p className="text-sky-300 font-sans text-sm">PRaGaTI – TROPMET 2026 covers 15 cutting-edge research themes</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10 space-y-2.5">
        {themes.map((theme, i) => (
          <div key={i} className="bg-white border border-[#c8d9f0] rounded-xl p-5 flex items-start gap-4 hover:shadow-md hover:border-[#0b2d5e]/30 transition-all group">
            <div className="w-9 h-9 bg-gradient-to-br from-[#0b2d5e] to-[#1a5fa8] text-white rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 group-hover:scale-110 transition-transform shadow-sm">
              {String(i + 1).padStart(2, '0')}
            </div>
            <p className="font-sans text-sm text-slate-700 leading-relaxed pt-1 group-hover:text-[#0b2d5e] transition-colors">{theme}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/submit-abstract" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#021b3e] px-8 py-3 text-sm font-bold rounded-full transition-all shadow-lg hover:scale-105">
          Submit Your Abstract <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}


// ── COMMITTEES ────────────────────────────────────────────
export function CommitteesPage() {
  const organizing = [
    { name: 'Dr. Ashish Routray', role: 'Organizing Convener', org: 'NCMRWF, MoES', badge: 'Chairman, IMS Noida Chapter' },
    { name: 'Dr. Desamsetti Srinivas', role: 'Organizing Secretary', org: 'NCMRWF, MoES', badge: 'Secretary, IMS Noida Chapter' },
    { name: 'Dr. B.R.R Hari Prasad Kottu', role: 'Organizing Co-Convener', org: 'NCMRWF, MoES', badge: 'Treasurer, IMS Noida Chapter' },
  ]
  return (
    <div className="min-h-screen bg-[#f0f5fc] pt-28 pb-16">
      <div className="bg-gradient-to-r from-[#021b3e] to-[#0b2d5e] py-16 border-b border-sky-700/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-400 mb-2">Leadership</p>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Committees</h1>
          <div className="w-10 h-0.5 bg-amber-400 mb-4" />
          <p className="text-sky-300 font-sans text-sm">Organizing & Scientific Committees of TROPMET 2026</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 space-y-10">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0b2d5e] mb-6 flex items-center gap-3">
            <Users size={22} className="text-amber-500" /> Organizing Committee
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {organizing.map(m => (
              <div key={m.name} className="bg-white border border-[#c8d9f0] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#0b2d5e]/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0b2d5e] to-[#1a5fa8] rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4 shadow-md">
                  {m.name.split(' ').slice(-1)[0][0]}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{m.role}</span>
                <h3 className="font-sans font-bold text-[#0b2d5e] text-sm mt-2 mb-0.5">{m.name}</h3>
                <p className="text-slate-500 text-xs">{m.org}</p>
                <p className="text-teal-700 text-xs font-semibold mt-1">{m.badge}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <p className="text-amber-800 font-sans text-sm leading-relaxed">
            <strong>Scientific Committee</strong> members will be announced shortly. For committee-related inquiries, contact{' '}
            <a href="mailto:imsnoidachapter@gmail.com" className="font-bold underline">imsnoidachapter@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}


// ── CALL FOR PAPERS ───────────────────────────────────────
export function CallForPapersPage() {
  const workflowSteps = [
    { step: 1, title: 'Author Registration',           desc: 'Create your author account on the portal to access all submission features.',                                    action: 'Register Now',    link: '/author-registration',  color: 'from-[#0b2d5e] to-[#1a5fa8]' },
    { step: 2, title: 'Abstract Submission',            desc: 'Submit your research abstract (max 350 words) through your author dashboard by 15 August 2026.',               action: 'Submit Abstract',  link: '/submit-abstract',      color: 'from-teal-700 to-teal-500' },
    { step: 3, title: 'Review',                          desc: 'The secretariat checks your abstract for compliance and assigns it to a domain-expert reviewer, who then evaluates it for originality, relevance, and scientific merit.',  action: 'Review Process',  link: '/review-process',       color: 'from-violet-700 to-violet-500' },
    { step: 4, title: 'Acceptance / Rejection',         desc: 'Authors are notified of the decision by 30 August 2026. Accepted authors proceed to confirmation.',            action: 'See Timeline',    link: '/acceptance',           color: 'from-amber-600 to-amber-400' },
    { step: 5, title: 'Confirmation of Participation',  desc: 'Accepted authors confirm participation and begin registration by 15 September 2026.',                          action: 'Confirm',         link: '/acceptance',           color: 'from-orange-600 to-orange-500' },
    { step: 6, title: 'Online Registration & Payment',  desc: 'Pay the conference fee via secure payment gateway. Early Bird rates apply through 31 October 2026.',           action: 'Register',        link: '/registration',         color: 'from-green-700 to-green-500' },
    { step: 7, title: 'Confirmation & ID Card',         desc: 'After successful payment you receive a confirmation email and a downloadable ID card required for entry.',     action: 'See Sample',      link: '/registration#confirm', color: 'from-rose-700 to-rose-500' },
  ]
  return (
    <div className="min-h-screen bg-[#f0f5fc] pt-28 pb-16">
      <div className="bg-gradient-to-r from-[#021b3e] to-[#0b2d5e] py-16 border-b border-sky-700/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-400 mb-2">Participate</p>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Call for Papers</h1>
          <div className="w-10 h-0.5 bg-amber-400 mb-4" />
          <p className="text-sky-300 font-sans text-sm leading-relaxed max-w-2xl">
            Original research papers from India and abroad, covering TROPMET-2026 themes and sub-themes, are invited for presentation.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 space-y-10">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0b2d5e] mb-1">Submission & Participation Workflow</h2>
          <p className="text-slate-500 font-sans text-sm mb-8">Follow all 7 steps — from abstract submission to collecting your ID card at the venue.</p>
          <div className="relative">
            <div className="absolute hidden md:block w-0.5 bg-gradient-to-b from-[#0b2d5e] via-teal-500 to-rose-500 top-8 bottom-8" style={{left:'2.5rem'}} />
            <div className="space-y-4">
              {workflowSteps.map((s) => (
                <div key={s.step} className="flex gap-6 items-start">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center text-lg font-bold shadow-lg shrink-0 z-10`}>
                    {s.step}
                  </div>
                  <div className="bg-white border border-[#c8d9f0] rounded-2xl p-5 flex-1 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-sans font-bold text-[#0b2d5e] text-base mb-1">{s.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                    <Link to={s.link} className="shrink-0 inline-flex items-center gap-1.5 bg-[#f0f5fc] hover:bg-[#0b2d5e] hover:text-white text-[#0b2d5e] border border-[#c8d9f0] hover:border-[#0b2d5e] px-4 py-2 rounded-lg text-xs font-bold transition-all">
                      {s.action} <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-white/80 mb-1">Also available</p>
            <h3 className="font-display text-xl font-bold text-white mb-1">Spot / On-site Registration</h3>
            <p className="text-white/90 text-sm max-w-lg">Did not submit an abstract? Walk-in and register at the venue on 19–21 November 2026. Higher fees apply.</p>
          </div>
          <Link to="/spot-registration" className="shrink-0 bg-white text-amber-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-amber-50 flex items-center gap-2">
            Spot Registration <ArrowRight size={15} />
          </Link>
        </div>

        <div className="bg-white border border-[#c8d9f0] rounded-2xl p-8 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-[#0b2d5e] mb-5">Abstract Guidelines</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { t: 'Word Limit',         d: 'Abstracts must not exceed 350 words.' },
              { t: 'Template',           d: 'Use the official template at www.tropmet2026.in' },
              { t: 'Original Research',  d: 'Papers must represent original unpublished research.' },
              { t: 'Themes',            d: 'Must correspond to one of the 15 TROPMET-2026 sub-themes.' },
              { t: 'Language',          d: 'All submissions must be in English.' },
              { t: 'Author Eligibility', d: 'Open to researchers, scientists, and students from India and abroad.' },
            ].map(item => (
              <div key={item.t} className="flex items-start gap-3 p-4 bg-[#f0f5fc] rounded-xl">
                <CheckCircle size={16} className="text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-sans font-bold text-[#0b2d5e] text-sm">{item.t}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#021b3e] to-[#0b2d5e] rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock size={20} className="text-amber-400" /> Important Dates
          </h2>
          <div className="space-y-3">
            {[
              ['Abstract Submission Deadline',  '15 August 2026',    true],
              ['Intimation on Acceptance',      '30 August 2026',    false],
              ['Confirmation of Participation', '15 September 2026', true],
              ['Online Registration Opens',     '15 September 2026', false],
              ['Early Bird Registration Ends',  '31 October 2026',   true],
              ['Conference Dates',              '19–21 November 2026', false],
            ].map(([event, date, isDeadline]) => (
              <div key={event as string} className="flex items-center justify-between py-3 border-b border-sky-700/30 last:border-0">
                <span className="text-sky-200 font-sans text-sm">{event}</span>
                <span className={`font-bold font-sans text-sm ${isDeadline ? 'text-amber-400' : 'text-white'}`}>{date as string}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Link to="/author-dashboard" className="bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white rounded-2xl p-5 text-center transition-all hover:scale-105 shadow-md">
            <div className="text-2xl mb-2">👤</div>
            <div className="font-bold text-sm">Author Dashboard</div>
            <div className="text-xs text-sky-300 mt-0.5">Track your submission</div>
          </Link>
          <Link to="/reviewer" className="bg-teal-700 hover:bg-teal-800 text-white rounded-2xl p-5 text-center transition-all hover:scale-105 shadow-md">
            <div className="text-2xl mb-2">🔍</div>
            <div className="font-bold text-sm">Reviewer Dashboard</div>
            <div className="text-xs text-teal-200 mt-0.5">Review assigned abstracts</div>
          </Link>
          <Link to="/admin" className="bg-rose-700 hover:bg-rose-800 text-white rounded-2xl p-5 text-center transition-all hover:scale-105 shadow-md">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-bold text-sm">Admin Dashboard</div>
            <div className="text-xs text-rose-200 mt-0.5">Manage conference</div>
          </Link>
        </div>

        <div className="text-center">
          <Link to="/author-registration" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#021b3e] px-8 py-3.5 rounded-full font-bold text-base transition-all shadow-lg hover:scale-105">
            Start: Register as Author <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── REVIEW PROCESS ────────────────────────────────────────
export function ReviewProcessPage() {
  return (
    <div className="min-h-screen bg-[#f0f5fc] pt-28 pb-16">
      <div className="bg-gradient-to-r from-[#021b3e] to-[#0b2d5e] py-16 border-b border-sky-700/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-400 mb-2">Evaluation</p>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Review Process</h1>
          <div className="w-10 h-0.5 bg-amber-400 mb-4" />
          <p className="text-sky-300 font-sans text-sm">How your abstract is evaluated and what happens after submission</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 space-y-8">
        <div className="bg-white border border-[#c8d9f0] rounded-2xl p-8 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-[#0b2d5e] mb-6">Review Steps</h2>
          <div className="space-y-6">
            {[
              { n: '01', t: 'Submission', d: 'Author submits abstract (max 350 words) via the online portal by 15 August 2026.' },
              { n: '02', t: 'Technical Check', d: 'Secretariat reviews abstract for format compliance, word limit, and theme alignment.' },
              { n: '03', t: 'Scientific Review', d: 'Abstract is reviewed by the Scientific Committee for novelty, relevance, and scientific merit.' },
              { n: '04', t: 'Decision', d: 'Authors are notified of acceptance/revision/rejection by 30 August 2026.' },
              { n: '05', t: 'Confirmation', id: 'acceptance', d: 'Accepted authors confirm participation and complete registration by 15 September 2026.' },
            ].map(step => (
              <div key={step.n} id={step.id} className="flex gap-5 items-start">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0b2d5e] to-[#1a5fa8] rounded-xl flex items-center justify-center text-white font-mono font-bold text-xs shadow-md shrink-0">{step.n}</div>
                <div className="border-b border-[#e6effa] pb-5 flex-1 last:border-0">
                  <h3 className="font-sans font-bold text-[#0b2d5e] mb-1">{step.t}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6">
          <h3 className="font-sans font-bold text-teal-900 mb-2 flex items-center gap-2"><Award size={16} /> Criteria for Selection</h3>
          <ul className="space-y-1.5 text-sm font-sans text-teal-800">
            <li className="flex items-center gap-2"><CheckCircle size={13} /> Scientific originality and novelty</li>
            <li className="flex items-center gap-2"><CheckCircle size={13} /> Relevance to TROPMET 2026 themes</li>
            <li className="flex items-center gap-2"><CheckCircle size={13} /> Clarity and quality of writing</li>
            <li className="flex items-center gap-2"><CheckCircle size={13} /> Methodological soundness</li>
            <li className="flex items-center gap-2"><CheckCircle size={13} /> Potential impact and applicability</li>
          </ul>
        </div>

        <div className="text-center">
          <Link to="/submit-abstract" className="inline-flex items-center gap-2 bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white px-8 py-3 rounded-lg font-bold text-sm transition-colors shadow-md">
            Submit Abstract <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}


// ── SCHEDULE ──────────────────────────────────────────────
export function SchedulePage() {
  const schedule = [
    { date: '19 November 2026', day: 'Day 1', events: [
      { time: '09:00 AM', title: 'Registration & Welcome', type: 'admin' },
      { time: '10:00 AM', title: 'Inaugural Ceremony', type: 'ceremony' },
      { time: '11:30 AM', title: 'Keynote: Advances in Tropical AI Forecasting', type: 'keynote' },
      { time: '01:00 PM', title: 'Lunch Break', type: 'break' },
      { time: '02:00 PM', title: 'Technical Sessions – Theme 1 & 2', type: 'session' },
      { time: '05:00 PM', title: 'Poster Session', type: 'session' },
    ]},
    { date: '20 November 2026', day: 'Day 2', events: [
      { time: '09:00 AM', title: 'Keynote: Physics-Driven ML Models', type: 'keynote' },
      { time: '10:30 AM', title: 'Technical Sessions – Theme 3, 4 & 5', type: 'session' },
      { time: '01:00 PM', title: 'Lunch Break', type: 'break' },
      { time: '02:00 PM', title: 'Industry Presentations & Exhibitions', type: 'industry' },
      { time: '04:30 PM', title: 'Panel Discussion: Future of AI in Meteorology', type: 'panel' },
    ]},
    { date: '21 November 2026', day: 'Day 3', events: [
      { time: '09:00 AM', title: 'Technical Sessions – Theme 6, 7 & 8', type: 'session' },
      { time: '11:00 AM', title: 'Special Sessions – SAMA, IRS, AAM, OSI', type: 'session' },
      { time: '01:00 PM', title: 'Lunch Break', type: 'break' },
      { time: '02:00 PM', title: 'Award Ceremony & Best Paper Awards', type: 'ceremony' },
      { time: '03:30 PM', title: 'Valedictory & Closing Session', type: 'ceremony' },
    ]},
  ]
  const typeStyle: Record<string, string> = {
    keynote:  'bg-amber-50 text-amber-800 border-amber-200',
    session:  'bg-sky-50 text-sky-800 border-sky-200',
    break:    'bg-stone-100 text-stone-600 border-stone-200',
    ceremony: 'bg-violet-50 text-violet-800 border-violet-200',
    admin:    'bg-emerald-50 text-emerald-800 border-emerald-200',
    industry: 'bg-orange-50 text-orange-800 border-orange-200',
    panel:    'bg-teal-50 text-teal-800 border-teal-200',
  }
  return (
    <div className="min-h-screen bg-[#f0f5fc] pt-28 pb-16">
      <div className="bg-gradient-to-r from-[#021b3e] to-[#0b2d5e] py-16 border-b border-sky-700/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-400 mb-2">Programme</p>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Conference Schedule</h1>
          <div className="w-10 h-0.5 bg-amber-400 mb-4" />
          <p className="text-sky-300 font-sans text-sm">19–21 November 2026 · NCMRWF, Noida</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10 space-y-6">
        {schedule.map(day => (
          <div key={day.day} className="overflow-hidden rounded-2xl shadow-sm border border-[#c8d9f0]">
            <div className="bg-gradient-to-r from-[#0b2d5e] to-[#1a5fa8] text-white px-6 py-4 flex justify-between items-center">
              <span className="font-display font-bold text-lg">{day.day}</span>
              <span className="text-amber-300 font-sans text-sm font-semibold">{day.date}</span>
            </div>
            <div className="bg-white divide-y divide-[#e6effa]">
              {day.events.map((ev, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#f0f5fc] transition-colors">
                  <span className="font-mono text-xs text-slate-500 w-20 shrink-0">{ev.time}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded border w-20 text-center shrink-0 ${typeStyle[ev.type] || 'bg-stone-100'}`}>{ev.type}</span>
                  <span className="font-sans text-sm text-slate-700 font-medium">{ev.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


// ── CONTACT ───────────────────────────────────────────────
export function ContactPage() {
  const contacts = [
    { title: 'Organizing Convener',    name: 'Dr. Ashish Routray',          role: 'NCMRWF', chap: 'Chairman, IMS Noida Chapter',  phone: '+91 98733 44860', initial: 'AR' },
    { title: 'Organizing Secretary',   name: 'Dr. Desamsetti Srinivas',     role: 'NCMRWF', chap: 'Secretary, IMS Noida Chapter', phone: '+91 94916 86740', initial: 'DS' },
    { title: 'Organizing Co-Convener', name: 'Dr. B.R.R Hari Prasad Kottu', role: 'NCMRWF', chap: 'Treasurer, IMS Noida Chapter', phone: '+91 94980 82732', initial: 'HP' },
  ]
  return (
    <div className="min-h-screen bg-[#f0f5fc] pt-28 pb-16">
      <div className="bg-gradient-to-r from-[#021b3e] to-[#0b2d5e] py-16 border-b border-sky-700/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-400 mb-2">Get in Touch</p>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Contact Us</h1>
          <div className="w-10 h-0.5 bg-amber-400 mb-4" />
          <p className="text-sky-300 font-sans text-sm">NCMRWF, A-50, Sector-62, Noida, Uttar Pradesh — 201309</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 space-y-8">
        <div className="grid md:grid-cols-3 gap-5">
          {contacts.map(p => (
            <div key={p.title} className="bg-white rounded-2xl border border-[#c8d9f0] p-6 shadow-sm hover:shadow-md hover:border-[#0b2d5e]/30 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0b2d5e] to-[#1a5fa8] rounded-xl flex items-center justify-center text-white font-display font-bold text-lg mb-4 shadow-md group-hover:scale-110 transition-transform">
                {p.initial}
              </div>
              <div className="inline-block bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2">{p.title}</div>
              <h3 className="font-sans font-bold text-[#0b2d5e] text-sm mb-0.5">{p.name}</h3>
              <p className="font-sans text-slate-500 text-xs">{p.role}</p>
              <p className="font-sans text-slate-500 text-xs mb-3">{p.chap}</p>
              <a href={`tel:${p.phone.replace(/\s/g,'')}`} className="flex items-center gap-2 text-xs font-mono font-bold text-[#0b2d5e] hover:text-amber-600 transition-colors">
                <Phone size={11} /> {p.phone}
              </a>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#c8d9f0] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <a href="https://maps.app.goo.gl/vYV6CNp3upRn38me6" target="_blank" rel="noopener noreferrer" className="block relative group">
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=NCMRWF+Sector+62+Noida&zoom=15&size=600x300&markers=color:red%7C28.6139,77.3900&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNQ8`}
                alt="NCMRWF Location Map"
                className="w-full h-52 object-cover"
                onError={(e) => {
                  const t = e.currentTarget.parentElement!
                  t.innerHTML = `<div class="w-full h-52 bg-gradient-to-br from-[#e6effa] to-[#c8d9f0] flex flex-col items-center justify-center gap-3 p-6">
                    <div class="w-14 h-14 bg-[#0b2d5e] rounded-full flex items-center justify-center text-white text-2xl">📍</div>
                    <div class="text-center">
                      <div class="font-bold text-[#0b2d5e] text-sm">NCMRWF, Sector-62, Noida</div>
                      <div class="text-slate-500 text-xs mt-1">Click to open in Google Maps</div>
                    </div>
                  </div>`
                }}
              />
              <div className="absolute inset-0 bg-[#021b3e]/20 group-hover:bg-[#021b3e]/5 transition-colors flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 font-sans font-bold text-sm text-[#0b2d5e] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <MapPin size={14} className="text-amber-500" /> Open in Google Maps
                </div>
              </div>
            </a>
            <div className="p-5">
              <h3 className="font-sans font-bold text-[#0b2d5e] text-sm mb-3 flex items-center gap-2">
                <MapPin size={14} className="text-amber-500" /> Venue Location
              </h3>
              <p className="text-slate-600 text-xs font-sans leading-relaxed mb-3">
                NCMRWF, Ministry of Earth Sciences<br />
                A-50, Sector-62, Noida, Uttar Pradesh — 201309
              </p>
              <a href="https://maps.app.goo.gl/vYV6CNp3upRn38me6" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                <MapPin size={11} /> Get Directions
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#c8d9f0] p-6 shadow-sm space-y-5">
            <div className="space-y-3">
              <h3 className="font-display text-lg font-bold text-[#0b2d5e] mb-3">Reach Us</h3>
              <div className="flex items-center gap-3 text-sm font-sans">
                <div className="w-8 h-8 bg-[#f0f5fc] rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={13} className="text-amber-500" />
                </div>
                <a href="tel:+919873344860" className="text-slate-600 hover:text-amber-600 transition-colors">+91 98733 44860</a>
              </div>
              <div className="flex items-center gap-3 text-sm font-sans">
                <div className="w-8 h-8 bg-[#f0f5fc] rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={13} className="text-amber-500" />
                </div>
                <a href="mailto:imsnoidachapter@gmail.com" className="text-slate-600 hover:text-amber-600 transition-colors break-all">imsnoidachapter@gmail.com</a>
              </div>
              <div className="flex items-start gap-3 text-sm font-sans">
                <div className="w-8 h-8 bg-[#f0f5fc] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={13} className="text-amber-500" />
                </div>
                <span className="text-slate-600">NCMRWF, A-50, Sector 62, Noida, UP 201309</span>
              </div>
            </div>
            <hr className="border-[#e6effa]" />
            <h3 className="font-sans font-bold text-[#0b2d5e] text-sm">Send a Message</h3>
            <div className="space-y-3">
              {['Your Name', 'Email Address', 'Subject'].map(p => (
                <div key={p}>
                  <input className="field" placeholder={p} type={p === 'Email Address' ? 'email' : 'text'} />
                </div>
              ))}
              <textarea className="field" rows={3} placeholder="Your message…" />
              <button className="btn-primary w-full justify-center py-2.5 text-sm">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


// ── ACCOMMODATION ─────────────────────────────────────────
export function AccommodationPage() {
  const hotels = [
    { name: 'Radisson Blu Hotel Noida', dist: '~3.5 km from NCMRWF', stars: 5, area: 'Sector 55, Noida', note: 'Premium option — book early, peak season' },
    { name: 'ibis Styles Noida', dist: '~2.8 km from NCMRWF', stars: 3, area: 'Sector 62, Noida', note: 'Close to venue, good value' },
    { name: 'Lemon Tree Hotel Noida', dist: '~4 km from NCMRWF', stars: 4, area: 'Sector 60, Noida', note: 'Popular with conference delegates' },
    { name: 'Holiday Inn Express Noida', dist: '~3 km from NCMRWF', stars: 3, area: 'Sector 62, Noida', note: 'Walking distance to venue' },
    { name: 'The Leela Ambience Gurugram', dist: '~40 km via NH48', stars: 5, area: 'Gurugram', note: 'Luxury option if travelling from Delhi side' },
    { name: 'OYO / Budget Hotels', dist: 'Various', stars: 2, area: 'Sector 18, 62 & 63, Noida', note: 'Multiple budget options near metro stations' },
  ]

  return (
    <div className="min-h-screen bg-[#f0f5fc] pt-28 pb-16">
      <div className="bg-gradient-to-r from-[#021b3e] to-[#0b2d5e] py-16 border-b border-sky-700/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-400 mb-2">Stay & Travel</p>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Accommodation</h1>
          <div className="w-10 h-0.5 bg-amber-400 mb-4" />
          <p className="text-sky-300 font-sans text-sm leading-relaxed max-w-2xl">
            November is peak tourist season for Delhi-NCR. We strongly recommend booking your accommodation early.
            TROPMET-2026 has limited resources for accommodation support — all participants are expected to arrange their own stay.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10 space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4">
          <span className="text-2xl">⚠️</span>
          <div className="text-sm font-sans text-amber-800">
            <strong>Important:</strong> November 2026 is a peak tourist season in Delhi-NCR. Hotels in Noida (Sectors 18, 55–63) and
            Indirapuram fill up fast. <strong>Please book your accommodation well in advance.</strong> Limited case-by-case support
            may be available — priority to IMS members without affiliations and students without financial support.
          </div>
        </div>

        <div className="bg-white border border-[#c8d9f0] rounded-2xl p-6 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-[#0b2d5e] mb-3">Conference Venue</h2>
          <div className="flex items-start gap-3 text-sm font-sans text-slate-700">
            <span className="text-xl mt-0.5">📍</span>
            <div>
              <p className="font-bold text-[#0b2d5e]">NCMRWF, Ministry of Earth Sciences</p>
              <p>A-50, Sector-62, Noida, Uttar Pradesh — 201309</p>
              <a href="https://maps.google.com/?q=NCMRWF+Sector+62+Noida"
                target="_blank" rel="noopener noreferrer"
                className="text-amber-600 font-semibold hover:text-amber-800 mt-1 inline-block">
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-[#0b2d5e] mb-4">Nearby Hotels</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {hotels.map((h, i) => (
              <div key={i} className="bg-white border border-[#c8d9f0] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#0b2d5e]/30 transition-all">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-sans font-bold text-[#0b2d5e] text-sm leading-tight">{h.name}</h3>
                  <span className="text-yellow-400 text-xs shrink-0">{'★'.repeat(h.stars)}</span>
                </div>
                <p className="text-xs font-sans text-slate-500 mb-1">📍 {h.area}</p>
                <p className="text-xs font-sans text-teal-700 font-semibold mb-2">🚗 {h.dist}</p>
                <p className="text-xs font-sans text-slate-500 italic">{h.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#c8d9f0] rounded-2xl p-6 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-[#0b2d5e] mb-4">Getting There</h2>
          <div className="space-y-4 text-sm font-sans text-slate-700">
            {[
              { e: '🚇', h: 'By Metro', d: 'Take the Blue Line to Sector 62 Metro Station (Aqua Line) — NCMRWF is ~10 min by auto/cab from there.' },
              { e: '✈️', h: 'From Delhi Airport (IGI)', d: '~35–50 km via NH-48 / Yamuna Expressway. Approx 1–1.5 hrs by cab depending on traffic.' },
              { e: '🚆', h: 'From New Delhi Railway Station', d: '~25 km. Take Metro (Blue Line) to Noida City Centre, then Aqua Line to Sector 62, ~45 mins total.' },
              { e: '🚕', h: 'Cab / App-based Rides', d: 'Ola, Uber and Rapido are widely available in Noida. Pre-book for airport pickups during peak season.' },
            ].map(item => (
              <div key={item.h} className="flex gap-3">
                <span className="text-xl">{item.e}</span>
                <div>
                  <p className="font-bold text-[#0b2d5e]">{item.h}</p>
                  <p>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#f0f5fc] border border-[#c8d9f0] rounded-2xl p-5 text-sm font-sans text-slate-700">
          For accommodation-related queries, write to: <a href="mailto:imsnoidachapter@gmail.com" className="font-bold text-amber-600 hover:underline">imsnoidachapter@gmail.com</a>
        </div>
      </div>
    </div>
  )
}


// ── INDUSTRY EXHIBITION ───────────────────────────────────
export function IndustryExhibitionPage() {
  return (
    <div className="min-h-screen bg-[#f0f5fc] pt-28 pb-16">
      <div className="bg-gradient-to-r from-[#021b3e] to-[#0b2d5e] py-16 border-b border-sky-700/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-400 mb-2">Business & Innovation</p>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Industry Exhibition</h1>
          <div className="w-10 h-0.5 bg-amber-400 mb-4" />
          <p className="text-sky-300 font-sans text-sm leading-relaxed max-w-2xl">
            Special sessions and exhibition spaces for industry, entrepreneurs, and technology companies to showcase innovations in weather and climate science.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#c8d9f0] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0b2d5e] to-[#1a5fa8] rounded-xl flex items-center justify-center mb-5 shadow-md">
              <Mic2 size={22} className="text-white" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#0b2d5e] mb-3">Industry Presentations</h2>
            <p className="font-sans text-slate-600 text-sm leading-relaxed mb-4">
              Special sessions are planned to provide a platform for industry and entrepreneurs. A dedicated presentation slot of <strong>15–20 minutes</strong> will be provided to each industry/entrepreneur participant.
            </p>
            <ul className="space-y-2 text-sm font-sans text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-600 shrink-0" /> 15–20 minute presentation slot</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-600 shrink-0" /> Dedicated audience of researchers & decision-makers</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-600 shrink-0" /> AV support provided</li>
            </ul>
          </div>

          <div className="bg-white border border-[#c8d9f0] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-5 shadow-md">
              <Building2 size={22} className="text-white" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#0b2d5e] mb-3">Product Exhibition</h2>
            <p className="font-sans text-slate-600 text-sm leading-relaxed mb-4">
              Provision is made for companies, start-ups, and technology providers to exhibit their products and services to conference participants over all three days.
            </p>
            <ul className="space-y-2 text-sm font-sans text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-600 shrink-0" /> Exhibition stalls over 3 conference days</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-600 shrink-0" /> Open to companies, start-ups & entrepreneurs</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-600 shrink-0" /> Networking with 300+ scientists & researchers</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#021b3e] to-[#0b2d5e] rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold text-white mb-5">Exhibition Fee</h2>
          <div className="bg-white/10 border border-white/20 rounded-xl p-5 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-sans font-bold text-lg">Industry Exhibitions</p>
                <p className="text-sky-300 text-sm font-sans">Full exhibition package (3 days)</p>
              </div>
              <div className="text-right">
                <p className="text-amber-400 font-display font-bold text-2xl">₹ 1,00,000/-</p>
                <p className="text-sky-400 text-xs font-sans">onwards</p>
              </div>
            </div>
          </div>
          <p className="text-sky-300 text-sm font-sans">
            Payment via net banking, UPI, bank drafts, or credit cards. For stall booking and sponsorship inquiries, contact:{' '}
            <a href="mailto:imsnoidachapter@gmail.com" className="text-amber-400 font-bold hover:underline">imsnoidachapter@gmail.com</a>
          </p>
        </div>

        <div className="text-center">
          <a href="mailto:imsnoidachapter@gmail.com?subject=Industry Exhibition - TROPMET 2026"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#021b3e] px-8 py-3.5 rounded-full font-bold text-base transition-all shadow-lg hover:scale-105">
            Enquire About Exhibition <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}

// ── EXPLORE NOIDA ──────────────────────────────────────────
const NOIDA_PLACES = [
  {
    name: 'Okhla Bird Sanctuary',
    category: 'Nature & Wildlife',
    importance: 'A serene bird sanctuary on the Yamuna river hosting 300+ migratory and resident bird species. Ideal for birdwatching, nature walks, and photography — especially between October and March.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&q=80',
    emoji: '🦅',
  },
  {
    name: 'ISKCON Temple Noida',
    category: 'Spiritual & Cultural',
    importance: 'One of the most magnificent ISKCON temples in India, featuring stunning architecture, daily devotional programs, and a peaceful spiritual atmosphere. A must-visit landmark.',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=600&q=80',
    emoji: '🛕',
  },
  {
    name: 'The Great India Place (GIP) Mall',
    category: 'Shopping & Entertainment',
    importance: 'One of NCR\'s largest malls with 300+ stores, a massive food court, bowling alley, and entertainment zones. Perfect for shopping, dining, and unwinding after conference sessions.',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80',
    emoji: '🛍️',
  },
  {
    name: 'Botanical Garden',
    category: 'Nature & Recreation',
    importance: 'A sprawling green oasis spanning 161 acres with thousands of plant species, themed gardens, and jogging tracks. The Botanical Garden Metro station makes it very accessible.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=600&q=80',
    emoji: '🌿',
  },
  {
    name: 'Worlds of Wonder',
    category: 'Amusement & Fun',
    importance: 'NCR\'s premier amusement and water park near Noida with thrilling rides, wave pools, and entertainment shows — great for families and groups looking for adventure.',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80',
    emoji: '🎢',
  },
  {
    name: 'Sector 18 Market',
    category: 'Shopping & Food',
    importance: 'The beating heart of Noida\'s retail and food scene. A vibrant commercial hub with street food stalls, branded outlets, cafes, and electronics stores — perfect for an evening stroll.',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80',
    emoji: '🌆',
  },
  {
    name: 'Shaheed Bhagat Singh Park',
    category: 'Parks & Leisure',
    importance: 'A beautifully landscaped park with fountains, lawns, and a children\'s play area. Popular among morning walkers and families — a peaceful escape within the city.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=600&q=80',
    emoji: '🌳',
  },
  {
    name: 'Akshardham Temple (nearby Delhi)',
    category: 'Heritage & Spirituality',
    importance: 'Just across the Delhi border, Akshardham is one of the world\'s largest Hindu temples. Its architectural grandeur, exhibitions, and light show make it an unmissable experience.',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=600&q=80',
    emoji: '✨',
  },
]

export function ExploreNoidaPage() {
  return (
    <div className="min-h-screen bg-[#f0f5fc]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0b2d5e] to-[#1a5fa8] pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-400 mb-3">TROPMET 2026 · Noida</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Places to Explore in Noida</h1>
          <div className="w-14 h-1 bg-amber-400 rounded-full mx-auto mb-5" />
          <p className="text-sky-200 font-sans text-base max-w-2xl mx-auto leading-relaxed">
            Make the most of your visit to TROPMET 2026. Noida and the surrounding NCR region offer a rich tapestry of nature, culture, heritage, and modern amenities.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NOIDA_PLACES.map((place) => (
            <div key={place.name} className="bg-white border border-[#c8d9f0] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1531736275454-adc48d079ce9?w=600&q=80'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2d5e]/70 to-transparent" />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-sans font-bold text-[#0b2d5e] px-2.5 py-1 rounded-full border border-[#c8d9f0]">
                  {place.category}
                </span>
                <span className="absolute bottom-3 left-4 text-3xl">{place.emoji}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-[#0b2d5e] mb-2 group-hover:text-[#1a5fa8] transition-colors">{place.name}</h3>
                <p className="text-slate-500 font-sans text-sm leading-relaxed">{place.importance}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#021b3e] to-[#0b2d5e] rounded-2xl p-8 text-center">
          <div className="text-3xl mb-3">📍</div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">Conference Venue</h2>
          <p className="text-sky-300 font-sans text-sm max-w-xl mx-auto leading-relaxed mb-5">
            TROPMET 2026 is held at <strong className="text-white">NCMRWF, Ministry of Earth Sciences, Noida</strong>. All the places listed above are easily accessible from the venue by metro, cab, or auto-rickshaw.
          </p>
          <Link to="/accommodation" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#021b3e] px-6 py-2.5 rounded-lg font-bold text-sm transition-all">
            View Accommodation & Transport <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
