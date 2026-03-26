import { Bot, Zap, Globe, Terminal, Activity, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const agents = [
    {
        id: 'recon-01',
        name: 'Reconnaissance Unit',
        type: 'Intelligence',
        description: 'Autonomous proactive scanning and asset discovery agent. Maps attack surface.',
        status: 'idle',
        icon: Globe,
        color: 'text-blue-400',
        borderColor: 'border-blue-500/20',
        bg: 'bg-blue-500/10'
    },
    {
        id: 'exploit-01',
        name: 'Exploitation Specialist',
        type: 'Offensive',
        description: 'Deep vulnerability analysis and exploitation verification agent.',
        status: 'busy',
        icon: Zap,
        color: 'text-red-400',
        borderColor: 'border-red-500/20',
        bg: 'bg-red-500/10'
    },
    {
        id: 'report-01',
        name: 'Reporter Analyst',
        type: 'Reporting',
        description: 'Synthesizes findings into comprehensive executive and technical reports.',
        status: 'idle',
        icon: Terminal,
        color: 'text-purple-400',
        borderColor: 'border-purple-500/20',
        bg: 'bg-purple-500/10'
    },
    {
        id: 'social-01',
        name: 'Social Engineer',
        type: 'Human Intelligence',
        description: 'Simulates phishing and social engineering campaigns (Requires Authorization).',
        status: 'offline',
        icon: Bot,
        color: 'text-yellow-400',
        borderColor: 'border-yellow-500/20',
        bg: 'bg-yellow-500/10'
    },
]

export default function AgentListPage() {
    return (
        <div className="animate-fadeIn pb-20">
            <div className="mb-10 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">AI Agent Fleet</h1>
                <p className="text-slate-400 text-lg">
                    Manage and deploy specialized autonomous agents for your security operations.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {agents.map((agent) => (
                    <div key={agent.id} className={`glass-panel p-6 rounded-2xl border ${agent.borderColor} hover:border-opacity-50 transition-all hover:scale-[1.02] group relative overflow-hidden`}>
                        {/* Status Indicator */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${agent.status === 'busy' ? 'bg-orange-500 animate-pulse' :
                                agent.status === 'idle' ? 'bg-green-500' : 'bg-slate-500'
                                }`}></span>
                            <span className="text-xs font-medium uppercase text-slate-400 tracking-wider text-[10px]">{agent.status}</span>
                        </div>

                        <div className={`w-14 h-14 rounded-xl ${agent.bg} flex items-center justify-center mb-6`}>
                            <agent.icon className={`w-7 h-7 ${agent.color}`} />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-colors">
                            {agent.name}
                        </h3>

                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            {agent.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-2 py-1 rounded border border-slate-700/50">
                                v1.0.0
                            </span>
                            <Link
                                to="/auto"
                                className="flex items-center gap-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors border border-slate-700 hover:border-slate-600"
                            >
                                Deploy Agent <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ))}

                {/* Add New Agent Card */}
                <div className="border border-dashed border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-900/30 transition-colors cursor-pointer group min-h-[300px]">
                    <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-slate-700 transition-colors">
                        <Activity className="w-6 h-6 text-slate-500 group-hover:text-slate-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">Train New Agent</h3>
                    <p className="text-slate-500 text-sm max-w-xs">
                        Create a custom agent with specific capabilities using the Agent Builder.
                    </p>
                </div>
            </div>
        </div >
    )
}
