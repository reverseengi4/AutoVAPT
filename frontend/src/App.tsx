import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import NewScanPage from './pages/NewScanPage'
import ScanDetailsPage from './pages/ScanDetailsPage'
import AgentStatusPage from './pages/AgentStatusPage'
import AgentListPage from './pages/AgentListPage'
import TaskLibraryPage from './pages/TaskLibraryPage'
import RealtimeTaskPage from './pages/RealtimeTaskPage'
import ReportsPage from './pages/ReportsPage'
import ReportViewPage from './pages/ReportViewPage'
import SettingsPage from './pages/SettingsPage'
import SchedulerPage from './pages/SchedulerPage'
import AutoPentestPage from './pages/AutoPentestPage'
import AttackSurfacePage from './pages/AttackSurfacePage'
import VulnLabPage from './pages/VulnLabPage'
import TerminalAgentPage from './pages/TerminalAgentPage'
import SandboxDashboardPage from './pages/SandboxDashboardPage'
import ProvidersPage from './pages/ProvidersPage'
import McpServersPage from './pages/McpServersPage'
import KnowledgeBasePage from './pages/KnowledgeBasePage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auto" element={<AutoPentestPage />} />
        <Route path="/agents" element={<AgentListPage />} />
        <Route path="/attack-surface" element={<AttackSurfacePage />} />

        {/* Tools */}
        <Route path="/vuln-lab" element={<VulnLabPage />} />
        <Route path="/terminal" element={<TerminalAgentPage />} />
        <Route path="/scan/new" element={<NewScanPage />} />
        <Route path="/scan/:scanId" element={<ScanDetailsPage />} />
        <Route path="/agent/:agentId" element={<AgentStatusPage />} />
        <Route path="/run/:agentId" element={<AgentStatusPage />} /> {/* Alias if needed */}
        <Route path="/tasks" element={<TaskLibraryPage />} />
        <Route path="/realtime" element={<RealtimeTaskPage />} />
        <Route path="/sandboxes" element={<SandboxDashboardPage />} />
        <Route path="/kb" element={<KnowledgeBasePage />} />
        <Route path="/mcp" element={<McpServersPage />} />
        <Route path="/providers" element={<ProvidersPage />} />

        {/* Config */}
        <Route path="/scheduler" element={<SchedulerPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/reports/:reportId" element={<ReportViewPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
