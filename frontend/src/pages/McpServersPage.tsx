import { Server, Database, Code, Play, CheckCircle2, MoreVertical } from 'lucide-react'

const SERVERS = [
    { id: 'ghidra', name: 'Ghidra', type: 'Reverse Engineering', status: 'connected', version: '10.3' },
    { id: 'postgres', name: 'PostgreSQL', type: 'Database', status: 'connected', version: '15.2' },
    { id: 'docker', name: 'Docker', type: 'Container', status: 'connected', version: '24.0' },
    { id: 'filesystem', name: 'FileSystem', type: 'System', status: 'connected', version: '1.0' },
]

export default function McpServersPage() {
    return (
        <div className="min-h-screen p-8 animate-fadeIn pb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Server className="w-8 h-8 text-blue-500" />
                        MCP Servers
                    </h1>
                    <p className="text-slate-400">Manage Model Context Protocol server connections.</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2">
                    <Server className="w-4 h-4" /> Add Server
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVERS.map(server => (
                    <div key={server.id} className="glass-panel p-6 rounded-xl border border-slate-800 relative group hover:border-blue-500/30 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                                {server.id === 'ghidra' ? <Code className="w-6 h-6" /> :
                                    server.id === 'postgres' ? <Database className="w-6 h-6" /> :
                                        <Server className="w-6 h-6" />}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-md text-xs text-green-400 font-medium uppercase tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                    Connected
                                </span>
                                <button className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-white transition-colors">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1">{server.name}</h3>
                        <p className="text-sm text-slate-400 mb-4">{server.type}</p>

                        <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-xs text-slate-500 font-mono">
                            <span>v{server.version}</span>
                            <span>{server.id}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
