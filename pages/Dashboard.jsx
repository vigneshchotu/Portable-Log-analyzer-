import React, { useState } from 'react'
import UploadSection from '../components/UploadSection'
import SummaryCard from '../components/SummaryCard'
import LogTable from '../components/LogTable'
import ThreatAlerts from '../components/ThreatAlerts'
import ChartSection from '../components/ChartSection'
import { parseLog } from '../utils/logParser'
import { detectAnomalies } from '../utils/anomalyDetection'

export default function Dashboard(){
  const [logs, setLogs] = useState([]) // {name, lines}
  const [entries, setEntries] = useState([]) // parsed entries
  const [alerts, setAlerts] = useState([])

  const handleFiles = async (files) => {
    let newLogs = []
    let newEntries = []
    for(const f of files){
      const text = await f.text()
      newLogs.push({ name: f.name, lines: text.split('\n').length })
      const parsed = parseLog(text, f.name)
      newEntries = newEntries.concat(parsed)
    }
    setLogs(prev => [...prev, ...newLogs])
    setEntries(prev => [...prev, ...newEntries])
    const anomalies = detectAnomalies(newEntries)
    setAlerts(prev => [...prev, ...anomalies])
  }

  return (
    <div className="container">
      <header className="flex items-center justify-between py-4">
        <div>
          <h1 className="text-2xl font-bold">Portable Log Analyzer</h1>
          <p className="text-slate-400 text-sm">Offline log analysis for isolated networks</p>
        </div>
        <div className="space-x-2">
          <SummaryCard entries={entries} alerts={alerts} />
        </div>
      </header>

      <UploadSection onFiles={handleFiles} logs={logs} />

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="md:col-span-2">
          <LogTable entries={entries} />
        </div>
        <div>
          <ThreatAlerts alerts={alerts} entries={entries} />
          <ChartSection entries={entries} />
        </div>
      </div>
    </div>
  )
}
