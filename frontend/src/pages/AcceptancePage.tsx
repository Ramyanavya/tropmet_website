import { Link } from 'react-router-dom'
import { CheckCircle, XCircle, RefreshCw, Mail, FileText, Download, ChevronRight, Clock } from 'lucide-react'

const STATUS_TYPES = [
  {
    icon: CheckCircle,
    color: 'green',
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconColor: 'text-green-600',
    badge: 'bg-green-100 text-green-700',
    title: 'Accepted',
    desc: 'Your abstract has been accepted for presentation at TROPMET 2026. You will receive an official acceptance letter with your Paper ID, presentation type (Oral/Poster), and session details.',
  },
  {
    icon: RefreshCw,
    color: 'amber',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconColor: 'text-amber-600',
    badge: 'bg-amber-100 text-amber-700',
    title: 'Revision Required',
    desc: 'The reviewers have suggested improvements. You will receive specific comments and must resubmit a revised abstract within the stipulated time.',
  },
  {
    icon: XCircle,
    color: 'red',
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconColor: 'text-red-600',
    badge: 'bg-red-100 text-red-700',
    title: 'Rejected',
    desc: 'Unfortunately, your abstract was not selected for this edition. Reviewer feedback will be shared to help improve future submissions.',
  },
]

const TIMELINE = [
  { date: '15 Aug 2026', event: 'Abstract Submission Deadline', done: false },
  { date: '15 Sep 2026', event: 'Review Process Completion', done: false },
  { date: '30 Sep 2026', event: 'Acceptance Notifications Sent', done: false },
  { date: '31 Oct 2026', event: 'Early Bird Registration Deadline', done: false },
  { date: '19–21 Nov 2026', event: 'TROPMET 2026 Conference', done: false },
]

export default function AcceptancePage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Step 4 of 4 — Call for Papers
          </div>
          <h1 className="font-display font-bold text-3xl text-[#0b2d5e] mb-2">Acceptance & Notifications</h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            After the peer review process, authors will be notified of the decision via email. Here's what to expect at each stage.
          </p>
        </div>

        {/* Workflow breadcrumb */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {['Author Registration', 'Abstract Submission', 'Review Process', 'Acceptance'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
                ${i === 3 ? 'bg-[#0b2d5e] text-white' : 'bg-slate-100 text-slate-400'}`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold
                  ${i === 3 ? 'bg-amber-400 text-[#0b2d5e]' : 'bg-slate-200 text-slate-500'}`}>{i + 1}</span>
                {s}
              </div>
              {i < 3 && <ChevronRight size={12} className="text-slate-300" />}
            </div>
          ))}
        </div>

        {/* Status types */}
        <div className="space-y-4 mb-10">
          <h2 className="font-display font-bold text-[#0b2d5e] text-xl mb-4">Possible Outcomes</h2>
          {STATUS_TYPES.map(s => (
            <div key={s.title} className={`${s.bg} ${s.border} border rounded-2xl p-5 flex gap-4 items-start`}>
              <s.icon size={28} className={`${s.iconColor} shrink-0 mt-0.5`} />
              <div>
                <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2 ${s.badge}`}>{s.title}</span>
                <p className="text-sm text-slate-700 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Acceptance letter contents */}
        <div className="bg-white rounded-2xl border border-[#e6effa] shadow-sm p-6 mb-8">
          <h2 className="font-display font-bold text-[#0b2d5e] text-xl mb-4 flex items-center gap-2">
            <FileText size={18} className="text-amber-500" /> Acceptance Letter Contents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Unique Paper ID', 'Paper Title', 'Author Names & Affiliations', 'Presentation Type (Oral / Poster)', 'Session & Time Slot', 'Conference Venue Details'].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Notification process */}
        <div className="bg-white rounded-2xl border border-[#e6effa] shadow-sm p-6 mb-8">
          <h2 className="font-display font-bold text-[#0b2d5e] text-xl mb-4 flex items-center gap-2">
            <Mail size={18} className="text-amber-500" /> How Notifications Are Sent
          </h2>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-[#0b2d5e] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>Email notification sent to the corresponding author's registered email.</li>
            <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-[#0b2d5e] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>PDF acceptance letter attached to the email for accepted papers.</li>
            <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-[#0b2d5e] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>Reviewer comments shared for revision/rejection cases.</li>
            <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-[#0b2d5e] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>Accepted authors must complete conference registration within the deadline.</li>
          </ul>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-[#e6effa] shadow-sm p-6 mb-8">
          <h2 className="font-display font-bold text-[#0b2d5e] text-xl mb-5 flex items-center gap-2">
            <Clock size={18} className="text-amber-500" /> Important Dates
          </h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e6effa]" />
            {TIMELINE.map((t, i) => (
              <div key={i} className="flex gap-4 mb-4 relative">
                <div className="w-8 h-8 rounded-full bg-[#0b2d5e] text-white flex items-center justify-center text-xs font-bold shrink-0 z-10">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">{t.date}</span>
                  <p className="text-sm text-slate-700 mt-1 font-medium">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Downloads note */}
        <div className="bg-[#0b2d5e] rounded-2xl p-6 text-white mb-8">
          <div className="flex items-start gap-4">
            <Download size={24} className="shrink-0 text-amber-400 mt-0.5" />
            <div>
              <h3 className="font-bold text-base mb-1">Documents Available After Acceptance</h3>
              <p className="text-sm text-white/70 mb-3">Once your paper is accepted and registration is complete, the following will be available in your dashboard:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {['Registration Receipt', 'Acceptance Letter (PDF)', 'Participation Certificate (Post Conference)'].map(d => (
                  <div key={d} className="bg-white/10 rounded-xl px-3 py-2 text-xs font-medium text-white">{d}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/registration"
            className="bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
            Proceed to Registration <ChevronRight size={16} />
          </Link>
          <Link to="/contact"
            className="border border-[#c8d9f0] text-[#0b2d5e] hover:bg-[#eef4fc] px-6 py-3 rounded-xl font-semibold text-sm transition-colors text-center">
            Contact Organizing Committee
          </Link>
        </div>

      </div>
    </div>
  )
}
