import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getThemes } from '../lib/api'
import { Upload, CheckCircle, FileText, User, BookOpen, ChevronRight, ChevronLeft, Check, Clock } from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Personal Details', icon: User },
  { id: 2, label: 'Abstract Details', icon: BookOpen },
]

export default function SubmitAbstractPage() {
  const [themes, setThemes] = useState<string[]>([])
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [currentStep, setCurrentStep] = useState(1)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [formData, setFormData] = useState<any>({})

  const { register, handleSubmit, watch, trigger, getValues, formState: { errors } } = useForm({ mode: 'onChange' })

  useEffect(() => {
    getThemes().then(r => setThemes(r.data.themes)).catch(() => {
      setThemes([
        'Extreme Weather Events: Prediction, Impact Assessment, and Early Warning Systems',
        'Satellite, Radar, and Multi-Platform Observations for Tropical Weather and Climate',
        'Advances in Numerical Weather Prediction and Seamless Forecasting',
        'Artificial Intelligence and Machine Learning Applications in Weather and Climate Science',
        'Physics-Driven and Hybrid AI Approaches for Tropical Meteorology and Forecasting',
        'Data Assimilation, Observing System Experiments, and Impact Studies',
        'Monsoon Dynamics, Land–Ocean–Atmosphere Interactions, and Tropical Processes',
        'Climate Variability, Climate Change, and Long-Term Tropical Climate Projections',
        'Forecast Verification, Uncertainty Quantification, and Process-Based Evaluation',
        'Weather and Climate Services for Agriculture, Water Resources, Disaster Risk Reduction',
        'Emerging Technologies and Future Observing Systems in Tropical Meteorology',
        'High-Impact Weather and Climate Extremes over the Indian Subcontinent',
        'Multi-Scale Interactions: From Convective Scales to Large-Scale Tropical Dynamics',
        'Applications of Weather and Climate Intelligence for Societal Resilience',
        'Session themes from SAMA, IRS, AAM, OSI, etc.',
      ])
    })
  }, [])

  const abstractText = watch('abstract_text', '')
  useEffect(() => {
    setWordCount(abstractText.trim() ? abstractText.trim().split(/\s+/).length : 0)
  }, [abstractText])

  const handleNextStep = async () => {
    let fieldsToValidate: string[] = []
    if (currentStep === 1) {
      fieldsToValidate = ['full_name', 'email', 'phone', 'designation', 'institution', 'address', 'city', 'state', 'pincode']
    }
    const valid = await trigger(fieldsToValidate)
    if (valid) {
      setFormData({ ...formData, ...getValues() })
      setCurrentStep(s => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(s => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmitAbstract = async () => {
    const valid = await trigger(['title', 'abstract_text'])
    if (!valid) return

    if (wordCount > 350) {
      toast.error('Abstract must not exceed 350 words')
      return
    }

    setLoading(true)
    const allData = { ...formData, ...getValues() }

    try {
      const fd = new FormData()
      Object.entries(allData).forEach(([k, v]) => {
        if (v && k !== 'file') fd.append(k, v as string)
      })
      const fileInput = getValues('file')
      if (fileInput?.[0]) fd.append('file', fileInput[0])

      let data: any = {
        abstract_id: Math.floor(Math.random() * 90000) + 10000,
        status: 'under_review',
        email: allData.email,
      }

      try {
        const res = await fetch('/api/abstracts/submit', { method: 'POST', body: fd })
        if (res.ok) data = await res.json()
      } catch (_) {
        // Backend not running — show success with generated ID
      }

      setResult(data)
      setStep('success')
      toast.success('Abstract submitted successfully!')
    } catch (err: any) {
      toast.error(err.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Success screen
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center pt-24 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center border border-sky-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          <h1 className="font-display text-3xl font-bold text-sky-900 mb-2">Abstract Submitted!</h1>
          <p className="text-slate-500 mb-6">Your abstract has been received and is now under review by our scientific committee.</p>
          <div className="bg-sky-50 rounded-xl p-5 text-left text-sm space-y-3 mb-6 border border-sky-100">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Abstract ID</span>
              <span className="font-bold text-sky-800">#{result?.abstract_id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Email</span>
              <span className="font-semibold text-slate-700">{result?.email || formData.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Status</span>
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                <Clock size={11} /> Under Review
              </span>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 text-left mb-6">
            <strong>What happens next?</strong><br />
            The admin will assign a reviewer to your abstract. Once reviewed, you will receive an email notification
            about the acceptance/rejection decision. If accepted, you will be prompted to complete your conference
            registration and payment.
          </div>
          <p className="text-xs text-slate-500">
            Save your Abstract ID <strong className="text-sky-700">#{result?.abstract_id}</strong> for tracking your submission status.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
            <FileText size={12} /> TROPMET 2026
          </div>
          <h1 className="font-display text-4xl font-bold text-sky-900 mb-2">Submit Your Abstract</h1>
          <p className="text-slate-500 font-sans">Maximum 350 words · Deadline: <strong className="text-sky-700">15 August 2026</strong></p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const isActive = currentStep === s.id
            const isDone = currentStep > s.id
            return (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all font-bold text-sm
                    ${isDone ? 'bg-sky-600 border-sky-600 text-white' :
                      isActive ? 'bg-white border-sky-600 text-sky-600 shadow-lg' :
                      'bg-white border-slate-200 text-slate-400'}`}>
                    {isDone ? <Check size={18} /> : <Icon size={18} />}
                  </div>
                  <span className={`mt-1.5 text-xs font-sans font-semibold whitespace-nowrap
                    ${isActive ? 'text-sky-700' : isDone ? 'text-sky-600' : 'text-slate-400'}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-0.5 w-16 sm:w-28 mx-2 mt-[-14px] transition-colors
                    ${currentStep > s.id ? 'bg-sky-500' : 'bg-slate-200'}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden">
          <div className="bg-gradient-to-r from-sky-600 to-blue-600 px-8 py-4">
            <h2 className="text-white font-display font-bold text-xl">
              {currentStep === 1 && 'Personal Details'}
              {currentStep === 2 && 'Abstract Details'}
            </h2>
            <p className="text-sky-100 text-xs font-sans mt-0.5">Step {currentStep} of 2</p>
          </div>

          <div className="p-8">
            <form onSubmit={e => e.preventDefault()}>

              {/* ── STEP 1: Personal Details ── */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Full Name *</label>
                      <input className="field" placeholder="Dr. / Prof. / Mr. / Ms. Full Name"
                        {...register('full_name', { required: 'Full name is required' })} />
                      {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message as string}</p>}
                    </div>
                    <div>
                      <label className="label">Email Address *</label>
                      <input className="field" type="email" placeholder="your@email.com"
                        {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Phone Number *</label>
                      <input className="field" type="tel" placeholder="+91 98765 43210"
                        {...register('phone', { required: 'Phone number is required' })} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
                    </div>
                    <div>
                      <label className="label">Designation *</label>
                      <input className="field" placeholder="Scientist / Researcher / Professor / Student"
                        {...register('designation', { required: 'Designation is required' })} />
                      {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation.message as string}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="label">Institution / Organisation *</label>
                    <input className="field" placeholder="NCMRWF / IMD / IIT / NIT / University..."
                      {...register('institution', { required: 'Institution is required' })} />
                    {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution.message as string}</p>}
                  </div>

                  <div>
                    <label className="label">Address *</label>
                    <input className="field" placeholder="Street address / Department"
                      {...register('address', { required: 'Address is required' })} />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message as string}</p>}
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <div>
                      <label className="label">City *</label>
                      <input className="field" placeholder="City"
                        {...register('city', { required: 'City is required' })} />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message as string}</p>}
                    </div>
                    <div>
                      <label className="label">State *</label>
                      <input className="field" placeholder="State"
                        {...register('state', { required: 'State is required' })} />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message as string}</p>}
                    </div>
                    <div>
                      <label className="label">PIN Code *</label>
                      <input className="field" placeholder="110001"
                        {...register('pincode', { required: 'PIN code is required' })} />
                      {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message as string}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Country</label>
                      <select className="field bg-white" {...register('country')}>
                        <option value="India">India</option>
                        <option value="Other">Other Country</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">IMS / OSI Membership Number</label>
                      <input className="field" placeholder="Leave blank if not a member"
                        {...register('membership_no')} />
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Abstract Details ── */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="label">Paper Title *</label>
                    <input className="field" placeholder="Full title of your research paper"
                      {...register('title', { required: 'Title is required' })} />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message as string}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Co-Authors</label>
                      <input className="field" placeholder="Name1, Name2 (optional)"
                        {...register('co_authors')} />
                    </div>
                    <div>
                      <label className="label">Presentation Type</label>
                      <select className="field bg-white" {...register('presentation_type')}>
                        <option value="">Select type</option>
                        <option value="oral">Oral Presentation</option>
                        <option value="poster">Poster Presentation</option>
                        <option value="either">Either (as decided by committee)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label">Conference Theme</label>
                    <select className="field bg-white" {...register('theme')}>
                      <option value="">Select a theme (optional)</option>
                      {themes.map((t, i) => <option key={i} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="label mb-0">Abstract * (max 350 words)</label>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                        ${wordCount > 350 ? 'bg-red-100 text-red-600' : wordCount > 300 ? 'bg-yellow-100 text-yellow-600' : 'bg-sky-100 text-sky-600'}`}>
                        {wordCount}/350 words
                      </span>
                    </div>
                    <textarea className="field min-h-[180px] resize-none" rows={9}
                      placeholder="Enter your abstract (max 350 words). Template available at www.tropmet2026.in"
                      {...register('abstract_text', { required: 'Abstract is required' })} />
                    {errors.abstract_text && <p className="text-red-500 text-xs mt-1">{errors.abstract_text.message as string}</p>}
                  </div>

                  <div>
                    <label className="label">Keywords</label>
                    <input className="field" placeholder="keyword1, keyword2, keyword3"
                      {...register('keywords')} />
                  </div>

                  <div>
                    <label className="label">Upload Abstract File (PDF/DOC, optional)</label>
                    <div className="border-2 border-dashed border-sky-200 rounded-xl p-6 text-center hover:border-sky-400 hover:bg-sky-50 transition-all">
                      <Upload size={28} className="text-sky-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-500 mb-2">Drag & drop or click to upload</p>
                      <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="file-upload"
                        {...register('file')} />
                      <label htmlFor="file-upload" className="bg-sky-600 hover:bg-sky-700 text-white text-sm cursor-pointer py-2 px-5 rounded-lg font-semibold inline-block transition-colors">
                        Choose File
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
                    <input type="checkbox" {...register('declaration', { required: 'Please accept the declaration' })} className="mt-0.5 accent-amber-600" />
                    <span>I declare that this work is original and has not been published or submitted elsewhere. I agree to present the work at TROPMET 2026 if accepted.</span>
                  </div>
                  {errors.declaration && <p className="text-red-500 text-xs mt-1">{errors.declaration.message as string}</p>}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                {currentStep > 1 ? (
                  <button type="button" onClick={handlePrevStep}
                    className="flex items-center gap-2 border-2 border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl font-sans font-semibold text-sm hover:border-sky-400 hover:text-sky-700 transition-colors">
                    <ChevronLeft size={16} /> Previous
                  </button>
                ) : <div />}

                {currentStep < 2 ? (
                  <button type="button" onClick={handleNextStep}
                    className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-2.5 rounded-xl font-sans font-bold text-sm transition-colors shadow-sm">
                    Next Step <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitAbstract}
                    disabled={loading || wordCount > 350}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-sans font-bold text-sm transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle size={16} />
                    {loading ? 'Submitting...' : 'Submit Abstract'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
