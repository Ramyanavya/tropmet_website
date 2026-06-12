import { useState, useEffect } from 'react'

export default function Countdown({ targetDate, label = 'Conference Begins In' }: { targetDate: string; label?: string }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) return
      setT({ d: Math.floor(diff/86400000), h: Math.floor((diff%86400000)/3600000), m: Math.floor((diff%3600000)/60000), s: Math.floor((diff%60000)/1000) })
    }
    calc(); const id = setInterval(calc, 1000); return () => clearInterval(id)
  }, [targetDate])

  const units = [{ v: t.d, u: 'Days' }, { v: t.h, u: 'Hours' }, { v: t.m, u: 'Mins' }, { v: t.s, u: 'Secs' }]

  return (
    <div className="text-center">
      <p className="font-sans text-[11px] font-bold uppercase tracking-[.18em] text-amber-400 mb-4">{label}</p>
      <div className="flex justify-center gap-2.5">
        {units.map(({ v, u }) => (
          <div key={u} className="cd-box">
            <span className="text-2xl font-display font-bold">{String(v).padStart(2,'0')}</span>
            <span className="text-[10px] text-stone-300 mt-0.5 font-sans uppercase tracking-wider">{u}</span>

          </div>
        ))}
      </div>
    </div>
  )
}
