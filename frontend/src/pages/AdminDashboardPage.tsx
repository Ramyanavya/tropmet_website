import React from 'react'
import { useState } from 'react'
import {
  LayoutDashboard, FileText, Users, CheckCircle, XCircle, Clock,
  CreditCard, Contact2, UserPlus, Search, Download, Send,
  Eye, ChevronDown, LogIn, Shield, Bell, BarChart3, Settings,
  RefreshCw, Ticket, AlertCircle, X, BadgeCheck, Receipt, Award,
  Hash, Calendar, Globe, Mail, Phone, Building, Tag
} from 'lucide-react'

// ── Mock data ─────────────────────────────────────────────────────────────
const mockAbstracts = [
  {
    id: 1, absId: 'ABS-10001',
    title: 'AI-Enhanced Cyclone Prediction using Multi-Model Ensemble',
    author: 'Dr. Ramesh Kumar', email: 'rk@iitd.ac.in', phone: '+91 98765 11111',
    institution: 'IIT Delhi', designation: 'Professor', country: 'India',
    theme: 'AI & ML Applications', status: 'submitted', submitted: '2026-07-10',
    keywords: 'Cyclone, AI, Ensemble, NWP',
    presentationType: null, regId: null, paymentStatus: 'none', paymentAmount: null, paymentUTR: null, razorpayId: null,
  },
  {
    id: 2, absId: 'ABS-10002',
    title: 'Monsoon Onset Dynamics and ENSO Teleconnections',
    author: 'Dr. Priya Sharma', email: 'priya@imd.gov.in', phone: '+91 98765 22222',
    institution: 'IMD, New Delhi', designation: 'Scientist-D', country: 'India',
    theme: 'Monsoon Dynamics', status: 'under_review', submitted: '2026-07-15',
    reviewer: 'Dr. S. Mohan',
    keywords: 'Monsoon, ENSO, Teleconnection',
    presentationType: null, regId: null, paymentStatus: 'none', paymentAmount: null, paymentUTR: null, razorpayId: null,
  },
  {
    id: 3, absId: 'ABS-10432',
    title: 'Deep Learning for Nowcasting Intense Rainfall Events',
    author: 'Anand Mishra', email: 'am@ncmrwf.gov.in', phone: '+91 98765 33333',
    institution: 'NCMRWF, Noida', designation: 'Senior Scientist', country: 'India',
    theme: 'AI & ML Applications', status: 'accepted', submitted: '2026-07-08',
    reviewer: 'Dr. P. Nair',
    keywords: 'Deep Learning, Nowcasting, Rainfall',
    presentationType: 'Oral', regId: 'REG-2847',
    paymentStatus: 'paid', paymentAmount: 3000,
    paymentUTR: 'UTR426789012345', razorpayId: 'order_PqX8k2mTr9Lz4A',
    paymentDate: '2026-10-05', memberType: 'IMS Member',
  },
  {
    id: 4, absId: 'ABS-10004',
    title: 'Radar Data Assimilation in High-Resolution NWP',
    author: 'Dr. Kavitha Nair', email: 'kn@iiserbhopal.ac.in', phone: '+91 98765 44444',
    institution: 'IISER Bhopal', designation: 'Assistant Professor', country: 'India',
    theme: 'Data Assimilation', status: 'rejected', submitted: '2026-07-12',
    reviewer: 'Dr. A. Singh',
    keywords: 'Radar, Data Assimilation, NWP',
    presentationType: null, regId: null, paymentStatus: 'none', paymentAmount: null, paymentUTR: null, razorpayId: null,
  },
  {
    id: 5, absId: 'ABS-10005',
    title: 'Physics-Informed Neural Networks for NWP Parameterization',
    author: 'Suresh Babu', email: 'sb@tropmet.in', phone: '+91 98765 55555',
    institution: 'TROPMET Institute', designation: 'Research Scholar', country: 'India',
    theme: 'Physics-Driven AI', status: 'submitted', submitted: '2026-07-20',
    keywords: 'PINN, NWP, Parameterization',
    presentationType: null, regId: null, paymentStatus: 'none', paymentAmount: null, paymentUTR: null, razorpayId: null,
  },
]

const mockReviewers = [
  { id: 1, name: 'Dr. S. Mohan', email: 'smohan@imd.gov.in', specialization: 'AI & ML', assigned: 3, completed: 2 },
  { id: 2, name: 'Dr. P. Nair', email: 'pnair@ncmrwf.gov.in', specialization: 'NWP', assigned: 2, completed: 2 },
  { id: 3, name: 'Dr. A. Singh', email: 'asingh@iitb.ac.in', specialization: 'Data Assimilation', assigned: 2, completed: 1 },
]

const mockRegistrations = [
  { id: 1, name: 'Dr. Ramesh Kumar', email: 'rk@iitd.ac.in', category: 'IMS/OSI Members', amount: 3000, status: 'paid', type: 'online', regNo: 'TM2026-0003', earlyBird: true, utr: 'UTR123456789012', razorpayId: 'order_AbC123XyZ456', payDate: '2026-10-03', absId: 'ABS-10001' },
  { id: 2, name: 'Anand Mishra', email: 'am@ncmrwf.gov.in', category: 'IMS/OSI Members', amount: 3000, status: 'paid', type: 'online', regNo: 'TM2026-0001', earlyBird: true, utr: 'UTR426789012345', razorpayId: 'order_PqX8k2mTr9Lz4A', payDate: '2026-10-05', absId: 'ABS-10432' },
  { id: 3, name: 'Dr. Priya Sharma', email: 'priya@imd.gov.in', category: 'Non-IMS/OSI Members', amount: 4000, status: 'pending', type: 'online', regNo: null, earlyBird: true, utr: null, razorpayId: null, payDate: null, absId: 'ABS-10002' },
  { id: 4, name: 'Mr. Vijay Reddy', email: 'vr@spot.in', category: 'Non-IMS/OSI Members', amount: 5000, status: 'paid', type: 'spot', regNo: 'TM2026-S001', earlyBird: false, utr: 'CASH-001', razorpayId: null, payDate: '2026-11-19', absId: null },
]

type Tab = 'overview' | 'abstracts' | 'reviewers' | 'registrations' | 'spot' | 'notifications'

const STATUS_COLORS: Record<string, string> = {
  submitted:    'bg-blue-100 text-blue-700',
  under_review: 'bg-yellow-100 text-yellow-700',
  accepted:     'bg-green-100 text-green-700',
  rejected:     'bg-red-100 text-red-700',
  paid:         'bg-green-100 text-green-700',
  pending:      'bg-yellow-100 text-yellow-700',
  failed:       'bg-red-100 text-red-700',
}

// ── Detail Modal ──────────────────────────────────────────────────────────
function AbstractDetailModal({ abs, onClose }: { abs: typeof mockAbstracts[0]; onClose: () => void }) {
  const reg = mockRegistrations.find(r => r.absId === abs.absId)

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-[#0b2d5e] text-base">Abstract Full Details</h2>
            <p className="text-xs text-slate-400 font-mono">{abs.absId}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Status */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[abs.status]}`}>
              {abs.status.replace('_', ' ').toUpperCase()}
            </span>
            {abs.presentationType && (
              <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">{abs.presentationType} Presentation</span>
            )}
            {abs.paymentStatus === 'paid' && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle size={10} /> Payment Confirmed</span>
            )}
          </div>

          {/* Title */}
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Abstract Title</div>
            <p className="font-bold text-[#0b2d5e] text-sm leading-relaxed">{abs.title}</p>
          </div>

          {/* Author details */}
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-3">Author Information</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Users, label: 'Name', value: abs.author },
                { icon: Mail, label: 'Email', value: abs.email },
                { icon: Phone, label: 'Phone', value: abs.phone },
                { icon: Building, label: 'Institution', value: abs.institution },
                { icon: Tag, label: 'Designation', value: abs.designation },
                { icon: Globe, label: 'Country', value: abs.country },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Icon size={10} className="text-slate-400" />
                    <span className="text-[10px] text-slate-400 uppercase tracking-wide">{label}</span>
                  </div>
                  <div className="text-xs font-semibold text-[#0b2d5e]">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission info */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Abstract ID', value: abs.absId, mono: true },
              { label: 'Theme', value: abs.theme },
              { label: 'Submitted', value: abs.submitted },
              { label: 'Reviewer', value: (abs as any).reviewer || 'Not assigned' },
              { label: 'Keywords', value: abs.keywords },
              { label: 'Reg No', value: abs.regId || '—', mono: true },
            ].map(({ label, value, mono }) => (
              <div key={label} className="bg-[#f8fbff] border border-[#e6effa] rounded-xl p-3">
                <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">{label}</div>
                <div className={`text-xs font-semibold text-[#0b2d5e] ${mono ? 'font-mono' : ''}`}>{value}</div>
              </div>
            ))}
          </div>

          {/* Payment / Registration details */}
          {reg && (
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-3">Payment & Registration Details</div>
              <div className={`rounded-xl p-4 border ${reg.status === 'paid' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Registration No', value: reg.regNo || '—', mono: true },
                    { label: 'Payment Status', value: reg.status.toUpperCase() },
                    { label: 'Amount Paid', value: reg.amount ? `₹${reg.amount.toLocaleString()}` : '—' },
                    { label: 'Category', value: reg.category },
                    { label: 'Early Bird', value: reg.earlyBird ? 'Yes ✓' : 'No' },
                    { label: 'Payment Type', value: reg.type === 'spot' ? 'On-site / Spot' : 'Online (Razorpay)' },
                    { label: 'UTR / Ref No', value: reg.utr || '—', mono: true },
                    { label: 'Razorpay Order', value: reg.razorpayId || '—', mono: true },
                    { label: 'Payment Date', value: reg.payDate || '—' },
                  ].map(({ label, value, mono }) => (
                    <div key={label}>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">{label}</div>
                      <div className={`text-xs font-bold text-[#0b2d5e] ${mono ? 'font-mono' : ''}`}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 pb-5 flex gap-2 border-t border-slate-100 pt-4">
          {abs.status === 'accepted' && abs.paymentStatus === 'paid' && (
            <>
              <button className="flex items-center gap-1.5 bg-[#0b2d5e] text-white text-xs px-3 py-2 rounded-lg font-bold hover:bg-[#0e3d7a]">
                <BadgeCheck size={12} /> View ID Card
              </button>
              <button className="flex items-center gap-1.5 bg-amber-500 text-white text-xs px-3 py-2 rounded-lg font-bold hover:bg-amber-600">
                <Award size={12} /> Acceptance Letter
              </button>
              <button className="flex items-center gap-1.5 border border-green-300 bg-green-50 text-green-700 text-xs px-3 py-2 rounded-lg font-semibold">
                <Receipt size={12} /> Payment Receipt
              </button>
            </>
          )}
          <button onClick={onClose} className="ml-auto border border-slate-200 text-slate-500 text-xs px-4 py-2 rounded-lg hover:bg-slate-50">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Admin Login ────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('admin@tropmet2026.in')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handle = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'Admin@2026' || password === 'demo') {
      onLogin()
    } else {
      setError('Invalid credentials. Use password: demo')
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f5fc] flex items-center justify-center pt-24 pb-16 px-4">
      <div className="bg-white border border-[#c8d9f0] rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-rose-700 flex items-center justify-center mb-4">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[#0b2d5e]">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">TROPMET 2026 — Conference Management</p>
        </div>
        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0b2d5e] uppercase tracking-wider mb-1.5">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)}
              className="w-full border border-[#c8d9f0] rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-[#0b2d5e]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0b2d5e] uppercase tracking-wider mb-1.5">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password (demo: 'demo')"
              className="w-full border border-[#c8d9f0] rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-[#0b2d5e]" />
          </div>
          {error && <p className="text-red-600 text-xs font-sans bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
          <button type="submit" className="w-full bg-rose-700 hover:bg-rose-800 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
            <LogIn size={16} /> Sign In to Admin Panel
          </button>
        </form>
        <p className="text-center text-xs text-slate-400 mt-4">Demo password: <code className="bg-slate-100 px-1 rounded">demo</code></p>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number | string; icon: any; color: string }) {
  return (
    <div className="bg-white border border-[#c8d9f0] rounded-xl p-5 flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <div className="text-2xl font-display font-bold text-[#0b2d5e]">{value}</div>
        <div className="text-xs text-slate-500 font-sans mt-0.5">{label}</div>
      </div>
    </div>
  )
}

// ── Abstracts Tab ──────────────────────────────────────────────────────────
function AbstractsTab() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [assignModal, setAssignModal] = useState<number | null>(null)
  const [selectedReviewer, setSelectedReviewer] = useState('')
  const [detailAbs, setDetailAbs] = useState<typeof mockAbstracts[0] | null>(null)

  const filtered = mockAbstracts.filter(a =>
    (filter === 'all' || a.status === filter) &&
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.author.toLowerCase().includes(search.toLowerCase()) || a.absId.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search abstracts, authors, IDs…"
            className="w-full pl-9 pr-3 py-2 border border-[#c8d9f0] rounded-lg text-sm font-sans focus:outline-none focus:border-[#0b2d5e]" />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="border border-[#c8d9f0] rounded-lg px-3 py-2 text-sm font-sans focus:outline-none">
          <option value="all">All Status</option>
          <option value="submitted">Submitted</option>
          <option value="under_review">Under Review</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#c8d9f0] shadow-sm">
        <table className="w-full text-sm font-sans bg-white">
          <thead>
            <tr className="bg-[#f0f5fc] text-[#0b2d5e] text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Title / Author</th>
              <th className="px-4 py-3 text-left">Theme</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Reviewer</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="border-t border-[#e6effa] hover:bg-[#f8fbff]">
                <td className="px-4 py-3 text-slate-500 font-mono text-xs">{a.absId}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-[#0b2d5e] max-w-xs truncate text-xs">{a.title}</div>
                  <div className="text-[11px] text-slate-400">{a.author} · {a.email}</div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-500 max-w-[120px] truncate">{a.theme}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLORS[a.status]}`}>
                    {a.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {a.paymentStatus === 'paid' ? (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">Paid ✓</span>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">{(a as any).reviewer || '—'}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => setDetailAbs(a)}
                      className="text-[#0b2d5e] hover:bg-[#eef4fc] p-1.5 rounded-lg transition-colors" title="View full details">
                      <Eye size={14} />
                    </button>
                    {a.status === 'submitted' && (
                      <button onClick={() => setAssignModal(a.id)}
                        className="bg-[#0b2d5e] text-white text-xs px-2 py-1 rounded-lg hover:bg-[#0e3d7a] flex items-center gap-1">
                        <UserPlus size={11} /> Assign
                      </button>
                    )}
                    {a.status === 'under_review' && (
                      <div className="flex gap-1">
                        <button className="bg-green-700 text-white text-xs px-2 py-1 rounded-lg hover:bg-green-800">Accept</button>
                        <button className="bg-red-600 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-700">Reject</button>
                      </div>
                    )}
                    {a.status === 'accepted' && (
                      <button className="bg-amber-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-amber-600 flex items-center gap-1">
                        <Send size={11} /> Notify
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assign Reviewer Modal */}
      {assignModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-display text-lg font-bold text-[#0b2d5e] mb-4">Assign Reviewer</h3>
            <p className="text-sm text-slate-500 mb-4">Assign a reviewer for Abstract #{assignModal}</p>
            <select value={selectedReviewer} onChange={e => setSelectedReviewer(e.target.value)}
              className="w-full border border-[#c8d9f0] rounded-lg px-3 py-2.5 text-sm mb-4 focus:outline-none focus:border-[#0b2d5e]">
              <option value="">Select a reviewer…</option>
              {mockReviewers.map(r => (
                <option key={r.id} value={r.id}>{r.name} ({r.specialization})</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button onClick={() => setAssignModal(null)}
                className="flex-1 border border-[#c8d9f0] text-slate-600 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50">
                Cancel
              </button>
              <button onClick={() => { alert(`Reviewer assigned to Abstract #${assignModal}`); setAssignModal(null) }}
                className="flex-1 bg-[#0b2d5e] text-white py-2 rounded-lg text-sm font-bold hover:bg-[#0e3d7a]">
                Assign Reviewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailAbs && <AbstractDetailModal abs={detailAbs} onClose={() => setDetailAbs(null)} />}
    </div>
  )
}

// ── Registrations Tab ──────────────────────────────────────────────────────
function RegistrationsTab() {
  const [detailReg, setDetailReg] = useState<typeof mockRegistrations[0] | null>(null)
  const [search, setSearch] = useState('')

  const filtered = mockRegistrations.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    (r.regNo || '').toLowerCase().includes(search.toLowerCase()) ||
    (r.utr || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-green-700">{mockRegistrations.filter(r=>r.status==='paid').length}</div>
          <div className="text-xs text-green-600 mt-0.5">Payments Confirmed</div>
          <div className="text-sm font-bold text-green-700 mt-1">₹{mockRegistrations.filter(r=>r.status==='paid').reduce((s,r)=>s+r.amount,0).toLocaleString()}</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-yellow-700">{mockRegistrations.filter(r=>r.status==='pending').length}</div>
          <div className="text-xs text-yellow-600 mt-0.5">Pending Payment</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-purple-700">{mockRegistrations.filter(r=>r.type==='spot').length}</div>
          <div className="text-xs text-purple-600 mt-0.5">Spot Registrations</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, reg no, UTR…"
          className="w-full pl-9 pr-3 py-2 border border-[#c8d9f0] rounded-lg text-sm font-sans focus:outline-none focus:border-[#0b2d5e]" />
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#c8d9f0] shadow-sm">
        <table className="w-full text-sm font-sans bg-white">
          <thead>
            <tr className="bg-[#f0f5fc] text-[#0b2d5e] text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Reg No</th>
              <th className="px-4 py-3 text-left">Participant</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">UTR / Ref</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-t border-[#e6effa] hover:bg-[#f8fbff]">
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{r.regNo || '—'}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-[#0b2d5e] text-xs">{r.name}</div>
                  <div className="text-[11px] text-slate-400">{r.email}</div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">{r.category}</td>
                <td className="px-4 py-3 font-bold text-[#0b2d5e] text-xs">
                  ₹{r.amount.toLocaleString()}
                  {r.earlyBird && <span className="ml-1 text-[10px] bg-green-100 text-green-700 px-1 rounded">EB</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${r.type === 'spot' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {r.type}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{r.utr || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLORS[r.status]}`}>{r.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => setDetailReg(r)} className="text-[#0b2d5e] hover:bg-[#eef4fc] p-1.5 rounded-lg" title="View">
                      <Eye size={14} />
                    </button>
                    {r.status === 'paid' && (
                      <button className="bg-[#0b2d5e] text-white text-xs px-2 py-1 rounded-lg hover:bg-[#0e3d7a] flex items-center gap-1">
                        <BadgeCheck size={11} /> ID Card
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail modal for registration */}
      {detailReg && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
              <h2 className="font-bold text-[#0b2d5e]">Registration Details</h2>
              <button onClick={() => setDetailReg(null)} className="text-slate-400 hover:text-slate-700 text-xl">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Registration No', value: detailReg.regNo || '—', mono: true },
                  { label: 'Status', value: detailReg.status.toUpperCase() },
                  { label: 'Name', value: detailReg.name },
                  { label: 'Email', value: detailReg.email },
                  { label: 'Category', value: detailReg.category },
                  { label: 'Amount', value: `₹${detailReg.amount.toLocaleString()}${detailReg.earlyBird ? ' (Early Bird)' : ''}` },
                  { label: 'Payment Type', value: detailReg.type === 'spot' ? 'On-site Spot' : 'Online (Razorpay)' },
                  { label: 'UTR / Ref No', value: detailReg.utr || '—', mono: true },
                  { label: 'Razorpay Order ID', value: detailReg.razorpayId || '—', mono: true },
                  { label: 'Payment Date', value: detailReg.payDate || '—' },
                  { label: 'Abstract ID', value: detailReg.absId || '—', mono: true },
                ].map(({ label, value, mono }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-3">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">{label}</div>
                    <div className={`text-xs font-bold text-[#0b2d5e] ${mono ? 'font-mono' : ''}`}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-2 border-t border-slate-100 pt-4">
              {detailReg.status === 'paid' && (
                <>
                  <button className="flex items-center gap-1.5 bg-[#0b2d5e] text-white text-xs px-3 py-2 rounded-lg font-bold">
                    <BadgeCheck size={12} /> Download ID Card
                  </button>
                  <button className="flex items-center gap-1.5 bg-green-600 text-white text-xs px-3 py-2 rounded-lg font-bold">
                    <Receipt size={12} /> Payment Receipt
                  </button>
                </>
              )}
              <button onClick={() => setDetailReg(null)} className="ml-auto border border-slate-200 text-slate-500 text-xs px-4 py-2 rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Spot Registration Tab ─────────────────────────────────────────────────
function SpotTab() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', institution: '', designation: '', category: 'Non-IMS/OSI Members', payment_mode: 'cash' })
  const [submitted, setSubmitted] = useState(false)
  const [generatedReg, setGeneratedReg] = useState('')
  const FEES: Record<string, number> = { 'IMS/OSI Members': 4000, 'Non-IMS/OSI Members': 5000, 'Scholars/Students': 1500, 'Foreign Nationals': 12000, 'Industry': 6000 }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const regNo = 'TM2026-S' + String(Math.floor(Math.random() * 900) + 100)
    setGeneratedReg(regNo)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-white border border-[#c8d9f0] rounded-2xl p-8 text-center max-w-md mx-auto">
        <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold text-[#0b2d5e] mb-2">Spot Registration Complete!</h3>
        <div className="bg-[#f0f5fc] rounded-xl p-4 mb-6">
          <div className="text-xs text-slate-500 mb-1">Registration Number</div>
          <div className="font-mono text-2xl font-bold text-[#0b2d5e]">{generatedReg}</div>
        </div>
        <div className="text-sm text-slate-500 mb-4">{form.name} · {form.category}</div>
        <div className="flex gap-3 justify-center">
          <button className="bg-[#0b2d5e] text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
            <BadgeCheck size={16} /> Print ID Card
          </button>
          <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', institution: '', designation: '', category: 'Non-IMS/OSI Members', payment_mode: 'cash' }) }}
            className="border border-[#c8d9f0] text-[#0b2d5e] px-5 py-2 rounded-xl text-sm font-semibold">
            New Registration
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 mb-6">
        <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Spot Registration — On-site only</p>
          <p className="text-xs text-amber-700 mt-0.5">This form is for admin use only. Collect participant details and process payment at the venue.</p>
        </div>
      </div>
      <div className="bg-white border border-[#c8d9f0] rounded-2xl p-6 shadow-sm">
        <h3 className="font-display text-lg font-bold text-[#0b2d5e] mb-5">Register Walk-in Attendee</h3>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          {[
            { label: 'Full Name *', key: 'name', type: 'text' },
            { label: 'Email *', key: 'email', type: 'email' },
            { label: 'Phone *', key: 'phone', type: 'tel' },
            { label: 'Institution', key: 'institution', type: 'text' },
            { label: 'Designation', key: 'designation', type: 'text' },
          ].map(f => (
            <div key={f.key} className={f.key === 'institution' ? 'sm:col-span-2' : ''}>
              <label className="block text-xs font-bold text-[#0b2d5e] uppercase tracking-wider mb-1.5">{f.label}</label>
              <input type={f.type} required={f.label.includes('*')} value={(form as any)[f.key]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full border border-[#c8d9f0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0b2d5e]" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-bold text-[#0b2d5e] uppercase tracking-wider mb-1.5">Category *</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full border border-[#c8d9f0] rounded-lg px-3 py-2.5 text-sm focus:outline-none">
              {Object.keys(FEES).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0b2d5e] uppercase tracking-wider mb-1.5">Payment Mode *</label>
            <select value={form.payment_mode} onChange={e => setForm({ ...form, payment_mode: e.target.value })}
              className="w-full border border-[#c8d9f0] rounded-lg px-3 py-2.5 text-sm focus:outline-none">
              <option value="cash">Cash</option>
              <option value="upi">UPI / QR Code</option>
              <option value="dd">Demand Draft</option>
              <option value="card">Card (POS)</option>
            </select>
          </div>
          <div className="sm:col-span-2 bg-[#f0f5fc] rounded-xl p-4 flex justify-between items-center">
            <div>
              <div className="text-xs text-slate-500">Registration Fee (Spot / On-site)</div>
              <div className="text-2xl font-display font-bold text-[#0b2d5e]">₹{FEES[form.category]?.toLocaleString()}</div>
            </div>
            <button type="submit" className="bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
              <CreditCard size={16} /> Confirm & Generate ID
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Notifications Tab ─────────────────────────────────────────────────────
function NotificationsTab() {
  const notifications = [
    { type: 'bulk_accept', label: 'Send Acceptance Notifications', desc: 'Email all accepted authors with their acceptance letter and next steps.', count: 1, action: 'Send to 1 author', color: 'bg-green-600' },
    { type: 'remind_confirm', label: 'Confirmation Reminder', desc: 'Remind accepted authors who have not confirmed participation by 15 Sep 2026.', count: 0, action: 'No pending', color: 'bg-slate-300' },
    { type: 'payment_remind', label: 'Payment Reminder', desc: 'Email registered authors whose payment is still pending.', count: 1, action: 'Send to 1 author', color: 'bg-amber-500' },
    { type: 'id_card', label: 'Send ID Cards', desc: 'Email ID card PDFs to all participants who have paid.', count: 3, action: 'Send to 3 participants', color: 'bg-[#0b2d5e]' },
  ]
  return (
    <div className="space-y-4 max-w-2xl">
      <p className="text-sm text-slate-500 font-sans">Trigger bulk email notifications to authors and participants.</p>
      {notifications.map(n => (
        <div key={n.type} className="bg-white border border-[#c8d9f0] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm">
          <div className="flex-1">
            <h3 className="font-sans font-bold text-[#0b2d5e] text-sm">{n.label}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
          </div>
          <button disabled={n.count === 0}
            className={`shrink-0 ${n.color} text-white text-xs px-4 py-2 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5`}>
            <Send size={12} /> {n.action}
          </button>
        </div>
      ))}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [tab, setTab] = useState<Tab>('overview')

  if (!loggedIn) return <AdminLogin onLogin={() => setLoggedIn(true)} />

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'overview',      label: 'Overview',        icon: BarChart3 },
    { id: 'abstracts',     label: 'Abstracts',       icon: FileText },
    { id: 'reviewers',     label: 'Reviewers',       icon: Users },
    { id: 'registrations', label: 'Registrations',   icon: CreditCard },
    { id: 'spot',          label: 'Spot Reg',         icon: Ticket },
    { id: 'notifications', label: 'Notifications',   icon: Bell },
  ]

  const totalRevenue = mockRegistrations.filter(r => r.status === 'paid').reduce((s, r) => s + r.amount, 0)

  return (
    <div className="min-h-screen bg-[#f0f5fc] pt-28 pb-16">
      <div className="bg-gradient-to-r from-[#021b3e] to-rose-900 py-10 border-b border-rose-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-rose-300 mb-1">Admin Panel</p>
            <h1 className="font-display text-3xl font-bold text-white">Conference Management</h1>
            <p className="text-rose-200 text-sm mt-1 font-sans">TROPMET 2026 — PRaGaTI, NCMRWF Noida</p>
          </div>
          <button onClick={() => setLoggedIn(false)}
            className="border border-rose-400 text-rose-300 hover:bg-rose-800/40 text-xs px-4 py-2 rounded-lg font-semibold">
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        <div className="flex gap-1 bg-white border border-[#c8d9f0] rounded-xl p-1 mb-6 overflow-x-auto shadow-sm">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap
                ${tab === t.id ? 'bg-[#0b2d5e] text-white shadow-sm' : 'text-slate-500 hover:bg-[#f0f5fc]'}`}>
              <t.icon size={13} /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatCard label="Total Abstracts"    value={mockAbstracts.length}  icon={FileText}     color="bg-[#0b2d5e]" />
              <StatCard label="Under Review"       value={mockAbstracts.filter(a=>a.status==='under_review').length}  icon={Clock}        color="bg-yellow-500" />
              <StatCard label="Accepted"           value={mockAbstracts.filter(a=>a.status==='accepted').length}  icon={CheckCircle}  color="bg-green-600" />
              <StatCard label="Rejected"           value={mockAbstracts.filter(a=>a.status==='rejected').length}  icon={XCircle}      color="bg-red-600" />
              <StatCard label="Registrations"      value={mockRegistrations.length}  icon={CreditCard}   color="bg-teal-600" />
              <StatCard label="Revenue"  value={`₹${(totalRevenue/1000).toFixed(0)}K`} icon={BarChart3}   color="bg-amber-500" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#c8d9f0] rounded-2xl p-5 shadow-sm">
                <h3 className="font-display font-bold text-[#0b2d5e] mb-4 flex items-center gap-2">
                  <FileText size={16} /> Recent Abstracts
                </h3>
                <div className="space-y-3">
                  {mockAbstracts.slice(0, 4).map(a => (
                    <div key={a.id} className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-[#0b2d5e] truncate">{a.title}</div>
                        <div className="text-[11px] text-slate-400">{a.author} · <span className="font-mono">{a.absId}</span></div>
                      </div>
                      <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLORS[a.status]}`}>
                        {a.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#c8d9f0] rounded-2xl p-5 shadow-sm">
                <h3 className="font-display font-bold text-[#0b2d5e] mb-4 flex items-center gap-2">
                  <CreditCard size={16} /> Recent Payments
                </h3>
                <div className="space-y-3">
                  {mockRegistrations.filter(r => r.status === 'paid').map(r => (
                    <div key={r.id} className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-semibold text-[#0b2d5e]">{r.name}</div>
                        <div className="text-[11px] text-slate-400">
                          <span className="font-mono">{r.regNo}</span> · UTR: <span className="font-mono">{r.utr?.slice(0, 12)}…</span>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-green-700">₹{r.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h3 className="font-sans font-bold text-amber-800 mb-3 flex items-center gap-2">
                <AlertCircle size={16} /> Action Required
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-amber-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  {mockAbstracts.filter(a=>a.status==='submitted').length} abstracts waiting for reviewer assignment
                </div>
                <div className="flex items-center gap-2 text-sm text-amber-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  {mockAbstracts.filter(a=>a.status==='accepted').length} abstract(s) accepted — send acceptance notification
                </div>
                <div className="flex items-center gap-2 text-sm text-amber-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  {mockRegistrations.filter(r=>r.status==='pending').length} payment(s) pending — send reminder
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'abstracts'     && <AbstractsTab />}
        {tab === 'registrations' && <RegistrationsTab />}
        {tab === 'spot'          && <SpotTab />}
        {tab === 'notifications' && <NotificationsTab />}

        {tab === 'reviewers' && (
          <div className="overflow-x-auto rounded-xl border border-[#c8d9f0] shadow-sm">
            <table className="w-full text-sm font-sans bg-white overflow-hidden">
              <thead>
                <tr className="bg-[#f0f5fc] text-[#0b2d5e] text-xs uppercase tracking-wider">
                  <th className="px-5 py-3 text-left">Reviewer</th>
                  <th className="px-5 py-3 text-left">Specialization</th>
                  <th className="px-5 py-3 text-center">Assigned</th>
                  <th className="px-5 py-3 text-center">Completed</th>
                  <th className="px-5 py-3 text-center">Progress</th>
                </tr>
              </thead>
              <tbody>
                {mockReviewers.map(r => (
                  <tr key={r.id} className="border-t border-[#e6effa] hover:bg-[#f8fbff]">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-[#0b2d5e]">{r.name}</div>
                      <div className="text-xs text-slate-400">{r.email}</div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">{r.specialization}</td>
                    <td className="px-5 py-4 text-center font-bold text-[#0b2d5e]">{r.assigned}</td>
                    <td className="px-5 py-4 text-center font-bold text-green-700">{r.completed}</td>
                    <td className="px-5 py-4">
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(r.completed / r.assigned) * 100}%` }} />
                      </div>
                      <div className="text-xs text-center text-slate-400 mt-1">{r.completed}/{r.assigned}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}