import { useEffect, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity, Shield, AlertTriangle, ArrowRight,
  Clock, Cpu, Globe,
  Target, Zap, MoreHorizontal
} from 'lucide-react'
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend
} from 'recharts'
import Button from '../components/common/Button'
import { dashboardApi } from '../services/api'
import { useDashboardStore } from '../store'
import type { ActivityFeedItem } from '../types'

export default function HomePage() {
  const { stats, setStats, setRecentScans, setRecentVulnerabilities, setLoading } = useDashboardStore()
  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>([])

  const fetchData = useCallback(async () => {
    try {
      const [statsData, recentData, activityData] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getRecent(5),
        dashboardApi.getActivityFeed(15)
      ])
      setStats(statsData)
      setRecentScans(recentData.recent_scans)
      setRecentVulnerabilities(recentData.recent_vulnerabilities)
      setActivityFeed(activityData.activities)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    }
  }, [setStats, setRecentScans, setRecentVulnerabilities])

  useEffect(() => {
    setLoading(true)
    fetchData().finally(() => setLoading(false))
    const refreshInterval = setInterval(fetchData, 30000)
    return () => clearInterval(refreshInterval)
  }, [fetchData, setLoading])

  // Mock data for where real data might be missing or to enhance UI
  const securityScore = 85;
  const attackSurfaceCount = 142;

  const severityData = [
    { name: 'Critical', value: stats?.vulnerabilities.critical || 0, color: '#ff0055' }, // Neon Red
    { name: 'High', value: stats?.vulnerabilities.high || 0, color: '#ff7700' },
    { name: 'Medium', value: stats?.vulnerabilities.medium || 0, color: '#ebd800' },
    { name: 'Low', value: stats?.vulnerabilities.low || 0, color: '#00d4ff' }, // Neon Blue
  ];

  const agentStreams = [
    { name: 'Reconnaissance', status: 'Active', progress: 78, color: 'bg-blue-500' },
    { name: 'AI Tester', status: 'Analyzing', progress: 45, color: 'bg-purple-500' },
    { name: 'Exploitation', status: 'Waiting', progress: 0, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-10">

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Security Score */}
        <div className="glass-panel rounded-xl p-5 relative overflow-hidden card-hover group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Shield className="w-24 h-24 text-green-400" />
          </div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Security Score</h3>
            <span className="flex items-center text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
              +2.4% <ArrowRight className="w-3 h-3 ml-1 rotate-[-45deg]" />
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white tracking-tight">{securityScore}</span>
            <span className="text-sm text-slate-500">/ 100</span>
          </div>
          <div className="mt-4 w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full shadow-[0_0_10px_#22c55e]" style={{ width: `${securityScore}%` }}></div>
          </div>
        </div>

        {/* Active Scans */}
        <div className="glass-panel rounded-xl p-5 relative overflow-hidden card-hover group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-24 h-24 text-blue-400" />
          </div>
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Active Scans</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white tracking-tight">{stats?.scans.running || 0}</span>
            <span className="text-sm text-slate-500">running</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Avg duration: 45m
          </p>
        </div>

        {/* Critical Vulns */}
        <div className="glass-panel rounded-xl p-5 relative overflow-hidden card-hover group border-red-500/20">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertTriangle className="w-24 h-24 text-red-500" />
          </div>
          <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <h3 className="text-sm font-medium text-red-400 uppercase tracking-wider mb-2">Critical Vulns</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white tracking-tight neon-text-red">{stats?.vulnerabilities.critical || 0}</span>
            <span className="text-sm text-slate-500">unresolved</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">
            <Target className="w-3 h-3" /> Requires immediate attention
          </p>
        </div>

        {/* Attack Surface */}
        <div className="glass-panel rounded-xl p-5 relative overflow-hidden card-hover group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Globe className="w-24 h-24 text-purple-400" />
          </div>
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Attack Surface</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white tracking-tight">{attackSurfaceCount}</span>
            <span className="text-sm text-slate-500">assets</span>
          </div>
          <div className="mt-4 flex gap-2">
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">12 Domains</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">45 APIs</span>
          </div>
        </div>
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        {/* Severity Distribution */}
        <div className="glass-panel rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" /> Vulnerability Distribution
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {severityData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0a0f1f', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights - Central Panel */}
        <div className="glass-panel rounded-xl p-0 flex flex-col relative overflow-hidden border-purple-500/30 shadow-[0_0_20px_rgba(189,0,255,0.05)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse"></div>
          <div className="p-6 pb-2">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 neon-text-purple">
              <Zap className="w-5 h-5" /> AI Tactical Insights
            </h3>
            <p className="text-xs text-purple-300/80 mt-1">Real-time intelligence from AutoVAPT Core</p>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4 custom-scrollbar">
            <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#bd00ff]"></div>
                <div>
                  <p className="text-sm text-purple-100 font-medium">SQL Injection Pattern Detected</p>
                  <p className="text-xs text-purple-300/70 mt-1">Agent observed time-based blind SQLi responses on <span className="text-white font-mono bg-purple-900/30 px-1 rounded">/api/v1/users</span> endpoint.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#00d4ff]"></div>
                <div>
                  <p className="text-sm text-blue-100 font-medium">New Attack Surface Asset</p>
                  <p className="text-xs text-blue-300/70 mt-1">Subdomain <span className="text-white font-mono bg-blue-900/30 px-1 rounded">dev-admin.target.com</span> discovered via cert transparency.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3 opacity-70">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-slate-400"></div>
                <div>
                  <p className="text-sm text-slate-200 font-medium">Recon Cycle Complete</p>
                  <p className="text-xs text-slate-400 mt-1">Initial reconnaissance for 3 targets finished in 14m 20s.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 border-t border-purple-500/10 bg-purple-900/5 flex justify-center">
            <button className="text-xs text-purple-400 flex items-center gap-1 hover:text-purple-300 transition-colors">
              View All Insights <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-panel rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-400" /> Live Feed
            </h3>
            <MoreHorizontal className="w-5 h-5 text-slate-600 cursor-pointer hover:text-slate-300" />
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {activityFeed.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm">
                <Activity className="w-8 h-8 mb-2 opacity-20" />
                No recent activity
              </div>
            ) : (
              activityFeed.map((activity, idx) => (
                <div key={idx} className="flex gap-3 group">
                  <div className="flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full mt-2 ring-4 ring-[#050510] ${activity.type === 'vulnerability' ? 'bg-red-500' :
                      activity.type === 'scan' ? 'bg-blue-500' : 'bg-green-500'
                      }`}></div>
                    <div className="w-px h-full bg-slate-800 my-1 group-last:hidden"></div>
                  </div>
                  <div className="pb-3 flex-1 min-w-0">
                    <p className="text-sm text-slate-200 font-medium truncate">{activity.title}</p>
                    <p className="text-xs text-slate-500 truncate">{activity.description}</p>
                    <span className="text-[10px] text-slate-600 mt-0.5 block">
                      {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: Active Operations & Agent Streams */}
      <div className="glass-panel rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" /> Active Autonomous Operations
          </h3>
          <Link to="/auto">
            <Button variant="outline" size="sm">Manage Agents</Button>
          </Link>
        </div>

        <div className="space-y-6">
          {agentStreams.map((stream) => (
            <div key={stream.name} className="relative">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-300">{stream.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${stream.status === 'Active' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                  stream.status === 'Analyzing' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                    'bg-slate-800 text-slate-500'
                  }`}>
                  {stream.status}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${stream.color} shadow-[0_0_10px_currentColor]`}
                  style={{ width: `${stream.progress}%`, opacity: 0.8 }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
