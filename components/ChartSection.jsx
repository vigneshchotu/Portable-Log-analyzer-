import React, { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const COLORS = ['#ef4444','#f59e0b','#06b6d4','#60a5fa','#a78bfa']

export default function ChartSection({ entries }){
  const severityData = useMemo(()=>{
    const counts = { critical:0, warning:0, info:0, error:0, high:0 }
    for(const e of entries){ counts[e.severity] = (counts[e.severity]||0)+1 }
    return Object.entries(counts).map(([k,v])=>({ name:k, value:v }))
  }, [entries])

  const topSources = useMemo(()=>{
    const m = {}
    for(const e of entries){ if (e.source && e.source!=='unknown'){ m[e.source]=(m[e.source]||0)+1 } }
    return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([name,value])=>({ name, value }))
  }, [entries])

  return (
    <div className="bg-slate-800 p-3 rounded border border-slate-700">
      <h3 className="font-semibold mb-2">Charts</h3>
      <div style={{ height:220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={severityData} dataKey="value" nameKey="name" outerRadius={70}>
              {severityData.map((entry, idx)=>(<Cell key={idx} fill={COLORS[idx%COLORS.length]} />))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ height:180, marginTop:8 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topSources}><XAxis dataKey="name" tick={{fontSize:10}} /><YAxis /><Tooltip /><Bar dataKey="value" fill="#06b6d4" /></BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
