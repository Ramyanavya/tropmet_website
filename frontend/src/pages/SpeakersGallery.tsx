import { useEffect, useState } from 'react'
import { getSpeakers, getGallery } from '../lib/api'

export function SpeakersPage() {
  const [speakers, setSpeakers] = useState<any[]>([])
  useEffect(() => { getSpeakers().then(r => setSpeakers(r.data)).catch(() => setSpeakers([])) }, [])
  return (
    <div className="min-h-screen bg-stone-50 pt-28 pb-16">
      <div className="bg-white py-16 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-600 mb-2">Distinguished Guests</p>
          <h1 className="font-display text-4xl font-bold text-navy-900 mb-3">Speakers</h1>
          <div className="w-10 h-0.5 bg-amber-500" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        {speakers.length === 0 ? (
          <div className="text-center py-20 text-stone-600 font-sans">
            <p className="text-5xl mb-4">🎤</p>
            <p className="text-lg font-semibold text-navy-700">Speakers will be announced soon</p>
            <p className="text-sm mt-2">Please check back closer to the conference date.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {speakers.map((s: any) => (
              <div key={s.id} className="bg-white border border-stone-200 rounded-sm shadow-card p-5 text-center hover:shadow-lift transition-shadow">
                <div className="w-20 h-20 rounded-full bg-navy-100 mx-auto mb-3 overflow-hidden border-2 border-stone-200">
                  {s.photo_url
                    ? <img src={s.photo_url} alt={s.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-navy-700 font-display font-bold text-3xl">{s.name[0]}</div>}
                </div>
                <h3 className="font-sans font-bold text-navy-800 text-sm">{s.name}</h3>
                <p className="text-stone-500 text-xs mt-0.5">{s.designation}</p>
                <p className="text-stone-600 text-xs">{s.institution}</p>
                {s.is_keynote && <span className="mt-2 inline-block bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-sm">Keynote</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function GalleryPage() {
  const [photos, setPhotos] = useState<any[]>([])
  useEffect(() => { getGallery().then(r => setPhotos(r.data)).catch(() => setPhotos([])) }, [])
  return (
    <div className="min-h-screen bg-stone-50 pt-28 pb-16">
      <div className="bg-white py-16 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-sans text-xs font-bold uppercase tracking-[.18em] text-amber-600 mb-2">Photo Gallery</p>
          <h1 className="font-display text-4xl font-bold text-navy-900 mb-3">Gallery</h1>
          <div className="w-10 h-0.5 bg-amber-500" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        {photos.length === 0 ? (
          <div className="text-center py-20 text-stone-600 font-sans">
            <p className="text-5xl mb-4">📷</p>
            <p className="text-lg font-semibold text-navy-700">Gallery will be updated after the event</p>
            <p className="text-sm mt-2">Photos from TROPMET 2026 will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((p: any) => (
              <div key={p.id} className="overflow-hidden rounded-sm shadow-card hover:shadow-lift transition-shadow">
                <img src={p.url} alt={p.caption} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
