import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Bot,
  Globe,
  Zap,
  FlaskConical,
  Terminal,
  Container,
  BookOpen,
  FileText,
  Clock,
  Settings,
  Grid,
  Shield,
  Layers,
  Cpu,
  Server
} from 'lucide-react'

const navItems = [
  // Operations
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/auto', icon: Zap, label: 'Auto Pentest' },
  { path: '/agents', icon: Bot, label: 'AI Agent' },
  { path: '/realtime', icon: ActivityIcon, label: 'Real-time Task' },

  // Tools
  { path: '/vuln-lab', icon: FlaskConical, label: 'Vuln Lab' },
  { path: '/terminal', icon: Terminal, label: 'Terminal Agent' },
  { path: '/sandboxes', icon: Container, label: 'Sandboxes' },
  { path: '/tasks', icon: Layers, label: 'Task Library' },
  { path: '/kb', icon: BookOpen, label: 'Knowledge' },
  { path: '/mcp', icon: Server, label: 'MCP Servers' },
  { path: '/providers', icon: Cpu, label: 'Providers' },

  // Configuration
  { path: '/scheduler', icon: Clock, label: 'Scheduler' },
  { path: '/reports', icon: FileText, label: 'Reports' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

// Helper for the icon since 'Activity' conflicts with lucide-react export if not careful
function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 bg-opacity-30 backdrop-blur-md border-r border-[rgba(255,255,255,0.05)] flex flex-col h-screen sticky top-0 bg-[#050510]">
      {/* Logo */}
      <div className="p-6 border-b border-[rgba(255,255,255,0.05)]">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-900/40 group-hover:shadow-purple-600/40 transition-shadow">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all">
              AutoVAPT
            </h1>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              AI Pentest Platform
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
        <ul className="space-y-1">
          {/* Operations */}
          <div className="mb-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Operations</div>
          {navItems.slice(0, 4).map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative mb-1 ${isActive
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-500 rounded-r shadow-[0_0_8px_#3b82f6]"></div>
                  )}
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-blue-400' : 'group-hover:text-white'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}

          {/* Tools */}
          <div className="mt-6 mb-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tools</div>
          {navItems.slice(4, 11).map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative mb-1 ${isActive
                    ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-purple-500 rounded-r shadow-[0_0_8px_#a855f7]"></div>
                  )}
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-purple-400' : 'group-hover:text-white'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}

          {/* Configuration */}
          <div className="mt-6 mb-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Configuration</div>
          {navItems.slice(11).map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative mb-1 ${isActive
                    ? 'bg-slate-700/30 text-white border border-slate-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-slate-200' : 'group-hover:text-white'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Status */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.05)] bg-[#0a0f1f]/50">
        <div className="flex items-center gap-3 px-2">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse"></div>
          </div>
          <div>
            <div className="text-xs font-medium text-slate-300">System Online</div>
            <div className="text-[10px] text-slate-500">v1.0.0</div>
          </div>
          <Cpu className="w-4 h-4 text-slate-600 ml-auto" />
        </div>
      </div>
    </aside>
  )
}
