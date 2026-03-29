const threatPatterns = [
  { regex: /failed.*login|authentication.*failed|invalid user/i, type:'Brute Force Attack', severity:'critical' },
  { regex: /sql\s*injection|union.*select|drop\s+table/i, type:'SQL Injection', severity:'critical' },
  { regex: /xss|<script>|javascript:/i, type:'XSS', severity:'high' },
  { regex: /port.*scan|nmap|masscan/i, type:'Port Scan', severity:'high' },
  { regex: /malware|trojan|ransomware/i, type:'Malware', severity:'critical' },
  { regex: /unauthorized.*access|access.*denied/i, type:'Unauthorized', severity:'warning' }
]

const timestampPatterns = [
  /(\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:?\d{2})?)/,
  /(\w{3}\s+\d{1,2}\s+\d{2}:\d{2}:\d{2})/,
  /\[(\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2}[^\]]*)\]/,
  /(\d{4}[\-/]\d{2}[\-/]\d{2}\s+\d{2}:\d{2}:\d{2})/
]

export function parseLog(text, filename='file'){
  const lines = text.split('\n')
  const parsed = []
  let id = 1
  for(const rawLine of lines){
    const line = rawLine.trim()
    if (!line) continue
    let timestamp = null
    for(const p of timestampPatterns){ const m = line.match(p); if(m){ timestamp = m[1]; break } }
    let severity = 'info'
    if (/\b(critical|fatal|panic|emergency)\b/i.test(line)) severity='critical'
    else if (/\b(error|err|failed|failure)\b/i.test(line)) severity='error'
    else if (/\b(warn|warning)\b/i.test(line)) severity='warning'
    let source = 'unknown'
    const ipm = line.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/); if(ipm) source = ipm[0]
    let threat = null, threatSeverity=null
    for(const t of threatPatterns){ if(t.regex.test(line)){ threat=t.type; threatSeverity=t.severity; break } }
    parsed.push({ id: id++, filename, raw: line, timestamp, severity: threat?threatSeverity:severity, source, message: line, threat })
  }
  return parsed
}
