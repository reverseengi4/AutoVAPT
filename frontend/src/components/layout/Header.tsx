import { useLocation } from 'react-router-dom'
import { Bell, Search, ChevronDown, Wifi } from 'lucide-react'

const pageTitles: Record<string, string> = {
  '/': 'Mission Control',
  '/auto': 'Auto Pentest Operations',
  '/reports': 'Intelligence Reports',
  '/settings': 'System Configuration',
  '/vuln-lab': 'Vulnerability Laboratory',
  '/terminal': 'Command Terminal',
  '/sandboxes': 'Container Orchestration',
  '/agents': 'AI Agent Status',
  '/realtime': 'Real-time Task Monitor',
  '/tasks': 'Task Library',
  '/attack-surface': 'Attack Surface Management',
  '/kb': 'Knowledge Base',
  '/scheduler': 'Mission Scheduler',
  '/integrations': 'External Integrations',
}

export default function Header() {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'AutoVAPT Console'

  return (
    <header className="h-16 bg-[#050510]/80 backdrop-blur-sm border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-white tracking-wide uppercase">{title}</h1>
        {location.pathname === '/' && (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20">LIVE</span>
        )}
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative group">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="text"
            placeholder="Search assets, scans, or CVEs..."
            className="bg-[#0a0f1f] border border-[rgba(255,255,255,0.05)] rounded-full py-1.5 pl-9 pr-4 text-xs text-slate-300 w-64 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
          />
        </div>

        <div className="h-6 w-px bg-[rgba(255,255,255,0.1)]"></div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="relative text-slate-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0f1f] border border-[rgba(255,255,255,0.05)] hover:border-cyan-500/30 transition-colors cursor-pointer group">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
              AD
            </div>
            <span className="text-xs text-slate-300 group-hover:text-white">Admin User</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-green-500 bg-green-500/5 px-2 py-1 rounded border border-green-500/10">
            <Wifi className="w-3 h-3" />
            <span>24ms</span>
          </div>
        </div>
      </div>
    </header>
  )
}
