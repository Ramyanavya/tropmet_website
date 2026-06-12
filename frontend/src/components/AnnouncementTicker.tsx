import { useEffect, useState } from 'react'
import { getAnnouncements } from '../lib/api'

const DEFAULT = [
  'Abstract Submission Open — Deadline 15 August 2026',
  'Early Bird Registration ends 31 October 2026',
  'Conference: 19–21 November 2026 · NCMRWF, Noida',
  'TROPMET 2026 — PRaGaTI: Physics-driven & AI-enabled Tropical Intelligence',
  'Hosted by IMS Noida Chapter & NCMRWF, Ministry of Earth Sciences',
]

export default function AnnouncementTicker() {
  const [items, setItems] = useState<string[]>(DEFAULT)
  useEffect(() => {
    getAnnouncements().then(r => {
      if (r.data?.length) setItems(r.data.map((a: any) => a.title))
    }).catch(() => {})
  }, [])

  const doubled = [...items, ...items]

  return (
    <div className="bg-stone-100 border-b border-stone-200 overflow-hidden flex items-stretch h-9">
      <div className="shrink-0 flex items-center gap-2 bg-teal-700 text-white px-4 z-10 text-[11px] font-sans font-bold uppercase tracking-widest">
        <span className="w-1.5 h-1.5 bg-teal-300 rounded-full animate-[pulseDot_2s_ease-in-out_infinite]" />
        News
      </div>
      <div className="overflow-hidden relative flex-1">
        <div className="marquee-track flex items-center gap-0 h-9 whitespace-nowrap">
          {doubled.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-sm font-sans text-stone-700 px-6">
              <span className="text-amber-600 text-xs">◆</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
