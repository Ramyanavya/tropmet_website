import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText, Clock, CheckCircle, XCircle, RefreshCw, Bell, User,
  LogOut, ChevronRight, CreditCard, QrCode, Download, BadgeCheck,
  Award, Receipt, Camera, Shield
} from 'lucide-react'

// ─── Mock data ──────────────────────────────────────────────────────────────
const MOCK_AUTHOR = {
  name: 'Dr. Anand Mishra',
  email: 'am@ncmrwf.gov.in',
  phone: '+91 98765 43210',
  institution: 'NCMRWF, Noida',
  designation: 'Senior Scientist',
  memberType: 'IMS Member',
  photo: null as string | null,
}

const MOCK_SUBMISSIONS = [
  {
    id: 'ABS-10432',
    title: 'Deep Learning Approaches for Tropical Cyclone Intensity Prediction',
    submitted: '2026-07-12',
    status: 'accepted',
    reviewerComment: 'Strong methodology and novel approach. Accepted for oral presentation.',
    presentationType: 'Oral',
    paymentStatus: 'paid',
    regId: 'REG-2847',
    paymentUTR: 'UTR426789012345',
    paymentAmount: 3000,
    paymentDate: '2026-10-05',
    paymentMode: 'Razorpay (Online)',
    razorpayOrderId: 'order_PqX8k2mTr9Lz4A',
  },
]

const MOCK_NOTIFICATIONS = [
  { id: 1, text: 'Your abstract ABS-10432 has been accepted for oral presentation!', date: '2026-09-30', read: false },
  { id: 2, text: 'Payment confirmed for registration REG-2847. Your ID card is ready.', date: '2026-10-05', read: false },
  { id: 3, text: 'Abstract submission deadline extended to 20 August 2026.', date: '2026-07-15', read: true },
]

const statusConfig: Record<string, { label: string; icon: any; cls: string }> = {
  pending:        { label: 'Under Review',   icon: Clock,       cls: 'bg-amber-100 text-amber-700' },
  accepted:       { label: 'Accepted',       icon: CheckCircle, cls: 'bg-green-100 text-green-700' },
  rejected:       { label: 'Rejected',       icon: XCircle,     cls: 'bg-red-100 text-red-700' },
  minor_revision: { label: 'Minor Revision', icon: RefreshCw,   cls: 'bg-blue-100 text-blue-700' },
  major_revision: { label: 'Major Revision', icon: RefreshCw,   cls: 'bg-orange-100 text-orange-700' },
}

// ─── QR Code SVG generator ─────────────────────────────────────────────────
function QRCodeSVG({ value }: { value: string }) {
  // Simple deterministic pseudo-QR pattern from value string
  const size = 21
  const hash = value.split('').reduce((acc, c, i) => acc ^ (c.charCodeAt(0) * (i + 7)), 0)
  const cells: boolean[][] = Array.from({ length: size }, (_, r) =>
    Array.from({ length: size }, (_, c) => {
      // finder patterns
      if ((r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7)) {
        const inOuter = r === 0 || r === 6 || c === 0 || c === 6 || (r >= size-7 && (r === size-7 || r === size-1 || c === 0 || c === 6)) || (c >= size-7 && (c === size-7 || c === size-1 || r === 0 || r === 6))
        const inInner = (r >= 2 && r <= 4 && c >= 2 && c <= 4) || (r >= 2 && r <= 4 && c >= size-5 && c <= size-3) || (r >= size-5 && r <= size-3 && c >= 2 && c <= 4)
        return inOuter || inInner
      }
      // timing
      if (r === 6 || c === 6) return (r + c) % 2 === 0
      // data modules
      return (((r * 31 + c * 17 + hash) ^ (r * c)) % 3) !== 0
    })
  )
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%" shapeRendering="crispEdges">
      <rect width={size} height={size} fill="white" />
      {cells.map((row, r) => row.map((on, c) => on ? (
        <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="#0b2d5e" />
      ) : null))}
    </svg>
  )
}

// ─── NCMRWF Logo SVG (inline, since we can't import from assets in this context) ─
const NCMRWF_LOGO = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0OCIgZmlsbD0iI0ZGODAwMCIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjM1IiBmaWxsPSJ3aGl0ZSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjE1IiBmaWxsPSIjMjIyIiBvcGFjaXR5PSIuMiIvPjx0ZXh0IHg9IjUwIiB5PSI5NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI4IiBmaWxsPSIjMDEzM0FBIiBmb250LXdlaWdodD0iYm9sZCI+TkNNUldGPC90ZXh0Pjwvc3ZnPg==`

// ─── ID Card Component ─────────────────────────────────────────────────────
function IDCard({ author, submission, onClose }: { author: typeof MOCK_AUTHOR; submission: typeof MOCK_SUBMISSIONS[0]; onClose: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(author.photo)
  const fileRef = useRef<HTMLInputElement>(null)

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setPhotoUrl(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handlePrint = () => {
    const printContents = cardRef.current?.innerHTML
    if (!printContents) return
    const win = window.open('', '_blank', 'width=800,height=600')
    if (!win) return
    win.document.write(`
      <html><head><title>TROPMET 2026 - ID Card</title>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background: white; display:flex; justify-content:center; align-items:center; min-height:100vh; font-family: 'Segoe UI', sans-serif; }
      </style></head>
      <body>${printContents}</body></html>
    `)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); win.close() }, 500)
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-[#0b2d5e] text-lg">Conference ID Card</h2>
            <p className="text-xs text-slate-400">Preview & print your participant ID card</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-2xl leading-none">×</button>
        </div>

        <div className="p-6">
          {/* Upload photo notice */}
          {!photoUrl && (
            <div className="mb-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3">
              <Camera size={18} className="text-amber-600 shrink-0" />
              <div className="flex-1 text-xs text-amber-700">Add your profile photo for a complete ID card</div>
              <button onClick={() => fileRef.current?.click()}
                className="text-xs font-bold bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600">
                Upload Photo
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            </div>
          )}

          {/* ── ID Card Preview ── */}
          <div ref={cardRef}>
            <div style={{
              width: '100%', maxWidth: '420px', margin: '0 auto',
              background: 'linear-gradient(135deg, #0b2d5e 0%, #1a5fa8 100%)',
              borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              fontFamily: "'Segoe UI', sans-serif"
            }}>
              {/* Header stripe */}
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src={NCMRWF_LOGO} alt="NCMRWF" style={{ width: 36, height: 36, objectFit: 'contain' }} />
                </div>
                <div>
                  <div style={{ color: '#fbbf24', fontWeight: 800, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>TROPMET 2026</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 9, letterSpacing: 1 }}>PRaGaTI · NCMRWF, Noida · 19–21 Nov 2026</div>
                </div>
                <div style={{ marginLeft: 'auto', background: '#fbbf24', color: '#0b2d5e', fontSize: 8, fontWeight: 800, padding: '4px 8px', borderRadius: 6, letterSpacing: 1, textTransform: 'uppercase' }}>
                  {submission.presentationType}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '20px', display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                {/* Photo */}
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    width: 90, height: 110, borderRadius: 10, overflow: 'hidden',
                    border: '3px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {photoUrl ? (
                      <img src={photoUrl} alt="Author" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
                        <div style={{ fontSize: 28 }}>👤</div>
                        <div style={{ fontSize: 9, marginTop: 4 }}>No Photo</div>
                      </div>
                    )}
                  </div>
                  {photoUrl && (
                    <button onClick={() => fileRef.current?.click()}
                      style={{ marginTop: 6, width: '100%', background: 'rgba(255,255,255,0.15)', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 9, padding: '4px', borderRadius: 6, cursor: 'pointer' }}>
                      Change
                    </button>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: 'white', fontWeight: 800, fontSize: 15, lineHeight: 1.3, marginBottom: 4 }}>{author.name}</div>
                  <div style={{ color: '#fbbf24', fontSize: 11, fontWeight: 600, marginBottom: 10 }}>{author.designation}</div>
                  <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10, marginBottom: 3, lineHeight: 1.4 }}>{author.institution}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9, marginBottom: 12 }}>{author.email}</div>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                    {[
                      { label: 'Paper ID', value: submission.id },
                      { label: 'Reg No', value: submission.regId },
                      { label: 'Member', value: author.memberType },
                    ].map(item => (
                      <div key={item.label} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 6, padding: '5px 10px' }}>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</div>
                        <div style={{ color: 'white', fontSize: 10, fontWeight: 700, marginTop: 1 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9, fontStyle: 'italic', lineHeight: 1.4 }}>
                    "{submission.title.length > 60 ? submission.title.slice(0, 60) + '…' : submission.title}"
                  </div>
                </div>
              </div>

              {/* QR + Footer */}
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ width: 64, height: 64, background: 'white', borderRadius: 8, padding: 4, flexShrink: 0 }}>
                  <QRCodeSVG value={`TROPMET2026|${submission.regId}|${submission.id}|${author.name}`} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fbbf24', fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>Scan to verify</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 8, fontFamily: 'monospace' }}>{submission.regId} · {submission.id}</div>
                  <div style={{ marginTop: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 4, padding: '3px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      {'|||||||||||||||||||||||||||||||||||||||||||||'.split('').map((_, i) => (
                        <div key={i} style={{ width: 1.5, height: i % 3 === 0 ? 16 : i % 2 === 0 ? 12 : 8, background: 'rgba(255,255,255,0.7)', borderRadius: 1 }} />
                      ))}
                    </div>
                    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 7, marginTop: 2, fontFamily: 'monospace', letterSpacing: 2 }}>
                      {submission.regId.replace('REG-', '')} {submission.id.replace('ABS-', '')} 2026
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <Shield size={20} color="rgba(255,255,255,0.4)" />
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 7, textAlign: 'center' }}>NCMRWF<br/>Authorized</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-5 justify-center">
            <button onClick={handlePrint}
              className="flex items-center gap-2 bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-lg">
              <Download size={15} /> Download / Print ID Card
            </button>
            <button onClick={onClose}
              className="border border-slate-200 text-slate-600 hover:bg-slate-50 px-5 py-2.5 rounded-xl font-semibold text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Acceptance Letter ─────────────────────────────────────────────────────
function AcceptanceLetter({ author, submission, onClose }: { author: typeof MOCK_AUTHOR; submission: typeof MOCK_SUBMISSIONS[0]; onClose: () => void }) {
  const letterRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    const printContents = letterRef.current?.innerHTML
    if (!printContents) return
    const win = window.open('', '_blank', 'width=900,height=700')
    if (!win) return
    win.document.write(`
      <html><head><title>TROPMET 2026 - Acceptance Letter</title>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background: white; padding: 40px; font-family: 'Times New Roman', serif; color: #111; }
        @media print { body { padding: 20px; } }
      </style></head>
      <body>${printContents}</body></html>
    `)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); win.close() }, 500)
  }

  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-[#0b2d5e] text-lg">Acceptance Letter</h2>
            <p className="text-xs text-slate-400">Official acceptance for TROPMET 2026</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-2xl leading-none">×</button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[75vh]">
          <div ref={letterRef}>
            <div style={{ fontFamily: "'Times New Roman', serif", color: '#111', background: 'white', padding: 8 }}>
              {/* Letterhead */}
              <div style={{ borderBottom: '3px double #0b2d5e', paddingBottom: 16, marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                <div style={{ width: 60, height: 60, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8faff', borderRadius: 8, border: '1px solid #c8d9f0' }}>
                  <img src={NCMRWF_LOGO} alt="NCMRWF" style={{ width: 52, height: 52, objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#666', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>National Centre for Medium Range Weather Forecasting</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#0b2d5e', letterSpacing: 1 }}>TROPMET 2026</div>
                  <div style={{ fontSize: 11, color: '#1a5fa8', marginTop: 2 }}>PRaGaTI — Progress in Meteorology through AI & Technology Integration</div>
                  <div style={{ fontSize: 10, color: '#888', marginTop: 4 }}>19–21 November 2026 · NCMRWF Campus, Noida, India</div>
                </div>
                <div style={{ width: 60, height: 60, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8faff', borderRadius: 8, border: '1px solid #c8d9f0' }}>
                  {/* Ashoka emblem placeholder */}
                  <div style={{ fontSize: 28, lineHeight: 1 }}>🏛️</div>
                </div>
              </div>

              {/* Ref and date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 20, color: '#444' }}>
                <div>Ref No: TROPMET/2026/ACCEPT/{submission.id}</div>
                <div>Date: {today}</div>
              </div>

              {/* Addressee */}
              <div style={{ marginBottom: 20, fontSize: 12 }}>
                <strong>{author.name}</strong><br />
                {author.designation}<br />
                {author.institution}<br />
                Email: {author.email}
              </div>

              {/* Subject */}
              <div style={{ marginBottom: 18, fontSize: 12 }}>
                <strong>Subject:</strong> <u>Acceptance of Abstract for Presentation at TROPMET 2026</u>
              </div>

              {/* Body */}
              <div style={{ fontSize: 12, lineHeight: 1.8, marginBottom: 16 }}>
                <p style={{ marginBottom: 14 }}>Dear {author.name},</p>
                <p style={{ marginBottom: 14 }}>
                  On behalf of the Organizing Committee of <strong>TROPMET 2026 — PRaGaTI (Progress in Meteorology through AI & Technology Integration)</strong>, we are delighted to inform you that your abstract has been reviewed by the Scientific Programme Committee and has been <strong>accepted for presentation</strong> at the conference.
                </p>

                <div style={{ background: '#f0f7ff', border: '1px solid #c8d9f0', borderRadius: 8, padding: '12px 16px', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                    {[
                      ['Paper ID', submission.id],
                      ['Paper Title', submission.title],
                      ['Author(s)', author.name],
                      ['Affiliation', author.institution],
                      ['Presentation Type', submission.presentationType + ' Presentation'],
                      ['Registration No', submission.regId],
                      ['Conference Dates', '19–21 November 2026'],
                      ['Venue', 'NCMRWF Campus, A-50, Sector-62, Noida – 201 309, Uttar Pradesh, India'],
                    ].map(([label, value]) => (
                      <tr key={label} style={{ borderBottom: '1px solid #e6effa' }}>
                        <td style={{ padding: '5px 8px', fontWeight: 700, color: '#0b2d5e', whiteSpace: 'nowrap', width: '35%' }}>{label}</td>
                        <td style={{ padding: '5px 8px', color: '#333' }}>{value}</td>
                      </tr>
                    ))}
                  </table>
                </div>

                <p style={{ marginBottom: 14 }}>
                  You are requested to present your work during the designated session. Detailed session timings and hall assignments will be communicated closer to the conference date. Please ensure your presentation adheres to the guidelines provided on the conference website.
                </p>
                <p style={{ marginBottom: 14 }}>
                  We also remind you to complete your conference registration and fee payment at the earliest if not already done, to confirm your participation. Registration receipts and ID cards are available for download from your author dashboard.
                </p>
                <p style={{ marginBottom: 20 }}>
                  We look forward to your participation and contribution to TROPMET 2026. For any queries, please contact us at <strong>tropmet2026@ncmrwf.gov.in</strong>.
                </p>
              </div>

              {/* Signatures */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30, fontSize: 11 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ borderTop: '1px solid #aaa', paddingTop: 6, width: 160 }}>
                    <strong>Dr. [Name]</strong><br />
                    Programme Chair, TROPMET 2026<br />
                    NCMRWF, Noida
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ borderTop: '1px solid #aaa', paddingTop: 6, width: 160 }}>
                    <strong>Dr. [Name]</strong><br />
                    Organizing Secretary, TROPMET 2026<br />
                    NCMRWF, Noida
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ marginTop: 24, paddingTop: 12, borderTop: '2px solid #0b2d5e', fontSize: 9, color: '#888', textAlign: 'center', lineHeight: 1.6 }}>
                This is a computer-generated acceptance letter. For verification, scan the QR code on your ID card or email tropmet2026@ncmrwf.gov.in<br />
                NCMRWF, A-50, Sector-62, Noida – 201 309, Uttar Pradesh, India | www.ncmrwf.gov.in
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-5 justify-center border-t border-slate-100 pt-4">
          <button onClick={handlePrint}
            className="flex items-center gap-2 bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white px-6 py-2.5 rounded-xl font-bold text-sm">
            <Download size={15} /> Download Acceptance Letter
          </button>
          <button onClick={onClose}
            className="border border-slate-200 text-slate-600 hover:bg-slate-50 px-5 py-2.5 rounded-xl font-semibold text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Payment / Registration Receipt ──────────────────────────────────────
function PaymentReceipt({ author, submission, onClose }: { author: typeof MOCK_AUTHOR; submission: typeof MOCK_SUBMISSIONS[0]; onClose: () => void }) {
  const receiptRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    const printContents = receiptRef.current?.innerHTML
    if (!printContents) return
    const win = window.open('', '_blank', 'width=800,height=600')
    if (!win) return
    win.document.write(`
      <html><head><title>TROPMET 2026 - Payment Receipt</title>
      <style>* { margin:0; padding:0; box-sizing:border-box; } body { background: white; padding: 30px; font-family: 'Segoe UI', sans-serif; }</style>
      </head><body>${printContents}</body></html>
    `)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); win.close() }, 500)
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-[#0b2d5e] text-lg">Payment Receipt</h2>
            <p className="text-xs text-slate-400">Official registration & payment confirmation</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-2xl leading-none">×</button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[75vh]">
          <div ref={receiptRef}>
            <div style={{ fontFamily: "'Segoe UI', sans-serif", background: 'white', color: '#111' }}>

              {/* Header */}
              <div style={{ background: 'linear-gradient(135deg, #0b2d5e, #1a5fa8)', borderRadius: 12, padding: '20px 24px', color: 'white', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Official Receipt</div>
                  <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 0.5 }}>TROPMET 2026</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Conference Registration & Payment</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ background: '#fbbf24', color: '#0b2d5e', fontWeight: 800, fontSize: 11, padding: '6px 14px', borderRadius: 8, marginBottom: 6 }}>PAID ✓</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>Receipt No: {submission.regId}</div>
                </div>
              </div>

              {/* Participant info */}
              <div style={{ border: '1px solid #e6effa', borderRadius: 10, padding: 16, marginBottom: 16, background: '#f8fbff' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#0b2d5e', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Participant Details</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px' }}>
                  {[
                    ['Name', author.name],
                    ['Designation', author.designation],
                    ['Institution', author.institution],
                    ['Email', author.email],
                    ['Phone', author.phone],
                    ['Membership', author.memberType],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div style={{ fontSize: 9, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#111', marginTop: 1 }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Abstract info */}
              <div style={{ border: '1px solid #e6effa', borderRadius: 10, padding: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#0b2d5e', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Abstract Details</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#0b2d5e', marginBottom: 8, lineHeight: 1.4 }}>{submission.title}</div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {[
                    ['Abstract ID', submission.id],
                    ['Presentation Type', submission.presentationType],
                    ['Submission Date', submission.submitted],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div style={{ fontSize: 9, color: '#888' }}>{label}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#333' }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment details */}
              <div style={{ border: '1px solid #d1fae5', borderRadius: 10, padding: 16, marginBottom: 16, background: '#f0fdf4' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#065f46', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Payment Details</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                  <tbody>
                    {[
                      ['Registration Category', author.memberType],
                      ['Payment Mode', submission.paymentMode],
                      ['Transaction / UTR No', submission.paymentUTR],
                      ['Razorpay Order ID', submission.razorpayOrderId],
                      ['Payment Date', submission.paymentDate],
                      ['Registration No', submission.regId],
                    ].map(([label, value]) => (
                      <tr key={label} style={{ borderBottom: '1px solid #d1fae5' }}>
                        <td style={{ padding: '6px 0', color: '#555', fontWeight: 500 }}>{label}</td>
                        <td style={{ padding: '6px 0', fontWeight: 700, color: '#111', fontFamily: label.includes('UTR') || label.includes('Order') ? 'monospace' : 'inherit' }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Amount */}
              <div style={{ background: '#0b2d5e', borderRadius: 10, padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10 }}>Registration Fee (Early Bird)</div>
                  <div style={{ color: '#fbbf24', fontWeight: 800, fontSize: 22 }}>₹{submission.paymentAmount.toLocaleString('en-IN')}</div>
                </div>
                <div style={{ textAlign: 'right', color: 'rgba(255,255,255,0.7)', fontSize: 9, lineHeight: 1.6 }}>
                  Incl. GST as applicable<br />
                  NCMRWF, MoES, Govt. of India
                </div>
              </div>

              {/* Footer */}
              <div style={{ fontSize: 9, color: '#999', textAlign: 'center', lineHeight: 1.6, borderTop: '1px solid #f0f0f0', paddingTop: 12 }}>
                This is an electronically generated receipt and does not require a physical signature.<br />
                For disputes / queries: tropmet2026@ncmrwf.gov.in | NCMRWF, A-50, Sector-62, Noida – 201 309
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-5 justify-center border-t border-slate-100 pt-4">
          <button onClick={handlePrint}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-xl font-bold text-sm">
            <Download size={15} /> Download Payment Receipt
          </button>
          <button onClick={onClose}
            className="border border-slate-200 text-slate-600 hover:bg-slate-50 px-5 py-2.5 rounded-xl font-semibold text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Dashboard ────────────────────────────────────────────────────────
export default function AuthorDashboardPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  const [showNotif, setShowNotif] = useState(false)
  const [showIDCard, setShowIDCard] = useState<typeof MOCK_SUBMISSIONS[0] | null>(null)
  const [showLetter, setShowLetter] = useState<typeof MOCK_SUBMISSIONS[0] | null>(null)
  const [showReceipt, setShowReceipt] = useState<typeof MOCK_SUBMISSIONS[0] | null>(null)

  const author = MOCK_AUTHOR
  const submissions = MOCK_SUBMISSIONS
  const unread = notifications.filter(n => !n.read).length

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })))

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#021b3e] to-[#0b2d5e] rounded-2xl p-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center">
              <User size={22} className="text-[#0b2d5e]" />
            </div>
            <div>
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-0.5">Author Dashboard</p>
              <h1 className="font-display font-bold text-xl text-white">{author.name}</h1>
              <p className="text-white/50 text-xs mt-0.5">{author.institution} · {author.memberType}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => { setShowNotif(!showNotif); markAllRead() }}
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center relative"
              >
                <Bell size={18} className="text-white" />
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-[#0b2d5e] text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unread}
                  </span>
                )}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-11 w-80 bg-white rounded-2xl shadow-2xl border border-[#e6effa] z-50">
                  <div className="p-4 border-b border-slate-100">
                    <h3 className="font-bold text-[#0b2d5e] text-sm">Notifications</h3>
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} className={`p-4 border-b border-slate-50 text-xs ${n.read ? 'text-slate-400' : 'text-slate-700 font-medium'}`}>
                      <p className="leading-relaxed">{n.text}</p>
                      <p className="text-slate-400 mt-1">{n.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-semibold border border-white/20 rounded-xl px-3 py-2">
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Submitted', value: submissions.length, cls: 'text-sky-600 bg-sky-100' },
            { label: 'Under Review', value: submissions.filter(s => s.status === 'pending').length, cls: 'text-amber-600 bg-amber-100' },
            { label: 'Accepted', value: submissions.filter(s => s.status === 'accepted').length, cls: 'text-green-600 bg-green-100' },
            { label: 'Rejected', value: submissions.filter(s => s.status === 'rejected').length, cls: 'text-red-600 bg-red-100' },
          ].map(({ label, value, cls }) => (
            <div key={label} className="bg-white rounded-2xl border border-[#e6effa] p-5 shadow-sm text-center">
              <p className={`font-display font-bold text-3xl ${cls.split(' ')[0]}`}>{value}</p>
              <p className="text-xs text-slate-400 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link to="/submit-abstract" className="bg-white border border-[#e6effa] rounded-2xl p-5 flex items-center gap-3 hover:border-sky-300 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
              <FileText size={18} className="text-sky-600" />
            </div>
            <div>
              <p className="font-bold text-[#0b2d5e] text-sm">Submit Abstract</p>
              <p className="text-xs text-slate-400">Add a new submission</p>
            </div>
            <ChevronRight size={16} className="text-slate-300 ml-auto group-hover:text-sky-500" />
          </Link>
          <Link to="/registration" className="bg-white border border-[#e6effa] rounded-2xl p-5 flex items-center gap-3 hover:border-sky-300 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <CreditCard size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="font-bold text-[#0b2d5e] text-sm">Pay & Register</p>
              <p className="text-xs text-slate-400">After acceptance only</p>
            </div>
            <ChevronRight size={16} className="text-slate-300 ml-auto group-hover:text-sky-500" />
          </Link>
          <button
            onClick={() => submissions[0]?.paymentStatus === 'paid' && setShowIDCard(submissions[0])}
            className="bg-white border border-[#e6effa] rounded-2xl p-5 flex items-center gap-3 hover:border-green-300 hover:shadow-md transition-all group text-left w-full">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <QrCode size={18} className="text-green-600" />
            </div>
            <div>
              <p className="font-bold text-[#0b2d5e] text-sm">Download ID Card</p>
              <p className="text-xs text-slate-400">Available after payment</p>
            </div>
            <ChevronRight size={16} className="text-slate-300 ml-auto group-hover:text-green-500" />
          </button>
        </div>

        {/* Submissions list */}
        <h2 className="font-display font-bold text-[#0b2d5e] text-lg mb-4">My Submissions</h2>
        <div className="space-y-4">
          {submissions.map(sub => {
            const cfg = statusConfig[sub.status]
            const Icon = cfg.icon
            return (
              <div key={sub.id} className="bg-white rounded-2xl border border-[#e6effa] shadow-sm p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-display font-semibold text-[#0b2d5e] text-sm leading-snug">{sub.title}</h3>
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${cfg.cls}`}>
                    <Icon size={11} /> {cfg.label}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-slate-400 mb-4">
                  <span>ID: <span className="font-mono font-semibold text-slate-600">{sub.id}</span></span>
                  <span>Submitted: {sub.submitted}</span>
                  {sub.presentationType && <span>Type: {sub.presentationType}</span>}
                  {sub.regId && <span>Reg: <span className="font-mono font-semibold text-slate-600">{sub.regId}</span></span>}
                </div>

                {sub.reviewerComment && (
                  <div className={`rounded-xl p-3 text-xs mb-4 ${
                    sub.status === 'accepted' ? 'bg-green-50 border border-green-200 text-green-800' :
                    sub.status === 'rejected' ? 'bg-red-50 border border-red-200 text-red-800' :
                    'bg-blue-50 border border-blue-200 text-blue-800'
                  }`}>
                    <strong>Reviewer feedback:</strong> {sub.reviewerComment}
                  </div>
                )}

                {/* Payment info pill */}
                {sub.paymentStatus === 'paid' && (
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="bg-green-50 border border-green-200 text-green-700 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1.5">
                      <CheckCircle size={11} /> Payment Confirmed · ₹{sub.paymentAmount.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{sub.paymentUTR}</span>
                  </div>
                )}

                {/* Action buttons */}
                {sub.status === 'accepted' && sub.paymentStatus === 'none' && (
                  <Link to="/registration"
                    className="inline-flex items-center gap-2 bg-[#0b2d5e] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0e3d7a] transition-colors">
                    <CreditCard size={13} /> Complete Registration & Payment
                  </Link>
                )}

                {sub.status === 'accepted' && sub.paymentStatus === 'paid' && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setShowIDCard(sub)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0b2d5e] to-[#1a5fa8] text-white px-4 py-2 rounded-xl text-xs font-bold hover:shadow-lg transition-all">
                      <BadgeCheck size={13} /> Download ID Card
                    </button>
                    <button
                      onClick={() => setShowLetter(sub)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:shadow-lg transition-all">
                      <Award size={13} /> Acceptance Letter
                    </button>
                    <button
                      onClick={() => setShowReceipt(sub)}
                      className="inline-flex items-center gap-2 border border-green-300 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-green-100 transition-colors">
                      <Receipt size={13} /> Payment Receipt
                    </button>
                  </div>
                )}
              </div>
            )
          })}

          {submissions.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <FileText size={40} className="mx-auto mb-3 opacity-30" />
              <p className="mb-4">No abstracts submitted yet.</p>
              <Link to="/submit-abstract" className="inline-flex items-center gap-2 bg-[#0b2d5e] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0e3d7a]">
                Submit Your First Abstract <ChevronRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showIDCard && (
        <IDCard author={author} submission={showIDCard} onClose={() => setShowIDCard(null)} />
      )}
      {showLetter && (
        <AcceptanceLetter author={author} submission={showLetter} onClose={() => setShowLetter(null)} />
      )}
      {showReceipt && (
        <PaymentReceipt author={author} submission={showReceipt} onClose={() => setShowReceipt(null)} />
      )}
    </div>
  )
}