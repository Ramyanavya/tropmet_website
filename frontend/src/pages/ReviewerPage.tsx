import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  LogIn, Eye, CheckCircle, XCircle, RefreshCw, ChevronRight,
  FileText, Star, MessageSquare, User, LogOut, Clock, BookOpen
} from 'lucide-react'

// ─── Mock data for demo (replace with real API calls) ───────────────────────
const MOCK_ABSTRACTS = [
  {
    id: 'ABS-10432',
    title: 'Deep Learning Approaches for Tropical Cyclone Intensity Prediction Using Multi-Source Satellite Data',
    author: 'Dr. Ramesh Kumar',
    institution: 'NCMRWF, Noida',
    theme: 'Artificial Intelligence and Machine Learning Applications in Weather and Climate Science',
    submitted: '2026-07-12',
    wordCount: 312,
    abstract: 'This study presents a novel deep learning framework combining convolutional neural networks and transformer architectures for real-time tropical cyclone intensity estimation. Using multi-spectral satellite imagery from INSAT-3DR and microwave sounders, the model achieves a mean absolute error of 8.2 knots on the 2015–2025 Indian Ocean cyclone dataset. The proposed hybrid architecture outperforms conventional Dvorak technique by 23% in rapid intensification cases.',
    keywords: 'tropical cyclone, deep learning, satellite imagery, intensity prediction',
    presentationType: 'Oral',
    status: 'pending',
  },
  {
    id: 'ABS-10581',
    title: 'Monsoon Onset Variability Over Kerala: A Multi-Decadal Analysis Using ERA5 Reanalysis',
    author: 'Prof. Sunita Rao',
    institution: 'IIT Delhi',
    theme: 'Monsoon Dynamics, Land–Ocean–Atmosphere Interactions, and Tropical Processes',
    submitted: '2026-07-18',
    wordCount: 298,
    abstract: 'We examine variability in the onset date of the Indian Summer Monsoon over Kerala during 1979–2024 using ERA5 reanalysis data and IMD observations. Our analysis identifies three distinct pentadal phases characterized by early, normal, and delayed onsets and links these to Pacific and Indian Ocean SST anomalies. A new onset index based on low-level jetstream strength shows 89% skill in predicting onset up to 15 days in advance.',
    keywords: 'monsoon onset, ERA5, Kerala, variability, SST',
    presentationType: 'Poster',
    status: 'pending',
  },
]

type AbstractStatus = 'pending' | 'accepted' | 'minor_revision' | 'major_revision' | 'rejected'

interface ReviewFormData {
  technical_quality: string
  novelty: string
  methodology: string
  results: string
  relevance: string
  comments_author: string
  comments_organizer: string
  recommendation: AbstractStatus
}

export default function ReviewerPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [reviewerName, setReviewerName] = useState('')
  const [abstracts, setAbstracts] = useState(MOCK_ABSTRACTS)
  const [viewingId, setViewingId] = useState<string | null>(null)
  const [reviewingId, setReviewingId] = useState<string | null>(null)
  const [submittedReviews, setSubmittedReviews] = useState<Record<string, ReviewFormData>>({})
  const [loginLoading, setLoginLoading] = useState(false)

  const loginForm = useForm()
  const reviewForm = useForm<ReviewFormData>()

  const onLogin = async (data: any) => {
    setLoginLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoginLoading(false)
    // In production, verify credentials via API
    setReviewerName(data.email.split('@')[0])
    setLoggedIn(true)
    toast.success('Logged in as reviewer')
  }

  const onSubmitReview = (data: ReviewFormData) => {
    setSubmittedReviews(prev => ({ ...prev, [reviewingId!]: data }))
    setAbstracts(prev => prev.map(a =>
      a.id === reviewingId ? { ...a, status: data.recommendation } : a
    ))
    toast.success('Review submitted successfully! Author will be notified.')
    setReviewingId(null)
    reviewForm.reset()
  }

  const viewingAbstract = abstracts.find(a => a.id === viewingId)
  const reviewingAbstract = abstracts.find(a => a.id === reviewingId)

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-700',
      accepted: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      minor_revision: 'bg-blue-100 text-blue-700',
      major_revision: 'bg-orange-100 text-orange-700',
    }
    const labels: Record<string, string> = {
      pending: 'Pending Review',
      accepted: 'Accepted',
      rejected: 'Rejected',
      minor_revision: 'Minor Revision',
      major_revision: 'Major Revision',
    }
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[status] || 'bg-slate-100 text-slate-600'}`}>
        {labels[status] || status}
      </span>
    )
  }

  // ─── LOGIN PAGE ──────────────────────────────────────────────────────────
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#021b3e] to-[#0b2d5e] flex items-center justify-center px-4 pt-20">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#0b2d5e] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User size={28} className="text-amber-400" />
            </div>
            <h1 className="font-display font-bold text-2xl text-[#0b2d5e] mb-1">Reviewer Login</h1>
            <p className="text-slate-400 text-sm">TROPMET 2026 — Scientific Review Portal</p>
          </div>

          <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Reviewer Email *</label>
              <input
                {...loginForm.register('email', { required: 'Email is required' })}
                type="email"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8]"
                placeholder="reviewer@institute.ac.in"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Password *</label>
              <input
                {...loginForm.register('password', { required: 'Password is required' })}
                type="password"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8]"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loginLoading
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>
                : <><LogIn size={16} />Sign In as Reviewer</>
              }
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-5">
            Credentials are assigned by the conference admin. Contact <a href="mailto:imsnoidachapter@gmail.com" className="text-[#1a5fa8] hover:underline">imsnoidachapter@gmail.com</a>
          </p>
        </div>
      </div>
    )
  }

  // ─── ABSTRACT DETAIL MODAL ───────────────────────────────────────────────
  if (viewingAbstract && !reviewingId) {
    return (
      <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setViewingId(null)} className="flex items-center gap-2 text-[#1a5fa8] text-sm font-semibold mb-6 hover:underline">
            ← Back to Dashboard
          </button>

          <div className="bg-white rounded-2xl border border-[#e6effa] shadow-sm p-8 mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h2 className="font-display font-bold text-xl text-[#0b2d5e] leading-snug">{viewingAbstract.title}</h2>
              {statusBadge(viewingAbstract.status)}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm mb-5">
              <div><span className="text-slate-400">Author</span><p className="font-semibold text-slate-700">{viewingAbstract.author}</p></div>
              <div><span className="text-slate-400">Institution</span><p className="font-semibold text-slate-700">{viewingAbstract.institution}</p></div>
              <div><span className="text-slate-400">Submitted</span><p className="font-semibold text-slate-700">{viewingAbstract.submitted}</p></div>
              <div><span className="text-slate-400">Presentation</span><p className="font-semibold text-slate-700">{viewingAbstract.presentationType}</p></div>
              <div className="col-span-2"><span className="text-slate-400">Theme</span><p className="font-semibold text-slate-700">{viewingAbstract.theme}</p></div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Abstract Text ({viewingAbstract.wordCount} words)</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{viewingAbstract.abstract}</p>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Keywords</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {viewingAbstract.keywords.split(',').map(kw => (
                  <span key={kw} className="bg-sky-100 text-sky-700 px-2.5 py-1 rounded-full text-xs font-medium">{kw.trim()}</span>
                ))}
              </div>
            </div>
          </div>

          {viewingAbstract.status === 'pending' && (
            <button
              onClick={() => { setReviewingId(viewingAbstract.id); setViewingId(null) }}
              className="w-full bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            >
              <Star size={16} /> Start Review
            </button>
          )}
          {viewingAbstract.status !== 'pending' && submittedReviews[viewingAbstract.id] && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-sm text-green-800">
              <strong>Review submitted.</strong> Your recommendation: <strong>{submittedReviews[viewingAbstract.id].recommendation}</strong><br />
              The author has been notified of your decision.
            </div>
          )}
        </div>
      </div>
    )
  }

  // ─── REVIEW FORM ─────────────────────────────────────────────────────────
  if (reviewingAbstract) {
    return (
      <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setReviewingId(null)} className="flex items-center gap-2 text-[#1a5fa8] text-sm font-semibold mb-6 hover:underline">
            ← Back
          </button>

          <div className="bg-white rounded-2xl border border-[#e6effa] shadow-sm p-8">
            <h2 className="font-display font-bold text-xl text-[#0b2d5e] mb-1">Review Form</h2>
            <p className="text-slate-400 text-sm mb-6">{reviewingAbstract.title}</p>

            <form onSubmit={reviewForm.handleSubmit(onSubmitReview)} className="space-y-6">
              {/* Ratings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { field: 'technical_quality', label: 'Technical Quality' },
                  { field: 'novelty', label: 'Novelty / Originality' },
                  { field: 'methodology', label: 'Methodology' },
                  { field: 'results', label: 'Results & Conclusions' },
                  { field: 'relevance', label: 'Relevance to Conference' },
                ].map(({ field, label }) => (
                  <div key={field}>
                    <label className="block text-xs font-semibold text-slate-600 mb-2">{label} (1–5) *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(n => (
                        <label key={n} className="flex-1">
                          <input type="radio" value={n} {...reviewForm.register(field as any, { required: true })} className="hidden peer" />
                          <span className="block text-center border-2 border-slate-200 rounded-lg py-1.5 text-sm font-bold cursor-pointer peer-checked:border-[#0b2d5e] peer-checked:bg-[#0b2d5e] peer-checked:text-white transition-all hover:border-sky-400">
                            {n}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Comments */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
                  <MessageSquare size={12} /> Comments for Author *
                </label>
                <textarea
                  {...reviewForm.register('comments_author', { required: 'Comments for author are required' })}
                  rows={4} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 resize-none"
                  placeholder="Feedback to help the author improve their work..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Comments for Organizer (Confidential)
                </label>
                <textarea
                  {...reviewForm.register('comments_organizer')}
                  rows={3} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 resize-none"
                  placeholder="Internal notes not shared with author..."
                />
              </div>

              {/* Recommendation */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-3">Recommendation *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { val: 'accepted', label: 'Accept', icon: CheckCircle, color: 'border-green-300 has-[:checked]:border-green-500 has-[:checked]:bg-green-50 text-green-700' },
                    { val: 'minor_revision', label: 'Minor Revision', icon: RefreshCw, color: 'border-blue-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 text-blue-700' },
                    { val: 'major_revision', label: 'Major Revision', icon: RefreshCw, color: 'border-orange-200 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50 text-orange-700' },
                    { val: 'rejected', label: 'Reject', icon: XCircle, color: 'border-red-200 has-[:checked]:border-red-500 has-[:checked]:bg-red-50 text-red-700' },
                  ].map(({ val, label, icon: Icon, color }) => (
                    <label key={val} className={`flex flex-col items-center gap-1.5 border-2 rounded-xl px-3 py-3 cursor-pointer transition-all text-center ${color}`}>
                      <input type="radio" value={val} {...reviewForm.register('recommendation', { required: 'Select a recommendation' })} className="hidden" />
                      <Icon size={18} />
                      <span className="text-xs font-semibold">{label}</span>
                    </label>
                  ))}
                </div>
                {reviewForm.formState.errors.recommendation && (
                  <p className="text-red-500 text-xs mt-1">Please select a recommendation</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} /> Submit Review & Notify Author
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // ─── REVIEWER DASHBOARD ──────────────────────────────────────────────────
  const pending = abstracts.filter(a => a.status === 'pending').length
  const reviewed = abstracts.filter(a => a.status !== 'pending').length

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#021b3e] to-[#0b2d5e] rounded-2xl p-6 mb-8 flex items-center justify-between">
          <div>
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">Reviewer Dashboard</p>
            <h1 className="font-display font-bold text-2xl text-white">Welcome, {reviewerName}</h1>
            <p className="text-sky-300 text-sm mt-1">TROPMET 2026 — Scientific Review Portal</p>
          </div>
          <button onClick={() => { setLoggedIn(false); setReviewerName('') }}
            className="flex items-center gap-2 text-white/60 hover:text-white text-xs font-semibold border border-white/20 rounded-xl px-3 py-2">
            <LogOut size={14} /> Log Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Assigned', value: abstracts.length, icon: BookOpen, color: 'text-sky-600 bg-sky-100' },
            { label: 'Pending Review', value: pending, icon: Clock, color: 'text-amber-600 bg-amber-100' },
            { label: 'Reviewed', value: reviewed, icon: CheckCircle, color: 'text-green-600 bg-green-100' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-[#e6effa] p-5 shadow-sm text-center">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mx-auto mb-2`}>
                <Icon size={20} />
              </div>
              <p className="font-display font-bold text-2xl text-[#0b2d5e]">{value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Abstract list */}
        <h2 className="font-display font-bold text-[#0b2d5e] text-lg mb-4">Assigned Abstracts</h2>
        <div className="space-y-4">
          {abstracts.map(abstract => (
            <div key={abstract.id} className="bg-white rounded-2xl border border-[#e6effa] shadow-sm p-6 flex gap-4 items-start">
              <div className="w-10 h-10 bg-[#0b2d5e] rounded-xl flex items-center justify-center shrink-0">
                <FileText size={18} className="text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-display font-semibold text-[#0b2d5e] text-sm leading-snug line-clamp-2">{abstract.title}</h3>
                  {statusBadge(abstract.status)}
                </div>
                <p className="text-xs text-slate-400 mb-1">{abstract.author} · {abstract.institution}</p>
                <p className="text-xs text-slate-400">ID: <span className="font-mono font-semibold text-slate-600">{abstract.id}</span> · Submitted: {abstract.submitted}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => setViewingId(abstract.id)}
                  className="flex items-center gap-1.5 border border-[#c8d9f0] text-[#0b2d5e] px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-[#eef4fc] transition-colors"
                >
                  <Eye size={13} /> View
                </button>
                {abstract.status === 'pending' && (
                  <button
                    onClick={() => setReviewingId(abstract.id)}
                    className="flex items-center gap-1.5 bg-[#0b2d5e] text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-[#0e3d7a] transition-colors"
                  >
                    <Star size={13} /> Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {abstracts.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
            <p>No abstracts assigned yet. Check back after admin assignment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
