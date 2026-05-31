
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  User,
  LogOut,
  Search,
  TrendingUp,
  Users,
  AlertTriangle,
  Target,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Activity,
  Award,
  Clock,
  Zap,
  Menu,
  X,
  LayoutDashboard,
  Upload,
} from "lucide-react";

function Dashboard() {
  const [dashboard, setDashboard] = useState({});
  const [trainees, setTrainees] = useState([]);
  const [search, setSearch] = useState("");
  const [streamFilter, setStreamFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [dashboardRes, traineesRes] = await Promise.all([
          axios.get("https://mavx-production.up.railway.app/dashboard"),

          axios.get("https://mavx-production.up.railway.app/trainees"),
        ]);
        setDashboard(dashboardRes.data);
        setTrainees(traineesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter logic
  const filteredTrainees = useMemo(() => {
    return trainees.filter((t) => {
      const matchesSearch = t.name?.toLowerCase().includes(search.toLowerCase());
      const matchesStream = streamFilter === "" || t.stream === streamFilter;
      const matchesRisk = riskFilter === "" || t.risk_level === riskFilter;
      return matchesSearch && matchesStream && matchesRisk;
    });
  }, [trainees, search, streamFilter, riskFilter]);

  // Dynamic KPI values
  const totalTrainees = filteredTrainees.length;
  const averageScore = totalTrainees > 0
    ? (filteredTrainees.reduce((sum, t) => sum + (t.spark_score || 0), 0) / totalTrainees).toFixed(2)
    : 0;
  const highRiskCount = filteredTrainees.filter(t => t.risk_level === "High").length;
  const avgReadiness = totalTrainees > 0
    ? (filteredTrainees.reduce((sum, t) => sum + (t.readiness || 0), 0) / totalTrainees).toFixed(2)
    : 0;
  const deploymentReady = filteredTrainees.filter(t => t.readiness >= 75).length;

  // Pagination
  const totalPages = Math.ceil(filteredTrainees.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTrainees = filteredTrainees.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Chart data
  const riskData = [
    { name: "High", value: filteredTrainees.filter(t => t.risk_level === "High").length, color: "#ef4444" },
    { name: "Medium", value: filteredTrainees.filter(t => t.risk_level === "Medium").length, color: "#facc15" },
    { name: "Low", value: filteredTrainees.filter(t => t.risk_level === "Low").length, color: "#22c55e" },
  ];

  const performanceData = [
    { range: "0-20", count: filteredTrainees.filter(t => t.spark_score >= 0 && t.spark_score < 20).length },
    { range: "21-40", count: filteredTrainees.filter(t => t.spark_score >= 21 && t.spark_score < 40).length },
    { range: "41-60", count: filteredTrainees.filter(t => t.spark_score >= 41 && t.spark_score < 60).length },
    { range: "61-80", count: filteredTrainees.filter(t => t.spark_score >= 61 && t.spark_score < 80).length },
    { range: "81-100", count: filteredTrainees.filter(t => t.spark_score >= 81).length },
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case "High": return "bg-gradient-to-r from-red-600 to-red-500";
      case "Medium": return "bg-gradient-to-r from-yellow-600 to-yellow-500";
      default: return "bg-gradient-to-r from-green-600 to-green-500";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const KPICards = [
    { title: "Total Trainees", value: totalTrainees, icon: Users, color: "from-blue-600 to-blue-500", change: "+12%", changePositive: true },
    { title: "Average Score", value: averageScore, icon: TrendingUp, color: "from-purple-600 to-purple-500", suffix: "%", change: "+5%", changePositive: true },
    { title: "High Risk", value: highRiskCount, icon: AlertTriangle, color: "from-red-600 to-red-500", change: "-3%", changePositive: false },
    { title: "Readiness Rate", value: avgReadiness, icon: Target, color: "from-green-600 to-green-500", suffix: "%", change: "+8%", changePositive: true },
    { title: "Deployment Ready", value: deploymentReady, icon: Award, color: "from-orange-600 to-orange-500", change: "+15%", changePositive: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-6 h-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-purple-500/25">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  MavX 
                </h1>
                <p className="text-xs text-gray-500">Training Intelligence Platform</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors relative">
              <RefreshCw className="w-5 h-5 text-gray-400" />
            </button>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">Swathi</p>
                <p className="text-xs text-gray-500">swathi@mavx.com</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-20 left-0 z-20 w-72 h-[calc(100vh-5rem)] bg-slate-900/80 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <nav className="p-6 space-y-2">
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-medium transition-all shadow-lg shadow-purple-500/25">
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </a>
            <a href="/upload" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-all group">
              <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Upload Data
            </a>
            <a href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-all group">
              <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Profile Settings
            </a>
            <div className="pt-8 mt-8 border-t border-white/10">
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all w-full group">
                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Logout
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-blue-500 animate-pulse" />
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome Back!
                </h1>
                <p className="text-gray-500 mt-2">Here's what's happening with your training programs today.</p>
              </div>

              {/* Filters */}
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-white/10">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search trainees by name..."
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800/70 transition-all"
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    />
                  </div>
                  <div className="flex gap-3">
                    <select
                      className="px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:bg-slate-800/70 transition-all cursor-pointer appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
                      onChange={(e) => { setStreamFilter(e.target.value); setCurrentPage(1); }}
                      value={streamFilter}
                    >
                      <option value="" className="bg-slate-800">All Streams</option>
                      <option value="Java" className="bg-slate-800">Java</option>
                      <option value="Python" className="bg-slate-800">Python</option>
                      <option value="Data" className="bg-slate-800">Data Science</option>
                    </select>
                    <select
                      className="px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:bg-slate-800/70 transition-all cursor-pointer appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
                      onChange={(e) => { setRiskFilter(e.target.value); setCurrentPage(1); }}
                      value={riskFilter}
                    >
                      <option value="" className="bg-slate-800">All Risk Levels</option>
                      <option value="High" className="bg-slate-800">High Risk</option>
                      <option value="Medium" className="bg-slate-800">Medium Risk</option>
                      <option value="Low" className="bg-slate-800">Low Risk</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {KPICards.map((kpi, idx) => (
                  <div key={idx} className={`bg-gradient-to-br ${kpi.color} rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group`}>
                    <div className="flex items-center justify-between mb-3">
                      <kpi.icon className="w-8 h-8 text-white/80 group-hover:scale-110 transition-transform" />
                      <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white/20 ${kpi.changePositive ? 'text-green-200' : 'text-red-200'}`}>
                        {kpi.change}
                      </span>
                    </div>
                    <p className="text-white/80 text-sm">{kpi.title}</p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {kpi.value}{kpi.suffix || ''}
                    </p>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Risk Distribution */}
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Risk Distribution</h2>
                    <div className="flex gap-2">
                      {riskData.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-xs">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-gray-400">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={riskData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {riskData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.75rem' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Performance Distribution */}
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                  <h2 className="text-xl font-bold text-white mb-6">Performance Distribution</h2>
                  <div className="h-[300px]">
                    <ResponsiveContainer>
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="range" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.75rem' }} />
                        <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]}>
                          {performanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
                          ))}
                        </Bar>
                        <defs>
                          {performanceData.map((_, idx) => (
                            <linearGradient key={idx} id={`gradient-${idx}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#a78bfa" />
                              <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                          ))}
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">AI-Powered Insights</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-500/50 transition-all group">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <span className="text-red-400 font-medium">Critical Alert</span>
                    </div>
                    <p className="text-gray-300 text-sm">{filteredTrainees.filter(t => t.spark_score < 40).length} trainees require immediate intervention</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-500/50 transition-all group">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">Readiness Score</span>
                    </div>
                    <p className="text-gray-300 text-sm">Average readiness is {avgReadiness}% - {avgReadiness >= 75 ? 'Above target' : 'Below target'}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-500/50 transition-all group">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-medium">Deployment Ready</span>
                    </div>
                    <p className="text-gray-300 text-sm">{deploymentReady} trainees are ready for deployment ({totalTrainees > 0 ? ((deploymentReady / totalTrainees) * 100).toFixed(1) : 0}%)</p>
                  </div>
                </div>
              </div>

              {/* Trainee Analytics Table */}
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-white">Trainee Analytics</h2>
                      <p className="text-sm text-gray-500 mt-1">Detailed performance metrics and recommendations</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500">Last updated: Just now</span>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-800/50">
                      <tr className="text-left text-gray-400 text-sm">
                        <th className="px-6 py-4 font-medium">Name</th>
                        <th className="px-6 py-4 font-medium">Stream</th>
                        <th className="px-6 py-4 font-medium">Spark Score</th>
                        <th className="px-6 py-4 font-medium">Risk Level</th>
                        <th className="px-6 py-4 font-medium">Readiness</th>
                        <th className="px-6 py-4 font-medium">Recommendation</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {paginatedTrainees.map((t, index) => (
                        <tr
                          key={index}
                          onClick={() => window.location.href = `/trainee/${t.id}`}
                          className="hover:bg-white/5 transition-all cursor-pointer group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                                {t.name?.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium text-white group-hover:text-blue-400 transition-colors">
                                {t.name}
                              </span>
                            </div>
                           </td>
                          <td className="px-6 py-4 text-gray-300">{t.stream}</td>
                          <td className={`px-6 py-4 font-bold ${getScoreColor(t.spark_score)}`}>
                            {t.spark_score}
                           </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg ${getRiskColor(t.risk_level)}`}>
                              {t.risk_level}
                            </span>
                           </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-white/10 rounded-full h-2 w-24">
                                <div
                                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-green-400"
                                  style={{ width: `${t.readiness}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-400">{t.readiness}%</span>
                            </div>
                           </td>
                          <td className="px-6 py-4">
                            <span className="text-xs text-gray-400">{t.recommendation}</span>
                           </td>
                         </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-white/10 flex justify-between items-center">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      Page {currentPage} of {totalPages || 1}
                    </span>
                    <div className="flex gap-1">
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-lg text-sm transition-all ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 text-white"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;