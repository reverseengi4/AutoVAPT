import { BookOpen, Search, Filter } from 'lucide-react'

export default function KnowledgeBasePage() {
    return (
        <div className="min-h-screen p-8 animate-fadeIn pb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-blue-500" />
                        Knowledge Base
                    </h1>
                    <p className="text-slate-400">Security documentation, attack patterns, and vulnerability references.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search knowledge..."
                            className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg border border-slate-700">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Placeholder Categories */}
                {['Web Vulnerabilities', 'Network Security', 'Cloud Security', 'Compliance Standards', 'Exploit Techniques', 'Remediation'].map((cat, i) => (
                    <div key={i} className="glass-panel p-6 rounded-xl border border-slate-800 hover:border-slate-600 transition-all cursor-pointer group">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{cat}</h3>
                        <p className="text-sm text-slate-500">Access comprehensive guides and references for {cat.toLowerCase()}.</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
