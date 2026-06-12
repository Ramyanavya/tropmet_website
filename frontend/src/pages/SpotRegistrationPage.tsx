import { useState } from 'react'
import { MapPin, Clock, CreditCard, CheckCircle, Contact2, AlertCircle, ArrowRight, Info } from 'lucide-react'

const FEES: Record<string, { spot: number }> = {
  'IMS/OSI Members':    { spot: 4000 },
  'Non-IMS/OSI Members':{ spot: 5000 },
  'Scholars/Students':  { spot: 1500 },
  'Foreign Nationals':  { spot: 12000 },
  'Industry':           { spot: 6000 },
}

export default function SpotRegistrationPage() {
  const [step, setStep] = useState<'info' | 'form' | 'done'>('info')
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', institution: '',
    designation: '', category: 'IMS/OSI Members', ims_member_id: ''
  })

  const fee = FEES[form.category]?.spot ?? 0

  return (
    <div className="min-h-screen bg-[#f0f5fc] pt-28 pb-16">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#021b3e] to-[#0b2d5e] py-14 border-b border-sky-700/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-400 mb-2">Walk-in</p>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Spot Registration</h1>
          <div className="w-10 h-0.5 bg-amber-400 mb-4" />
          <p className="text-sky-300 font-sans text-sm leading-relaxed max-w-2xl">
            Did not register online? No problem — walk in and register directly at the conference venue. 
            Spot registration is available on all three days of TROPMET 2026.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10 space-y-8">

        {/* Venue & Timing info */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: MapPin,  label: 'Venue', value: 'NCMRWF, A-50 Sector-62, Noida, UP-201309' },
            { icon: Clock,   label: 'Registration Hours', value: '8:00 AM – 10:00 AM each conference day' },
            { icon: CreditCard, label: 'Payment Accepted', value: 'Cash · UPI / QR · Demand Draft · POS Card' },
          ].map(item => (
            <div key={item.label} className="bg-white border border-[#c8d9f0] rounded-xl p-5 flex gap-3 shadow-sm">
              <item.icon size={18} className="text-[#0b2d5e] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#0b2d5e] mb-0.5">{item.label}</div>
                <div className="text-sm text-slate-600 font-sans">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Spot fee table */}
        <div className="bg-white border border-[#c8d9f0] rounded-2xl p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold text-[#0b2d5e] mb-4">Spot Registration Fees</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="bg-[#f0f5fc] text-xs uppercase tracking-wider text-[#0b2d5e]">
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-right">Online (by 31 Oct)</th>
                  <th className="px-4 py-3 text-right">Spot / On-site</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['IMS/OSI Members',    3000, 4000],
                  ['Non-IMS/OSI Members',4000, 5000],
                  ['Scholars/Students',  1000, 1500],
                  ['Foreign Nationals', 10000,12000],
                  ['Industry',           5000, 6000],
                ].map(([cat, early, spot]) => (
                  <tr key={cat as string} className="border-t border-[#e6effa] hover:bg-[#f8fbff]">
                    <td className="px-4 py-3 font-medium text-slate-700">{cat}</td>
                    <td className="px-4 py-3 text-right text-green-700 font-bold">₹{(early as number).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-[#0b2d5e] font-bold">₹{(spot as number).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">* No registration fee for Honorary Fellows and Fellows of IMS.</p>
        </div>

        {/* Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
          <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1">Pre-registration recommended</p>
            <p className="text-xs text-amber-700">
              Online registration is significantly cheaper and guarantees your slot. 
              Spot registrations are subject to seat availability.
              <a href="/author-registration" className="underline ml-1 font-semibold">Register online →</a>
            </p>
          </div>
        </div>

        {/* Pre-register form (optional — for collecting details in advance) */}
        {step === 'info' && (
          <div className="bg-white border border-[#c8d9f0] rounded-2xl p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-[#0b2d5e] mb-2">Pre-fill Your Details</h2>
            <p className="text-sm text-slate-500 mb-5 font-sans">
              Optionally fill your details now to speed up the registration desk on the conference day.
              Final confirmation and payment will happen at the venue.
            </p>
            <button onClick={() => setStep('form')}
              className="bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
              Fill Spot Registration Form <ArrowRight size={15} />
            </button>
          </div>
        )}

        {step === 'form' && (
          <div className="bg-white border border-[#c8d9f0] rounded-2xl p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-[#0b2d5e] mb-5">Spot Registration Form</h2>
            <form onSubmit={e => { e.preventDefault(); setStep('done') }}
              className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Full Name *', key: 'full_name', type: 'text' },
                { label: 'Email *', key: 'email', type: 'email' },
                { label: 'Phone *', key: 'phone', type: 'tel' },
                { label: 'Institution / Organisation', key: 'institution', type: 'text' },
                { label: 'Designation', key: 'designation', type: 'text' },
                { label: 'IMS Member ID (if applicable)', key: 'ims_member_id', type: 'text' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-bold text-[#0b2d5e] uppercase tracking-wider mb-1.5">{f.label}</label>
                  <input type={f.type} required={f.label.includes('*')} value={(form as any)[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full border border-[#c8d9f0] rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-[#0b2d5e]" />
                </div>
              ))}

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#0b2d5e] uppercase tracking-wider mb-1.5">Category *</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-[#c8d9f0] rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none">
                  {Object.keys(FEES).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="sm:col-span-2 bg-[#f0f5fc] rounded-xl p-4 flex justify-between items-center">
                <div>
                  <div className="text-xs text-slate-500">Spot Registration Fee</div>
                  <div className="text-2xl font-display font-bold text-[#0b2d5e]">₹{fee.toLocaleString()}</div>
                  <div className="text-xs text-amber-600 font-semibold mt-0.5">Payable at the venue · Not online</div>
                </div>
                <button type="submit"
                  className="bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                  Submit Details <ArrowRight size={15} />
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 'done' && (
          <div className="bg-white border border-[#c8d9f0] rounded-2xl p-8 text-center shadow-sm">
            <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold text-[#0b2d5e] mb-2">Details Submitted!</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
              Your details have been noted. Please arrive at the registration desk on the day with a printed copy of this page.
              Your registration number and ID card will be issued after payment at the venue.
            </p>
            <div className="bg-[#f0f5fc] rounded-xl p-4 inline-block text-left">
              <div className="text-xs text-slate-500 mb-1">Reference ID</div>
              <div className="font-mono text-xl font-bold text-[#0b2d5e]">
                SPOT-{Date.now().toString().slice(-6)}
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-center">
              <button onClick={() => window.print()}
                className="border border-[#c8d9f0] text-[#0b2d5e] px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#eef4fc]">
                🖨 Print this Page
              </button>
              <button onClick={() => setStep('info')}
                className="bg-[#0b2d5e] text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-[#0e3d7a]">
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
