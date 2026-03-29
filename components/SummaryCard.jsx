import React from 'react'

export default function SummaryCard({ entries, alerts }){
  const total = entries.length
  const critical = entries.filter(e=>e.severity==='critical').length
  const warning = entries.filter(e=>['warning','error','high'].includes(e.severity)).length
  const info = entries.filter(e=>e.severity==='info').length
  return (
    <div className="bg-slate-800 p-3 rounded border border-slate-700 flex gap-4">
      <div className="text-center px-3">
        <div className="text-xs text-slate-400">Total</div>
        <div className="text-lg font-bold">{total}</div>
      </div>
      <div className="text-center px-3">
        <div className="text-xs text-slate-400">Critical</div>
        <div className="text-lg font-bold text-red-400">{critical}</div>
      </div>
      <div className="text-center px-3">
        <div className="text-xs text-slate-400">Warnings</div>
        <div className="text-lg font-bold text-yellow-400">{warning}</div>
      </div>
    </div>
  )
}
