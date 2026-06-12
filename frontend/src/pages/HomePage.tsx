import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, ChevronRight, FileText, Server, Globe2, Wind, BarChart3, Cloud, FlaskConical, Satellite, Cpu, Zap, Database, Thermometer, Monitor, Activity, Layers } from 'lucide-react'
import Countdown from '../components/Countdown'
import { getDates, getSpeakers } from '../lib/api'
import heroBg from '../assets/hero-bg.jpeg'
import ncmrwfBuilding from '../assets/ncmrwf-building.png'
import arunikaHpc from '../assets/arunika-hpc.png'

const THEMES = [
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

const FEES = [
  { cat: 'IMS / OSI Members',     early: '₹ 3,000',   spot: '₹ 4,000' },
  { cat: 'Non-IMS / OSI Members', early: '₹ 4,000',   spot: '₹ 5,000' },
  { cat: 'Scholars / Students',   early: '₹ 1,000',   spot: '₹ 1,500' },
  { cat: 'Foreign Nationals',     early: '₹ 10,000',  spot: '₹ 12,000' },
  { cat: 'Industry',              early: '₹ 5,000',   spot: '₹ 6,000' },
  { cat: 'Industry Exhibitions',  early: '₹ 1,00,000 onwards', spot: '—' },
]

const MODELS = [
  { icon: Globe2,       name: 'NCUM-G',   full: 'NCMRWF Unified Model – Global',         badge: '12 km · 10 days',      desc: 'Global deterministic NWP at 12 km resolution, running four times daily (00/06/12/18 UTC), adapted from UK Met Office.' },
  { icon: Wind,         name: 'NCUM-R',   full: 'NCMRWF Unified Model – Regional',       badge: 'Regional · High-res',   desc: 'High-resolution regional model over the Indian subcontinent for finer-scale short-range weather guidance.' },
  { icon: BarChart3,    name: 'NEPS-G',   full: 'NCMRWF Ensemble Prediction System',     badge: 'Probabilistic',         desc: 'Ensemble system using multiple perturbed initial conditions for probabilistic forecasts and uncertainty quantification.' },
  { icon: Cloud,        name: 'C-NCUM',   full: 'Coupled Global NWP System',             badge: 'Ocean–Atmosphere',      desc: 'Fully coupled atmosphere–ocean–sea-ice model enabling improved monsoon and cyclone forecast skill.' },
  { icon: FlaskConical, name: 'S2S / SoPS', full: 'Sub-Seasonal to Seasonal Forecast',  badge: '2 weeks – 7 months',   desc: 'Extended-range coupled prediction system with 23-year hindcast climatology for week-by-week and seasonal outlooks.' },
  { icon: Satellite,    name: 'HAFS',     full: 'Hurricane Analysis & Forecast System',  badge: 'Tropical Cyclones',     desc: 'Advanced FV3-based TC system on MIHIR HPC for detailed inner-core analysis of Bay of Bengal and Arabian Sea cyclones.' },
]

const ARUNIKA_FEATURES = [
  { icon: Cpu,       title: 'Processing Power',        desc: 'Powered by AMD Milan 7643 with 96 processors per node and 2115 computational nodes, achieving a peak performance of 7.47 PetaFLOPS.' },
  { icon: Database,  title: 'Storage & Connectivity',  desc: 'Backed by 2.247 Petabytes of high-speed DDN storage and HDR 200 Gbps interconnect for seamless data processing and communication.' },
  { icon: Thermometer,title:'Energy Efficiency',       desc: 'Operates with a 2.295 MW power capacity, supporting a 30% future HPC expansion and achieving a Power Usage Effectiveness (PUE) of ~1.2.' },
  { icon: Activity,  title: 'Cooling System',          desc: 'Features 25 liquid-cooled racks and 7 air-cooled racks, with 95% heat dissipation via liquid cooling, enhancing efficiency and sustainability.' },
  { icon: Monitor,   title: 'Software & Tools',        desc: 'Runs on RHEL OS, leveraging PBS Pro for workload management, SMC xScale for cluster management, and AMD AOCC & NVIDIA SDK for AI/ML workloads.' },
  { icon: Zap,       title: 'AI & ML Capabilities',    desc: 'Dedicated computational resources for AI/ML applications with 1.9 PetaFLOPS standalone power, enhancing predictive analytics and data modeling.' },
  { icon: Cloud,     title: 'Applications',            desc: 'Supports extreme weather forecasting, climate simulations, AI-driven analytics, and high-resolution atmospheric data processing.' },
  { icon: Layers,    title: 'National Initiative',     desc: 'Inaugurated alongside Arka (IITM Pune) by the Prime Minister, boosting India\'s meteorological computing power to 22 PetaFLOPS under MoES.' },
]

const SERVICES = [
  { e: '🌧️', t: 'Medium-Range Forecasts',      d: 'Daily 1–10 day global guidance disseminated to IMD, state agencies and disaster management bodies across India.' },
  { e: '🌀', t: 'Tropical Cyclone Guidance',    d: 'Track and intensity forecasts for Bay of Bengal and Arabian Sea, supporting NDMA and coastal early-warning systems.' },
  { e: '🚀', t: 'Space Launch Support',         d: 'Weather guidance for ISRO rocket launches from SHAR at 5–10 day lead times, with 3-hourly on-demand forecasts.' },
  { e: '🌏', t: 'SWFDP Bay of Bengal',          d: 'One of three global NWP centres providing guidance to Bangladesh, India, Maldives, Myanmar, Sri Lanka and Thailand.' },
  { e: '🌾', t: 'Agriculture & Water Services', d: 'Sector-specific NWP products for agriculture, hydrology, solar/wind energy and urban planning.' },
  { e: '🔬', t: 'Research & Development',       d: 'Continuous model upgrades, data assimilation improvements, AI/ML integration and observing system experiments.' },
]

export default function HomePage() {
  const [dates, setDates] = useState<any[]>([])
  const [speakers, setSpeakers] = useState<any[]>([])

  useEffect(() => {
    getDates().then(r => setDates(r.data)).catch(() => setDates([
      { event_name: 'Abstract Submission Deadline',     event_date: '2026-08-15', is_deadline: true },
      { event_name: 'Intimation on Acceptance',         event_date: '2026-08-30', is_deadline: false },
      { event_name: 'Confirmation of Participation',    event_date: '2026-09-15', is_deadline: false },
      { event_name: 'Online Registration Starts',       event_date: '2026-09-15', is_deadline: false },
      { event_name: 'Early Bird Registration Ends',     event_date: '2026-10-31', is_deadline: true },
      { event_name: 'Conference Begins',                event_date: '2026-11-19', is_deadline: false },
    ]))
    getSpeakers().then(r => setSpeakers(r.data)).catch(() => setSpeakers([]))
  }, [])

  return (
    <div className="bg-[#f0f5fc]">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img src={heroBg} alt="Earth from space with cyclone" className="absolute inset-0 w-full h-full object-cover object-center select-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#021b3e]/90 via-[#021b3e]/70 to-[#021b3e]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#021b3e]/70 via-transparent to-transparent" />

        {/* Animated particles overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-sky-400/20 animate-ping"
              style={{ width: `${6 + (i % 4) * 3}px`, height: `${6 + (i % 4) * 3}px`, left: `${5 + i * 8}%`, top: `${10 + (i % 5) * 15}%`, animationDelay: `${i * 0.4}s`, animationDuration: `${3 + (i % 3)}s` }} />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 border border-amber-400/50 bg-amber-400/15 text-amber-300 rounded-full px-4 py-1.5 text-xs font-sans font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
                19–21 November 2026 · Noida, India
              </div>
              <h1 className="font-display text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-3">
                TROPMET<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">2026</span>
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full mb-5" />
              <p className="text-sky-100 font-sans text-lg font-light leading-relaxed mb-2">
                <span className="text-amber-400 font-bold">PRaGaTI</span> — Physics-driven and AI-enabled Research for Advanced Guidance in Tropical Intelligence
              </p>
              <p className="text-sky-200/80 font-sans text-sm leading-relaxed mb-8 max-w-lg">
                Hosted by IMS Noida Chapter at NCMRWF, Ministry of Earth Sciences. Uniting physics-driven science and Artificial Intelligence for the next generation of tropical forecasting.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/submit-abstract" className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#021b3e] px-6 py-3 rounded-full font-sans font-bold text-sm transition-all duration-200 shadow-lg shadow-amber-500/30 hover:shadow-amber-400/40 hover:scale-105">
                  Submit Abstract <FileText size={15} />
                </Link>
              </div>
              <div className="flex flex-wrap gap-5 text-sm font-sans text-sky-200">
                <span className="flex items-center gap-1.5"><Calendar size={13} className="text-amber-400" /> 19–21 Nov 2026</span>
                <span className="flex items-center gap-1.5"><MapPin size={13} className="text-amber-400" /> NCMRWF, Noida</span>
              </div>
            </div>

            <div>
              <div className="bg-[#021b3e]/75 border border-sky-400/25 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
                <div className="text-sky-300 text-xs font-bold uppercase tracking-widest font-sans mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
                  Conference Countdown
                </div>
                <Countdown targetDate="2026-11-19T09:00:00" />
                <hr className="border-sky-500/20 my-6" />
                <div className="space-y-3 text-sm font-sans">
                  {[
                    ['Abstract Deadline', '15 Aug 2026', true],
                    ['Early Bird Ends',   '31 Oct 2026', true],
                    ['Conference',        '19–21 Nov 2026', false],
                    ['Venue',             'NCMRWF, Noida', false],
                  ].map(([k, v, red]) => (
                    <div key={k as string} className="flex justify-between items-center py-1.5 border-b border-sky-500/10 last:border-0">
                      <span className="text-sky-400/80">{k}</span>
                      <span className={`font-bold ${red ? 'text-amber-400' : 'text-white'}`}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="bg-gradient-to-r from-[#0b2d5e] via-[#0e3d7a] to-[#0b2d5e] border-y border-sky-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {[
            ['3', 'Conference Days'],
            ['15', 'Research Themes'],
            ['Annual', 'IMS Conference Series'],
            ['15 Aug', 'Abstract Deadline'],
          ].map(([val, lbl]) => (
            <div key={lbl} className="group">
              <div className="font-display text-3xl font-bold text-amber-400 group-hover:scale-110 transition-transform duration-200">{val}</div>
              <div className="font-sans text-xs font-semibold uppercase tracking-wide text-sky-300 mt-0.5">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT CONFERENCE ═══ */}
      <section className="py-24 bg-white border-b border-[#c8d9f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-500 mb-2">About the Conference</p>
              <h2 className="font-display text-3xl font-bold text-[#0b2d5e] leading-snug mb-5">TROPMET — India's Premier Annual Conference on Tropical Meteorology</h2>
              <div className="w-10 h-0.5 bg-amber-500 mb-6" />
              <p className="text-slate-600 font-sans text-base leading-relaxed mb-4">
                TROPMET is a series of national conferences organized annually by the <strong className="text-[#0b2d5e]">Indian Meteorological Society (IMS)</strong>.
                This year, TROPMET will be hosted by the <strong className="text-[#0b2d5e]">IMS Noida Chapter</strong> at NCMRWF, Ministry of Earth Sciences, Noida during <strong className="text-[#0b2d5e]">19–21 November 2026</strong>.
              </p>
              <p className="text-slate-600 font-sans text-base leading-relaxed mb-6">
                Tropical nations are increasingly vulnerable to extreme weather and climate change. <strong className="text-teal-700">PRaGaTI</strong> represents a bold new approach integrating deep physical understanding with cutting-edge Artificial Intelligence to deliver the next generation of accurate and actionable tropical forecasts.
              </p>
              <blockquote className="border-l-4 border-amber-500 pl-5 py-2 bg-amber-50 text-slate-600 font-sans italic text-sm leading-relaxed mb-8 rounded-r-lg">
                "Physics-driven and AI-enabled Research for Advanced Guidance in Tropical Intelligence — paving the way toward a resilient future."
              </blockquote>
              <div className="flex gap-3">
                <Link to="/about" className="btn-primary">Learn More <ChevronRight size={14} /></Link>
                <Link to="/themes" className="btn-outline">View Themes</Link>
              </div>
            </div>

            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl mb-5">
                <img src={ncmrwfBuilding} alt="NCMRWF Building, Noida" className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2d5e]/70 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-sans font-bold text-[#0b2d5e] uppercase tracking-wide shadow">
                  NCMRWF, Noida · Nov 2026
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { t: 'Call for Papers',     d: 'Original research across 15 TROPMET themes from India and abroad' },
                  { t: 'Industry Exhibition', d: 'Special sessions for industry presentations and technology showcases' },
                  { t: 'Expert Speakers',     d: 'Eminent scientists and researchers from leading national institutes' },
                  { t: 'Noida Venue',         d: 'NCMRWF, A-50 Sector 62, Noida — Ministry of Earth Sciences campus' },
                ].map(({ t, d }) => (
                  <div key={t} className="bg-[#f0f5fc] border border-[#c8d9f0] rounded-xl p-4 hover:shadow-md hover:border-amber-300 transition-all">
                    <h3 className="font-sans font-bold text-[#0b2d5e] text-sm mb-1">{t}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT NCMRWF ═══ */}
      <section className="py-24 bg-gradient-to-br from-[#021b3e] via-[#0b2d5e] to-[#0e3d7a] relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:'radial-gradient(circle at 20% 50%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 80% 20%, #38bdf8 0%, transparent 40%)'}} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-400 mb-3">About Us</p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white leading-snug mb-4">National Centre for Medium Range Weather Forecasting</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full mb-6" />
              <p className="text-sky-200 font-sans text-base leading-relaxed mb-4">
                The National Centre for Medium Range Weather Forecasting <strong className="text-white">(NCMRWF)</strong> serves as a pivotal institution in India for Numerical Weather Prediction (NWP) under the <strong className="text-amber-300">Ministry of Earth Sciences</strong>. By leveraging advanced global data assimilation and modeling techniques, NCMRWF effectively generates medium-range forecasts that support the India Meteorological Department (IMD) and various government agencies.
              </p>
              <p className="text-sky-200/80 font-sans text-base leading-relaxed mb-8">
                These reliable and timely forecasts significantly enhance efforts in agriculture, disaster management, renewable energy, water resource management, and public safety, fostering improved decision-making and contributing to the well-being of India and its neighboring regions.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: '1988', l: 'Established' },
                  { v: 'MoES', l: 'Under Ministry' },
                  { v: 'A-50', l: 'Sector-62, Noida' },
                  { v: '24/7', l: 'Operational' },
                ].map(({ v, l }) => (
                  <div key={l} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 backdrop-blur-sm">
                    <div className="font-display text-xl font-bold text-amber-400">{v}</div>
                    <div className="text-sky-300 text-xs font-sans uppercase tracking-wide">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {SERVICES.map(({ e, t, d }) => (
                <div key={t} className="bg-white/8 border border-sky-400/20 rounded-xl p-5 hover:bg-white/12 hover:border-amber-400/40 transition-all group">
                  <span className="text-2xl mb-3 block">{e}</span>
                  <h3 className="font-sans font-bold text-white text-sm mb-1.5">{t}</h3>
                  <p className="text-sky-300/80 text-xs leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NCMRWF HOST INSTITUTION (NWP Models) ═══ */}
      <section className="py-24 bg-[#f0f5fc] border-b border-[#c8d9f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-14">
            <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-500 mb-2">Host Institution</p>
            <h2 className="font-display text-3xl font-bold text-[#0b2d5e] leading-snug mb-3">Operational NWP Systems at NCMRWF</h2>
            <div className="w-10 h-0.5 bg-amber-500 mb-5" />
            <p className="text-slate-600 font-sans text-base leading-relaxed">
              NCMRWF operates a world-class suite of weather prediction models, running on India's most powerful supercomputers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODELS.map(({ icon: Icon, name, full, badge, desc }) => (
              <div key={name} className="bg-white border border-[#c8d9f0] rounded-2xl p-5 hover:shadow-lg hover:border-[#0b2d5e]/30 transition-all group">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#0b2d5e] to-[#1a5fa8] text-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wide text-slate-500 border border-[#c8d9f0] rounded-full px-2 py-0.5 mt-0.5 bg-[#f0f5fc]">{badge}</span>
                </div>
                <div className="font-display text-lg font-bold text-[#0b2d5e]">{name}</div>
                <div className="text-xs font-sans text-teal-700 font-semibold mb-2">{full}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="https://nwp.ncmrwf.gov.in/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white text-sm px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-sm">
              Learn More <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ ARUNIKA HPC ═══ */}
      <section className="py-24 bg-white border-b border-[#c8d9f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-500 mb-3">High Performance Computing</p>
            <h2 className="font-display text-4xl font-bold text-[#0b2d5e] mb-3">
              ARUNIKA <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-700">Super Computer</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-200 rounded-full mx-auto mb-5" />
            <p className="text-slate-600 font-sans text-base max-w-2xl mx-auto leading-relaxed">
              Arunika is a state-of-the-art high-performance computing (HPC) system installed at NCMRWF, India. It plays a crucial role in advancing weather and climate research, disaster preparedness, and climate resilience through cutting-edge computational capabilities.
            </p>
          </div>

          {/* Full-width HPC photo */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
            <img src={arunikaHpc} alt="Arunika HPC at NCMRWF" className="w-full h-64 md:h-80 object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#021b3e]/80 via-transparent to-[#021b3e]/80" />
            <div className="absolute inset-0 flex items-center justify-between px-8 md:px-16">
              <div>
                <div className="text-amber-400 text-xs font-bold uppercase tracking-widest font-sans mb-1">NCMRWF · Noida</div>
                <div className="font-display text-3xl md:text-4xl font-bold text-white">ARUNIKA</div>
                <div className="text-sky-300 font-sans text-sm mt-1">अरुणिका</div>
              </div>
              <div className="text-right">
                <div className="bg-amber-500/20 border border-amber-400/40 rounded-xl px-5 py-3 backdrop-blur-sm">
                  <div className="text-amber-400 font-display text-2xl font-bold">7.47</div>
                  <div className="text-sky-300 text-xs font-sans font-bold uppercase tracking-wide">PetaFLOPS Peak</div>
                </div>
              </div>
            </div>
          </div>

          {/* 8 feature cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ARUNIKA_FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group bg-gradient-to-br from-[#021b3e] to-[#0b2d5e] rounded-2xl p-5 hover:from-[#0b2d5e] hover:to-[#1a5fa8] transition-all duration-300 cursor-default border border-sky-700/30 hover:border-amber-400/40 hover:shadow-lg hover:shadow-sky-900/30">
                <div className="w-10 h-10 bg-sky-500/20 border border-sky-400/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-400/20 group-hover:border-amber-400/40 transition-all">
                  <Icon size={18} className="text-sky-400 group-hover:text-amber-400 transition-colors" />
                </div>
                <h3 className="font-sans font-bold text-white text-sm mb-2 leading-tight">{title}</h3>
                <p className="text-sky-300/70 text-xs leading-relaxed group-hover:text-sky-200/80 transition-colors">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="https://nwp.ncmrwf.gov.in/computing/hpc-systems" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#021b3e] text-sm px-6 py-2.5 rounded-lg font-bold transition-colors shadow-sm">
              Learn More <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ THEMES ═══ */}
      <section className="py-24 bg-[#f0f5fc] border-b border-[#c8d9f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10 border-b border-[#c8d9f0] pb-6">
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-500 mb-1">Research Areas</p>
              <h2 className="font-display text-3xl font-bold text-[#0b2d5e]">Conference Themes <span className="text-base text-slate-400 font-sans font-normal">(15 themes)</span></h2>
            </div>
            <Link to="/themes" className="btn-outline text-xs hidden sm:flex">All Themes <ChevronRight size={13} /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {THEMES.map((theme, i) => (
              <div key={i} className="group bg-white border border-[#c8d9f0] rounded-xl p-4 hover:border-[#0b2d5e]/40 hover:shadow-md transition-all cursor-default">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 bg-gradient-to-br from-[#0b2d5e] to-[#1a5fa8] rounded-lg flex items-center justify-center text-white font-mono font-bold text-xs shadow-sm group-hover:scale-110 transition-transform">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-sm font-sans text-slate-600 group-hover:text-[#0b2d5e] leading-relaxed transition-colors">{theme}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link to="/themes" className="btn-outline">All 15 Themes <ChevronRight size={13} /></Link>
          </div>
        </div>
      </section>


      {/* ═══ SUBMISSION WORKFLOW ═══ */}
      <section className="py-24 bg-gradient-to-br from-[#021b3e] via-[#0b2d5e] to-[#0e3d7a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:'radial-gradient(circle at 30% 50%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 70% 20%, #38bdf8 0%, transparent 40%)'}} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-400 mb-3">How to Participate</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">Submission & Registration</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full mx-auto mb-5" />
            <p className="text-sky-200 font-sans text-base max-w-xl mx-auto">Follow these steps to submit your research and attend TROPMET 2026</p>
          </div>

          {/* Main workflow: Call for Papers branch */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-amber-500/20 border border-amber-400/40 rounded-lg px-3 py-1.5">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Call for Papers</span>
              </div>
              <div className="flex-1 h-px bg-amber-400/20" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { step: 1, label: 'Author Registration', desc: 'Register as a participant on the portal', to: '/registration', icon: '👤' },
                { step: 2, label: 'Abstract Submission', desc: 'Submit abstract (max 350 words)', to: '/submit-abstract', icon: '📄' },
                { step: 3, label: 'Review Process', desc: 'Scientific committee evaluation', to: '/review-process', icon: '🔍' },
                { step: 4, label: 'Acceptance', desc: 'Notification by 30 Aug 2026', to: '/review-process#acceptance', icon: '✅' },
              ].map((s, i) => (
                <Link key={s.step} to={s.to}
                  className="relative bg-white/8 border border-sky-400/20 rounded-xl p-5 hover:bg-white/15 hover:border-amber-400/50 transition-all group cursor-pointer">
                  {i < 3 && (
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 z-10 hidden lg:flex">
                      <ChevronRight size={16} className="text-amber-400/60" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-[#021b3e] font-bold text-xs flex items-center justify-center">{s.step}</span>
                    <span className="text-lg">{s.icon}</span>
                  </div>
                  <h3 className="font-sans font-bold text-white text-sm mb-1 group-hover:text-amber-300 transition-colors">{s.label}</h3>
                  <p className="text-sky-300/70 text-xs leading-relaxed">{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Registration workflow branch */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-teal-500/20 border border-teal-400/40 rounded-lg px-3 py-1.5">
                <span className="text-teal-300 text-xs font-bold uppercase tracking-widest">Registration</span>
              </div>
              <div className="flex-1 h-px bg-teal-400/20" />
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { step: 1, label: 'Registration', desc: 'Fill in your details and select category', to: '/registration', icon: '📋' },
                { step: 2, label: 'Payment', desc: 'Pay via secure payment gateway — UPI / cards / net banking', to: '/registration#payment', icon: '💳' },
                { step: 3, label: 'Confirmation', desc: 'Receive confirmation email & ID', to: '/registration#confirm', icon: '🎫' },
              ].map((s, i) => (
                <Link key={s.step} to={s.to}
                  className="relative bg-white/8 border border-teal-400/20 rounded-xl p-5 hover:bg-white/15 hover:border-teal-400/50 transition-all group cursor-pointer">
                  {i < 2 && (
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 z-10 hidden sm:flex">
                      <ChevronRight size={16} className="text-teal-400/60" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-teal-500 text-white font-bold text-xs flex items-center justify-center">{s.step}</span>
                    <span className="text-lg">{s.icon}</span>
                  </div>
                  <h3 className="font-sans font-bold text-white text-sm mb-1 group-hover:text-teal-300 transition-colors">{s.label}</h3>
                  <p className="text-sky-300/70 text-xs leading-relaxed">{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ IMPORTANT DATES ═══ */}
      <section className="py-24 bg-white border-b border-[#c8d9f0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-500 mb-2">Plan Ahead</p>
            <h2 className="font-display text-3xl font-bold text-[#0b2d5e]">Important Dates</h2>
            <div className="w-10 h-0.5 bg-amber-500 mx-auto mt-4" />
          </div>
          <div className="space-y-3">
            {dates.map((d, i) => (
              <div key={i} className="flex items-center gap-5 group">
                <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center shrink-0 z-10 transition-colors
                  ${d.is_deadline ? 'bg-amber-50 border-amber-400 text-amber-600' : 'bg-[#f0f5fc] border-[#c8d9f0] text-slate-400'}`}>
                  <Calendar size={14} />
                </div>
                <div className="flex-1 flex items-center justify-between bg-white border border-[#c8d9f0] rounded-xl px-5 py-3.5 shadow-sm group-hover:shadow-md group-hover:border-[#0b2d5e]/20 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="font-sans font-medium text-[#0b2d5e] text-sm">{d.event_name}</span>
                    {d.is_deadline && (
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wide bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Deadline</span>
                    )}
                  </div>
                  <span className="font-sans font-bold text-sm text-[#0b2d5e] shrink-0 ml-4">
                    {new Date(d.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REGISTRATION FEES ═══ */}
      <section className="py-24 bg-[#f0f5fc] border-b border-[#c8d9f0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-500 mb-2">Join the Conference</p>
            <h2 className="font-display text-3xl font-bold text-[#0b2d5e]">Registration Fees</h2>
            <div className="w-10 h-0.5 bg-amber-500 mx-auto mt-4 mb-4" />
            <p className="text-slate-500 font-sans text-sm">Early bird discount available until 31 October 2026</p>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden border border-[#c8d9f0] shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#0b2d5e] to-[#1a5fa8] text-white">
                  <th className="px-6 py-4 text-left font-sans font-semibold text-sm">Category</th>
                  <th className="px-6 py-4 text-center font-sans font-semibold text-sm">By 31 Oct 2026</th>
                  <th className="px-6 py-4 text-center font-sans font-semibold text-sm">On Spot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6effa]">
                {FEES.map((row, i) => (
                  <tr key={i} className="hover:bg-[#f0f5fc] transition-colors">
                    <td className="px-6 py-4 font-sans font-medium text-[#0b2d5e] text-sm">{row.cat}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-sans font-bold text-sm text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">{row.early}</span>
                    </td>
                    <td className="px-6 py-4 text-center font-sans text-slate-500 text-sm">{row.spot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-amber-50 border-t border-amber-100 px-6 py-3.5 text-xs font-sans text-slate-600">
              Industry Exhibitions: <strong>₹ 25,000/-</strong> · Payment via secure payment gateway (net banking / UPI / cards) · No fee for IMS Honorary Fellows
            </div>
          </div>
          <div className="text-center mt-7">
            <Link to="/submit-abstract" className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#021b3e] px-8 py-3 rounded-full font-sans font-bold text-base transition-all shadow-lg shadow-amber-500/30 hover:scale-105">
              Submit Abstract <FileText size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SPEAKERS PREVIEW ═══ */}
      {speakers.length > 0 && (
        <section className="py-24 bg-white border-b border-[#c8d9f0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-500 mb-2">Distinguished Guests</p>
              <h2 className="font-display text-3xl font-bold text-[#0b2d5e]">Speakers</h2>
              <div className="w-10 h-0.5 bg-amber-500 mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {speakers.slice(0, 8).map((s: any) => (
                <div key={s.id} className="bg-[#f0f5fc] border border-[#c8d9f0] rounded-2xl p-5 text-center hover:shadow-md hover:border-[#0b2d5e]/30 transition-all">
                  <div className="w-16 h-16 rounded-full bg-[#0b2d5e]/10 mx-auto mb-3 overflow-hidden border-2 border-[#c8d9f0]">
                    {s.photo_url
                      ? <img src={s.photo_url} alt={s.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-[#0b2d5e] font-display font-bold text-2xl">{s.name[0]}</div>}
                  </div>
                  <h3 className="font-sans font-bold text-[#0b2d5e] text-sm">{s.name}</h3>
                  <p className="text-slate-500 text-xs mt-0.5">{s.designation}</p>
                  {s.is_keynote && <span className="mt-2 inline-block bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">Keynote</span>}
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/speakers" className="btn-primary">View All Speakers <ChevronRight size={14} /></Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA BANNER ═══ */}
      <section className="relative py-24 overflow-hidden">
        <img src={heroBg} alt="Storm clouds" className="absolute inset-0 w-full h-full object-cover object-bottom" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#021b3e]/92 via-[#021b3e]/80 to-[#021b3e]/60" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-400 mb-3">Call to Action</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            Ready to be part of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">PRaGaTI</span>?
          </h2>
          <div className="w-10 h-0.5 bg-amber-400 mx-auto mb-6" />
          <p className="text-sky-200 font-sans text-base leading-relaxed mb-10">
            Submit your research abstract by <strong className="text-white">15 August 2026</strong> and register to be part of India's premier tropical meteorology conference.
          </p>
          <Link to="/submit-abstract" className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#021b3e] px-8 py-3.5 rounded-full font-sans font-bold text-base transition-all shadow-xl shadow-amber-500/30 hover:scale-105">
            Submit Abstract <FileText size={15} />
          </Link>
        </div>
      </section>
    </div>
  )
}
