import { useState } from 'react'
import { Globe, Server, Shield, Database, Search, Filter, ExternalLink } from 'lucide-react'

export default function AttackSurfacePage() {
    const [searchQuery, setSearchQuery] = useState('')

    // Mock data for display
    const assets = [
        { id: 1, domain: 'sub.example.com', ip: '192.168.1.101', ports: [80, 443, 8080], tech: ['Nginx', 'React'], status: 'Active' },
        { id: 2, domain: 'api.example.com', ip: '192.168.1.102', ports: [443, 3000], tech: ['Node.js', 'Express'], status: 'Active' },
        { id: 3, domain: 'dev.example.com', ip: '192.168.1.103', ports: [22, 80], tech: ['Apache'], status: 'Monitor' },
        { id: 4, domain: 'mail.example.com', ip: '192.168.1.104', ports: [25, 143, 587], tech: ['Postfix'], status: 'Active' },
    ]

    return (
        <div className="animate-fadeIn">
            {/* Header */}
            <div className="mb-8 flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Attack Surface Intelligence</h1>
                    <p className="text-slate-400">Continuous monitoring of external assets and exposures.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary-900/20">
                        Run Discovery
                    </button>
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg text-sm font-medium transition-colors">
                        Export Report
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Assets', value: '42', icon: Globe, color: 'text-blue-400', border: 'border-blue-500/20' },
                    { label: 'Open Ports', value: '128', icon: Server, color: 'text-orange-400', border: 'border-orange-500/20' },
                    { label: 'Vunerabilities', value: '7', icon: Shield, color: 'text-red-400', border: 'border-red-500/20' },
                    { label: 'Services', value: '24', icon: Database, color: 'text-purple-400', border: 'border-purple-500/20' },
                ].map((stat, i) => (
                    <div key={i} className={`glass-panel p-5 rounded-xl border ${stat.border}`}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div className={`text-2xl font-bold text-white`}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="glass-panel rounded-xl overflow-hidden border border-slate-700/50">
                {/* Toolbar */}
                <div className="p-4 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between bg-[#0a0f1f]/50">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search domains, IPs, technologies..."
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium text-slate-300 transition-colors border border-slate-700">
                            <Filter className="w-3 h-3" /> Filter
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5 text-xs text-slate-400 uppercase tracking-wider">
                                <th className="p-4 font-medium">Domain / Asset</th>
                                <th className="p-4 font-medium">IP Address</th>
                                <th className="p-4 font-medium">Open Ports</th>
                                <th className="p-4 font-medium">Technologies</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {assets.map((asset) => (
                                <tr key={asset.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded bg-slate-800 text-slate-400 group-hover:text-white transition-colors">
                                                <Globe className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium text-slate-200">{asset.domain}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-400 font-mono text-sm">{asset.ip}</td>
                                    <td className="p-4">
                                        <div className="flex gap-1 flex-wrap">
                                            {asset.ports.map(p => (
                                                <span key={p} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">{p}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-1 flex-wrap">
                                            {asset.tech.map(t => (
                                                <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-900/30 text-cyan-400 border border-cyan-500/20">{t}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                            {asset.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer/Pagination */}
                <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                    <div>Showing 4 of 42 assets</div>
                    <div className="flex gap-2">
                        <button className="px-2 py-1 hover:bg-slate-800 rounded">Previous</button>
                        <button className="px-2 py-1 hover:bg-slate-800 rounded text-slate-200">1</button>
                        <button className="px-2 py-1 hover:bg-slate-800 rounded">2</button>
                        <button className="px-2 py-1 hover:bg-slate-800 rounded">3</button>
                        <button className="px-2 py-1 hover:bg-slate-800 rounded">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
