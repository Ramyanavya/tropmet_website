import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { User, Mail, Phone, Lock, Building, Globe, ChevronRight, CheckCircle, Eye, EyeOff } from 'lucide-react'

const COUNTRIES = ['India', 'USA', 'UK', 'Germany', 'France', 'Australia', 'Japan', 'China', 'Other']
const MEMBERSHIP_TYPES = ['IMS Member', 'OSI Member', 'Non-Member', 'Student']

export default function AuthorRegistrationPage() {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password', '')

  const onSubmit = async (data: any) => {
    setLoading(true)
    // Simulate registration — replace with real API call
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setStep('success')
    toast.success('Author account created!')
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-28 px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center border border-[#e6effa]">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={36} className="text-green-600" />
          </div>
          <h2 className="font-display font-bold text-2xl text-[#0b2d5e] mb-2">Registration Successful!</h2>
          <p className="text-slate-500 text-sm mb-6">Your author account has been created. You can now submit your abstract.</p>
          <Link to="/submit-abstract"
            className="inline-flex items-center gap-2 bg-[#0b2d5e] hover:bg-[#0e3d7a] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors">
            Proceed to Abstract Submission <ChevronRight size={16} />
          </Link>
          <p className="mt-4 text-xs text-slate-400">Already submitted? <Link to="/registration" className="text-[#1a5fa8] hover:underline">Go to Registration</Link></p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl text-[#0b2d5e] mb-2">Author Registration</h1>
          <p className="text-slate-500 text-sm">Create your account to submit an abstract for TROPMET 2026</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-[#e6effa] shadow-sm p-6">
            <h2 className="font-display font-bold text-[#0b2d5e] text-lg mb-5 flex items-center gap-2">
              <User size={18} className="text-amber-500" /> Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <input {...register('full_name', { required: 'Full name is required' })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8]"
                  placeholder="Dr. / Mr. / Ms. Full Name" />
                {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message as string}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5"><Mail size={12} className="inline mr-1" />Email <span className="text-red-500">*</span></label>
                <input {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
                  type="email" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8]"
                  placeholder="your@email.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5"><Phone size={12} className="inline mr-1" />Mobile Number <span className="text-red-500">*</span></label>
                <input {...register('mobile', { required: 'Mobile number is required' })}
                  type="tel" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8]"
                  placeholder="+91 98765 43210" />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message as string}</p>}
              </div>

              <div className="relative">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5"><Lock size={12} className="inline mr-1" />Password <span className="text-red-500">*</span></label>
                <input {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters' } })}
                  type={showPass ? 'text' : 'password'}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8] pr-10"
                  placeholder="Min. 8 characters" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-8 text-slate-400">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
              </div>

              <div className="relative">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Confirm Password <span className="text-red-500">*</span></label>
                <input {...register('confirm_password', { required: 'Please confirm password', validate: v => v === password || 'Passwords do not match' })}
                  type={showConfirm ? 'text' : 'password'}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8] pr-10"
                  placeholder="Re-enter password" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-8 text-slate-400">
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password.message as string}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Gender</label>
                <select {...register('gender')} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8] bg-white">
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5"><Globe size={12} className="inline mr-1" />Country <span className="text-red-500">*</span></label>
                <select {...register('country', { required: 'Country is required' })} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8] bg-white">
                  <option value="">Select country</option>
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message as string}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">State</label>
                <input {...register('state')} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8]" placeholder="State / Province" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">City</label>
                <input {...register('city')} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8]" placeholder="City" />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-2xl border border-[#e6effa] shadow-sm p-6">
            <h2 className="font-display font-bold text-[#0b2d5e] text-lg mb-5 flex items-center gap-2">
              <Building size={18} className="text-amber-500" /> Professional Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Organization / Institute <span className="text-red-500">*</span></label>
                <input {...register('organization', { required: 'Organization is required' })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8]"
                  placeholder="NCMRWF, IIT Delhi, IMD, etc." />
                {errors.organization && <p className="text-red-500 text-xs mt-1">{errors.organization.message as string}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Department</label>
                <input {...register('department')} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8]" placeholder="e.g. Forecasting Division" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Designation</label>
                <input {...register('designation')} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8]" placeholder="Scientist / Professor / Student" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-2">Membership Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {MEMBERSHIP_TYPES.map(m => (
                    <label key={m} className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2.5 cursor-pointer hover:border-[#1a5fa8] hover:bg-[#eef4fc] transition-colors text-sm has-[:checked]:border-[#1a5fa8] has-[:checked]:bg-[#eef4fc]">
                      <input type="radio" {...register('membership_type')} value={m} className="accent-[#0b2d5e]" />
                      <span className="text-slate-700 font-medium text-xs">{m}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Uploads */}
          <div className="bg-white rounded-2xl border border-[#e6effa] shadow-sm p-6">
            <h2 className="font-display font-bold text-[#0b2d5e] text-lg mb-5">Profile Photo <span className="text-slate-400 font-normal text-sm">(Optional)</span></h2>
            <input type="file" accept="image/*" {...register('profile_photo')}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#eef4fc] file:text-[#0b2d5e] hover:file:bg-[#dce9f8]" />
            <p className="text-xs text-slate-400 mt-2">JPG or PNG, max 2MB. Will appear on your conference ID card.</p>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="w-full bg-[#0b2d5e] hover:bg-[#0e3d7a] disabled:opacity-60 text-white py-3.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg">
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating Account...</>
            ) : (
              <>Create Author Account <ChevronRight size={16} /></>
            )}
          </button>

          <p className="text-center text-xs text-slate-500">
            Already have an account? <Link to="/submit-abstract" className="text-[#1a5fa8] hover:underline font-semibold">Submit Abstract directly</Link>
          </p>
        </form>
      </div>
    </div>
  )
}