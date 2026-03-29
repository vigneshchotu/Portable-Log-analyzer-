export function detectAnomalies(entries, ipThreshold=10, repeatThreshold=15){
  const ipCounts = {}, msgCounts = {}
  for(const e of entries){
    if (e.source && e.source!=='unknown') ipCounts[e.source] = (ipCounts[e.source]||0)+1
    const key = e.message.slice(0,80)
    msgCounts[key] = (msgCounts[key]||0)+1
  }
  const results = []
  for(const [ip,count] of Object.entries(ipCounts)){ if(count>=ipThreshold) results.push({ type:'High Activity Source', source:ip, count, severity:'warning' }) }
  for(const [msg,count] of Object.entries(msgCounts)){ if(count>=repeatThreshold) results.push({ type:'Repeated Event', event:msg, count, severity:'warning' }) }
  return results
}
