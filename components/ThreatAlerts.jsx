import React from 'react'

export default function ThreatAlerts({ alerts, entries }){
  const byType = entries.filter(e=>e.threat).reduce((acc,e)=>{ acc[e.threat]=(acc[e.threat]||0)+1; return acc }, {})
  return (
    <div className="bg-slate-800 p-3 rounded border border-slate-700 mb-4">
      <h3 className="font-semibold">Threats</h3>
      {Object.keys(byType).length===0 ? <div className="text-slate-400 mt-2">No threats detected</div> : (
        <ul className="mt-2 space-y-2 text-sm text-slate-200">
          {Object.entries(byType).map(([t,c])=> (<li key={t}>{t} — {c}</li>))}
        </ul>
      )}
      <div className="mt-3 text-slate-400 text-xs">Anomalies: {alerts.length}</div>
    </div>
  )
}
