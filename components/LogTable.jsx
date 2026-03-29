import React, { useState, useMemo } from 'react'
import { saveAs } from 'file-saver'

export default function LogTable({ entries }){
  const [search, setSearch] = useState('')
  const [severity, setSeverity] = useState('all')

  const filtered = useMemo(()=>{
    let arr = entries.slice().reverse()
    if (search) arr = arr.filter(e=> (e.message||'').toLowerCase().includes(search.toLowerCase()) || (e.source||'').toLowerCase().includes(search.toLowerCase()))
    if (severity!=='all') arr = arr.filter(e=>e.severity===severity)
    return arr
  }, [entries, search, severity])

  const exportCSV = () => {
    const header = ['timestamp','severity','source','threat','message','file']
    const lines = [header.join(',')]
    for(const e of filtered){
      const msg = '"'+(e.message||'').replace(/"/g,'""')+'"'
      lines.push([e.timestamp||'', e.severity||'', e.source||'', e.threat||'', msg, e.filename||''].join(','))
    }
    const blob = new Blob([lines.join('\n')], { type:'text/csv' })
    saveAs(blob, 'logs-export.csv')
  }

  return (
    <div className="bg-slate-800 p-3 rounded border border-slate-700">
      <div className="flex gap-2 mb-3">
        <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 p-2 rounded bg-slate-900 border border-slate-700" />
        <select value={severity} onChange={e=>setSeverity(e.target.value)} className="p-2 rounded bg-slate-900 border border-slate-700">
          <option value="all">All</option>
          <option value="critical">Critical</option>
          <option value="error">Error</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
        <button onClick={exportCSV} className="px-3 bg-cyan-600 rounded">Export CSV</button>
      </div>
      <div style={{ maxHeight: 520, overflow: 'auto' }}>
        {filtered.length===0 ? <div className="text-slate-400 p-6">No logs</div> : (
          <table className="w-full text-sm">
            <thead className="text-slate-400 sticky top-0 bg-slate-800">
              <tr><th className="p-2 text-left">Time</th><th>Severity</th><th>Source</th><th>Threat</th><th>Message</th></tr>
            </thead>
            <tbody>
              {filtered.map(e=> (
                <tr key={e.id} className="border-t border-slate-700">
                  <td className="p-2 text-xs text-slate-400">{e.timestamp||'N/A'}</td>
                  <td className="p-2">{e.severity}</td>
                  <td className="p-2 font-mono text-xs">{e.source}</td>
                  <td className="p-2 text-sm">{e.threat||'-'}</td>
                  <td className="p-2">{e.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
