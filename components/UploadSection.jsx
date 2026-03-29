import React from 'react'

export default function UploadSection({ onFiles, logs }){
  const handle = (e) => {
    const files = e.target.files
    if (files && files.length) onFiles(files)
  }
  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Upload Logs</h2>
          <p className="text-slate-400 text-sm">Drop or select .log/.txt/.csv files</p>
        </div>
        <div>
          <input id="file" type="file" className="hidden" multiple onChange={handle} />
          <label htmlFor="file" className="px-4 py-2 bg-cyan-600 rounded cursor-pointer">Choose Files</label>
        </div>
      </div>
      {logs.length>0 && (
        <div className="mt-3">
          <h3 className="text-sm text-slate-300">Loaded files</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-400">
            {logs.map((l,i)=>(<li key={i}>{l.name} — {l.lines} lines</li>))}
          </ul>
        </div>
      )}
    </div>
  )
}
