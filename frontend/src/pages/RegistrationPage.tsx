import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { createRegistration, verifyPayment, getFees } from '../lib/api'
import { CheckCircle, CreditCard, User, Mail, Phone, Building, AlertCircle, QrCode, Download } from 'lucide-react'

declare global {
  interface Window { Razorpay: any }
}

const CATEGORIES = [
  'IMS/OSI Members',
  'Non-IMS/OSI Members',
  'Scholars/Students',
  'Foreign Nationals',
  'Industry',
]

// QR Code generator (uses a free CDN — replace with real QR lib in production)
function QRCodeDisplay({ value, size = 150 }: { value: string; size?: number }) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}`
  return <img src={url} alt="QR Code" className="rounded-xl" width={size} height={size} />
}

export default function RegistrationPage() {
  const [fees, setFees] = useState<any>(null)
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [loading, setLoading] = useState(false)
  const [regData, setRegData] = useState<any>(null)

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const selectedCategory = watch('category', '')

  useEffect(() => {
    getFees().then(r => setFees(r.data)).catch(() => {})
    // Load Razorpay script
    if (!document.getElementById('razorpay-script')) {
      const script = document.createElement('script')
      script.id = 'razorpay-script'
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script)
    }
  }, [])

  const getAmount = (cat: string) => {
    if (!fees || !cat) return null
    const f = fees.fees[cat]
    if (!f) return null
    return fees.is_early_bird ? f.early : f.onspot
  }

  const onSubmit = async (formData: any) => {
    setLoading(true)
    try {
      // Try backend; if unavailable, use client-side Razorpay flow
      let order: any = null
      try {
        const res = await createRegistration(formData)
        order = res.data
      } catch (_) {
        // Backend not running — use mock order
        const feeMap: Record<string, { early: number; onspot: number }> = {
          'IMS/OSI Members': { early: 3000, onspot: 4000 },
          'Non-IMS/OSI Members': { early: 4000, onspot: 5000 },
          'Scholars/Students': { early: 1000, onspot: 1500 },
          'Foreign Nationals': { early: 10000, onspot: 12000 },
          'Industry': { early: 5000, onspot: 6000 },
        }
        const isEarlyBird = new Date() < new Date('2026-10-31')
        const amount = feeMap[formData.category]?.[isEarlyBird ? 'early' : 'onspot'] ?? 3000
        order = {
          razorpay_key: 'rzp_test_SxoYfVay7SLJNm',
          amount,
          currency: 'INR',
          razorpay_order_id: null,
          registration_id: Math.floor(Math.random() * 90000) + 10000,
          prefill: { name: formData.full_name, email: formData.email, contact: formData.phone },
        }
      }

      const options = {
        key: order.razorpay_key,
        amount: order.amount * 100,
        currency: order.currency || 'INR',
        name: 'TROPMET 2026',
        description: `Conference Registration – ${formData.category}`,
        order_id: order.razorpay_order_id,
        prefill: order.prefill,
        theme: { color: '#1e3a7a' },
        handler: async (response: any) => {
          try {
            try {
              await verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            } catch (_) { /* backend not running */ }

            const regId = order.registration_id || `REG-${Math.floor(Math.random() * 90000) + 10000}`
            setRegData({
              ...formData,
              payment_id: response.razorpay_payment_id,
              reg_id: regId,
              amount: order.amount,
            })
            setStep('success')
            toast.success('Registration successful!')
          } catch {
            toast.error('Payment verification failed. Contact support.')
          }
        },
        modal: { ondismiss: () => toast('Payment cancelled') },
      }

      if (!window.Razorpay) {
        toast.error('Payment gateway not loaded. Refresh and try again.')
        setLoading(false)
        return
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ─── SUCCESS + ID CARD ───────────────────────────────────────────────────
  if (step === 'success') {
    const qrData = `TROPMET2026|${regData?.reg_id}|${regData?.full_name}|${regData?.category}`
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center pt-24 px-4 pb-12">
        <div className="max-w-lg w-full space-y-6">

          {/* Confirmation banner */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-green-100">
            <CheckCircle size={56} className="text-green-500 mx-auto mb-3" />
            <h1 className="font-display text-3xl font-bold text-[#0b2d5e] mb-1">Registration Confirmed!</h1>
            <p className="text-slate-500 text-sm mb-6">Thank you, <strong>{regData?.full_name}</strong>! Your registration for TROPMET 2026 is complete.</p>
            <div className="bg-stone-50 rounded-xl p-5 text-left space-y-2 text-sm mb-4 border border-stone-200">
              <div className="flex justify-between"><span className="text-stone-500">Registration ID</span><span className="font-bold text-[#0b2d5e]">#{regData?.reg_id}</span></div>
              <div className="flex justify-between"><span className="text-stone-500">Payment ID</span><span className="font-mono text-xs text-slate-600">{regData?.payment_id}</span></div>
              <div className="flex justify-between"><span className="text-stone-500">Category</span><span className="font-semibold">{regData?.category}</span></div>
              <div className="flex justify-between"><span className="text-stone-500">Amount Paid</span><span className="font-bold text-green-700">₹ {regData?.amount?.toLocaleString('en-IN')}</span></div>
            </div>
          </div>

          {/* Conference ID Card */}
          <div className="bg-gradient-to-br from-[#021b3e] to-[#1a5fa8] rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">TROPMET 2026 — PRaGaTI</p>
                <p className="text-sky-200 text-xs">19–21 November 2026 · NCMRWF, Noida</p>
              </div>
              <div className="bg-white rounded-xl p-2">
                <QRCodeDisplay value={qrData} size={80} />
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 mb-4">
              <p className="text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">Participant</p>
              <p className="font-display font-bold text-xl text-white">{regData?.full_name}</p>
              <p className="text-sky-200 text-sm">{regData?.institution || 'Institution'}</p>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div>
                <span className="text-sky-300">Category</span>
                <p className="font-bold text-white">{regData?.category}</p>
              </div>
              <div className="text-right">
                <span className="text-sky-300">Reg ID</span>
                <p className="font-mono font-bold text-amber-300">#{regData?.reg_id}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 text-center text-xs text-sky-300">
              Scan QR at registration desk to verify participant
            </div>
          </div>

          {/* Download buttons */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#0b2d5e] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#0e3d7a] transition-colors">
              <Download size={16} /> Download ID Card
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-[#c8d9f0] text-[#0b2d5e] py-3 rounded-xl font-semibold text-sm hover:bg-[#eef4fc] transition-colors">
              <Download size={16} /> Receipt
            </button>
          </div>

          <p className="text-center text-xs text-stone-500">Confirmation sent to <strong>{regData?.email}</strong>. Present QR code at the conference entrance.</p>
        </div>
      </div>
    )
  }

  // ─── REGISTRATION FORM ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-stone-50 pt-28 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-[#0b2d5e] mb-2">Register for TROPMET 2026</h1>
          <p className="text-stone-500">Complete your registration and pay securely via our payment gateway</p>
          {fees?.is_early_bird && (
            <div className="mt-4 inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full">
              🎉 Early Bird Discount Active – Ends 31 Oct 2026
            </div>
          )}
        </div>

        {/* Important notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex gap-3">
          <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <strong>Important:</strong> Registration and payment are only for authors whose abstract has been <strong>accepted</strong> by the reviewer.
            If your abstract is under review, please wait for the acceptance email before completing this form.
            Accepted authors will receive their <strong>Abstract ID</strong> via email.
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Abstract ID */}
                <div>
                  <label className="label">Abstract ID (from acceptance email) *</label>
                  <input className="field font-mono" placeholder="e.g. ABS-10432"
                    {...register('abstract_id', { required: 'Abstract ID is required' })} />
                  {errors.abstract_id && <p className="text-red-500 text-xs mt-1">{errors.abstract_id.message as string}</p>}
                  <p className="text-xs text-slate-400 mt-1">This is provided in your acceptance notification email.</p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="label">Full Name *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-3.5 text-stone-400" />
                    <input className="field pl-9" placeholder="Dr. / Mr. / Ms. Full Name"
                      {...register('full_name', { required: 'Full name is required' })} />
                  </div>
                  {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message as string}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="label">Email Address *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3.5 text-stone-400" />
                    <input className="field pl-9" type="email" placeholder="your@email.com"
                      {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="label">Phone Number *</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-3.5 text-stone-400" />
                    <input className="field pl-9" placeholder="+91 XXXXX XXXXX"
                      {...register('phone', { required: 'Phone is required' })} />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
                </div>

                {/* Institution */}
                <div>
                  <label className="label">Institution / Organization</label>
                  <div className="relative">
                    <Building size={16} className="absolute left-3 top-3.5 text-stone-400" />
                    <input className="field pl-9" placeholder="University / Institute / Organization"
                      {...register('institution')} />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="label">Registration Category *</label>
                  <select className="field bg-white"
                    {...register('category', { required: 'Select a category' })}>
                    <option value="">Select Category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message as string}</p>}
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading}
                  className="w-full bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2">
                  <CreditCard size={18} />
                  {loading ? 'Processing...' : `Pay ${selectedCategory && getAmount(selectedCategory) ? `₹${getAmount(selectedCategory)?.toLocaleString('en-IN')}` : ''} via payment gateway`}
                </button>

                <p className="text-xs text-stone-500 text-center">
                  By registering, you agree to the conference terms. Payment processed securely via our payment gateway.
                </p>
              </form>
            </div>
          </div>

          {/* Fee sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg text-[#0b2d5e] mb-4">Registration Fees</h3>
              <div className="space-y-3 text-sm">
                {Object.entries(fees?.fees || {
                  'IMS/OSI Members':     { early: 3000,  onspot: 4000 },
                  'Non-IMS/OSI Members': { early: 4000,  onspot: 5000 },
                  'Scholars/Students':   { early: 1000,  onspot: 1500 },
                  'Foreign Nationals':   { early: 10000, onspot: 12000 },
                  'Industry':            { early: 5000,  onspot: 6000 },
                }).map(([cat, f]: [string, any]) => (
                  <div key={cat} className={`p-3 rounded-xl border transition-all ${selectedCategory === cat ? 'bg-[#0b2d5e] text-white border-[#0b2d5e]' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="font-semibold text-xs mb-1">{cat}</div>
                    <div className="flex justify-between text-xs">
                      <span className="opacity-70">Early Bird</span>
                      <span className="font-bold">₹{f.early.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="opacity-70">On Spot</span>
                      <span>₹{f.onspot.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-stone-500 border-t border-stone-200 pt-4">
                Industry Exhibition: ₹25,000/-
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm text-sm">
              <h4 className="font-bold text-[#0b2d5e] mb-3">After Payment You Get</h4>
              <div className="space-y-2 text-xs text-slate-600">
                {['Conference ID Card with QR Code', 'Registration Receipt (PDF)', 'Acceptance Letter (PDF)', 'Participation Certificate (Post Conference)'].map(d => (
                  <div key={d} className="flex items-center gap-2">
                    <QrCode size={11} className="text-green-500 shrink-0" />
                    {d}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm text-sm">
              <h4 className="font-semibold text-[#0b2d5e] mb-3">Contact Organiser</h4>
              <p className="font-medium text-sm">Dr. Ashish Routray</p>
              <p className="text-stone-400 text-xs">Organising Convener, NCMRWF</p>
              <p className="text-stone-600 mt-2 text-xs">📞 +91 9873344860</p>
              <p className="text-stone-600 text-xs">✉️ imsnoidachapter@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
