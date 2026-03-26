import { useState } from 'react'
import {
  Search, RefreshCw, Key, Shield, CheckCircle2,
  XCircle, Zap, Cpu, Server, ExternalLink, Power
} from 'lucide-react'

// Mock Data for OAuth Providers
const OAUTH_PROVIDERS = [
  { id: 'claude-code', name: 'Claude Code', model: 'claude-sonnet-4-6-20250929', tier: 'Tier 1', active: true, status: '1/1 active' },
  { id: 'openai-codex', name: 'OpenAI Codex CLI', model: 'gpt-4o', tier: 'Tier 1', active: true, status: '0/0 active' },
  { id: 'gemini-cli', name: 'Gemini CLI', model: 'gemini-2.5-flash', tier: 'Tier 1', active: true, status: '1/1 active', tokens: '1,632 tokens' },
  { id: 'cursor', name: 'Cursor', model: 'cursor-fast', tier: 'Tier 1', active: false, status: '0/0 active' },
  { id: 'github-copilot', name: 'GitHub Copilot', model: 'gpt-4o', tier: 'Tier 1', active: true, status: '0/0 active' },
  { id: 'iflow-ai', name: 'IFlow AI', model: 'k/ml-k2', tier: 'Tier 1', active: true, status: '0/0 active' },
  { id: 'qwen-code', name: 'Qwen Code', model: 'qwen2-coder', tier: 'Tier 1', active: false, status: '0/0 active' },
  { id: 'kiro-ai', name: 'Kiro AI', model: 'claude-sonnet-4-6-20250929', tier: 'Tier 1', active: true, status: '0/0 active' },
]

// Mock Data for API Key Providers
const API_PROVIDERS = [
  { id: 'anthropic', name: 'Anthropic', model: 'claude-sonnet-4-6-20250929', tier: 'Tier 1', active: false, usage: '154,320 tokens' },
  { id: 'openai', name: 'OpenAI', model: 'gpt-4o', tier: 'Tier 1', active: true, usage: '0/0 active' },
  { id: 'gemini', name: 'Gemini', model: 'gemini-2.5-flash', tier: 'Tier 1', active: true, usage: '0/0 active' },
  { id: 'openrouter', name: 'OpenRouter', model: 'anthropic/claude-sonnet-4-6', tier: 'Tier 1', active: true, usage: '0/0 active' },
  { id: 'glm', name: 'GLM (Zhipu AI)', model: 'glm-4-flash', tier: 'Tier 2 - Budget', active: true, usage: '0/0 active' },
  { id: 'kimi', name: 'Kimi (Moonshot)', model: 'moonshot-v1-8k', tier: 'Tier 2 - Budget', active: true, usage: '0/0 active' },
  { id: 'minimax', name: 'Minimax', model: 'abab6.5-chat', tier: 'Tier 2 - Budget', active: true, usage: '0/0 active' },
  { id: 'together', name: 'Together AI', model: 'meta-llama/Llama-2-70b-chat-hf', tier: 'Tier 2 - Budget', active: true, usage: '0/0 active' },
  { id: 'fireworks', name: 'Fireworks AI', model: 'accounts/fireworks/models/llama-v3p1-70b-instruct', tier: 'Tier 2 - Budget', active: true, usage: '0/0 active' },
  { id: 'ollama', name: 'Ollama', model: 'llama3', tier: 'Tier 2 - Free', active: true, usage: '0/0 active' },
  { id: 'lm-studio', name: 'LM Studio', model: 'local-model', tier: 'Tier 3 - Free', active: true, usage: '0/0 active' },
]

export default function ProvidersPage() {
  const [oauthProviders, setOauthProviders] = useState(OAUTH_PROVIDERS)
  const [apiProviders, setApiProviders] = useState(API_PROVIDERS)

  const toggleOauth = (id: string) => {
    setOauthProviders(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p))
  }

  const toggleApi = (id: string) => {
    setApiProviders(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p))
  }

  return (
    <div className="min-h-screen p-8 animate-fadeIn pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Zap className="w-8 h-8 text-orange-500" />
            LLM Providers
          </h1>
          <p className="text-slate-400">Manage AI model connections, API keys, and CLI integrations.</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
                <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Total Usage</div>
                <div className="text-xl font-mono text-cyan-400">1,632 tokens</div>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden md:block"></div>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 flex items-center gap-2 transition-colors">
                <Search className="w-4 h-4" /> Detect All CLIs
            </button>
            <button className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 transition-colors">
                <RefreshCw className="w-4 h-4" />
            </button>
        </div>
      </div>

      {/* OAuth Providers Section */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" /> OAuth Providers <span className="text-xs font-normal text-slate-500 ml-2 border border-slate-700 rounded px-2 py-0.5">CLI Token Detection</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {oauthProviders.map(provider => (
                <div key={provider.id} className="glass-panel p-5 rounded-xl border-slate-800 relative group overflow-hidden">
                    <div className="flex justify-between items-start mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${getStringColor(provider.id)}`}>
                            {provider.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex gap-2">
                            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                                provider.tier.includes('Tier 1') ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                                'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            }`}>
                                {provider.tier.split(' ')[0]} {provider.tier.split(' ')[1]}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={provider.active} onChange={() => toggleOauth(provider.id)} className="sr-only peer" />
                                <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                        </div>
                    </div>
                    <h3 className="text-slate-200 font-semibold mb-1">{provider.name}</h3>
                    <div className="text-xs text-slate-500 font-mono mb-3 truncate" title={provider.model}>{provider.model}</div>
                    
                    <div className="flex items-center gap-2 text-xs">
                        {provider.active ? (
                            <CheckCircle2 className="w-3 h-3 text-green-400" />
                        ) : (
                            <XCircle className="w-3 h-3 text-slate-600" />
                        )}
                        <span className={provider.active ? 'text-green-400' : 'text-slate-600'}>
                             {provider.status}
                        </span>
                        {provider.tokens && <span className="ml-auto text-slate-400">{provider.tokens}</span>}
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* API Key Providers Section */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-yellow-400" /> API Key Providers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {apiProviders.map(provider => (
                <div key={provider.id} className="glass-panel p-5 rounded-xl border-slate-800 relative group overflow-hidden">
                    <div className="flex justify-between items-start mb-3">
                         <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${getStringColor(provider.id)}`}>
                            {provider.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex gap-2">
                            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                                provider.tier.includes('Tier 1') ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                                provider.tier.includes('Tier 2') ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                'bg-slate-500/10 text-slate-400 border-slate-500/20'
                            }`}>
                                {provider.tier.includes('-') ? 'Tier ' + provider.tier.split(' ')[1] : provider.tier}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={provider.active} onChange={() => toggleApi(provider.id)} className="sr-only peer" />
                                <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-slate-200 font-semibold">{provider.name}</h3>
                        {!provider.active && <span className="text-[10px] text-red-400 bg-red-500/10 px-1 rounded border border-red-500/20">OFF</span>}
                    </div>
                    <div className="text-xs text-slate-500 font-mono mb-3 truncate" title={provider.model}>{provider.model}</div>
                    
                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-500">{provider.usage}</span>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  )
}

function getStringColor(str: string) {
    // Simple hash to color mapping for provider icons
    const colors = [
        'bg-orange-500 text-white',
        'bg-blue-500 text-white',
        'bg-purple-500 text-white',
        'bg-green-500 text-white',
        'bg-pink-500 text-white',
        'bg-cyan-500 text-white',
        'bg-yellow-500 text-black',
        'bg-red-500 text-white'
    ]
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
}
