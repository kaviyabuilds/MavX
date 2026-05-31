import { useEffect, useState, useMemo } from "react";

import axios from "axios";

import {
  Users,
  TrendingUp,
  AlertTriangle,
  Target,
  Brain,
  Activity,
  Award,
  Search,
  Bell,
  LogOut,
  User,
} from "lucide-react";

function TrainerDashboard() {

  const [trainees, setTrainees] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [streamFilter, setStreamFilter] =
    useState("");

  const [riskFilter, setRiskFilter] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const ITEMS_PER_PAGE = 10;

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const res = await axios.get(
        "https://mavx-production.up.railway.app/trainees"
      );

      setTrainees(
        res.data
      );

    } catch (err) {

      console.error(err);
    }
  };

  // =========================
  // FILTERS
  // =========================

  const filteredTrainees =
    useMemo(() => {

      return trainees.filter((t) => {

        const matchesSearch =
          t.name?.toLowerCase().includes(
            search.toLowerCase()
          );

        const matchesStream =
          streamFilter === "" ||
          t.stream === streamFilter;

        const matchesRisk =
          riskFilter === "" ||
          t.risk_level === riskFilter;

        return (
          matchesSearch &&
          matchesStream &&
          matchesRisk
        );
      });

    }, [
      trainees,
      search,
      streamFilter,
      riskFilter
    ]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredTrainees.length /
    ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE;

  const paginatedTrainees =
    filteredTrainees.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

  // =========================
  // KPI CALCULATIONS
  // =========================

  const totalTrainees =
    filteredTrainees.length;

  const avgScore =
    totalTrainees > 0
      ? (
          filteredTrainees.reduce(
            (sum, t) =>
              sum + (t.spark_score || 0),
            0
          ) / totalTrainees
        ).toFixed(1)
      : 0;

  const avgReadiness =
    totalTrainees > 0
      ? (
          filteredTrainees.reduce(
            (sum, t) =>
              sum + (t.readiness || 0),
            0
          ) / totalTrainees
        ).toFixed(1)
      : 0;

  const highRisk =
    filteredTrainees.filter(
      (t) => t.risk_level === "High"
    ).length;

  // =========================
  // AI INSIGHTS
  // =========================

  const aiInsights = [

    `${highRisk} trainees need trainer intervention.`,

    `Average readiness is ${avgReadiness}%.`,

    `Average spark score stands at ${avgScore}%.`,

    "AI engine detected improvement opportunities in weak modules.",

    "Training performance remains stable this cycle."
  ];

  // =========================
  // HELPERS
  // =========================

  const handleLogout = () => {

    localStorage.clear();

    window.location.href = "/";
  };

  const getRiskColor = (risk) => {

    switch (risk) {

      case "High":
        return "bg-red-500";

      case "Medium":
        return "bg-yellow-500";

      default:
        return "bg-green-500";
    }
  };

  const getScoreColor = (score) => {

    if (score >= 80)
      return "text-green-400";

    if (score >= 60)
      return "text-yellow-400";

    return "text-red-400";
  };

  // =========================
  // KPI CARDS
  // =========================

  const cards = [

    {
      title: "Total Trainees",
      value: totalTrainees,
      icon: Users,
      color:
        "from-blue-600 to-blue-500"
    },

    {
      title: "Average Score",
      value: avgScore + "%",
      icon: TrendingUp,
      color:
        "from-purple-600 to-purple-500"
    },

    {
      title: "High Risk",
      value: highRisk,
      icon: AlertTriangle,
      color:
        "from-red-600 to-red-500"
    },

    {
      title: "Readiness",
      value: avgReadiness + "%",
      icon: Target,
      color:
        "from-green-600 to-green-500"
    },
  ];

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}

      <header className="sticky top-0 z-30 bg-slate-900 border-b border-white/10">

        <div className="flex items-center justify-between px-8 h-20">

          <div>

            <h1 className="text-3xl font-bold">

              Trainer Dashboard

            </h1>

            <p className="text-sm text-gray-500 mt-1">

              Operational Trainee Intelligence Monitoring

            </p>

          </div>

          <div className="flex items-center gap-4">

            <button className="bg-slate-800 p-3 rounded-xl relative">

              <Bell className="w-5 h-5" />

            </button>

            <div className="bg-slate-800 px-4 py-2 rounded-xl">

              <p className="text-sm font-semibold">

                {user?.name}

              </p>

              <p className="text-xs text-gray-500">

                Trainer

              </p>

            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
            >

              <LogOut className="w-5 h-5" />

            </button>

          </div>

        </div>

      </header>

      <div className="p-8">

        {/* KPI */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {cards.map((card, idx) => (

            <div
              key={idx}
              className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 shadow-xl`}
            >

              <card.icon className="w-8 h-8 mb-4" />

              <p className="text-sm opacity-80">

                {card.title}

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {card.value}

              </h2>

            </div>

          ))}

        </div>

        {/* FILTERS */}

        <div className="flex flex-col lg:flex-row gap-4 mb-8">

          <div className="flex-1 relative">

            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />

            <input
              type="text"
              placeholder="Search trainee..."
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/10 rounded-xl"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <select
            className="px-4 py-3 bg-slate-900 border border-white/10 rounded-xl"
            value={streamFilter}
            onChange={(e) =>
              setStreamFilter(e.target.value)
            }
          >

            <option value="">
              All Streams
            </option>

            <option value="Java">
              Java
            </option>

            <option value="Python">
              Python
            </option>

            <option value="Cloud">
              Cloud
            </option>

          </select>

          <select
            className="px-4 py-3 bg-slate-900 border border-white/10 rounded-xl"
            value={riskFilter}
            onChange={(e) =>
              setRiskFilter(e.target.value)
            }
          >

            <option value="">
              All Risks
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>

        </div>

        {/* AI INSIGHTS */}

        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 mb-8">

          <div className="flex items-center gap-3 mb-6">

            <Brain className="w-6 h-6 text-purple-400" />

            <h2 className="text-2xl font-bold">

              AI Insights

            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            {aiInsights.map(
              (insight, idx) => (

                <div
                  key={idx}
                  className="bg-slate-800 p-4 rounded-xl border border-white/5"
                >

                  <p className="text-gray-300">

                    {insight}

                  </p>

                </div>

              )
            )}

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">

          <div className="p-6 border-b border-white/10">

            <h2 className="text-xl font-bold">

              Trainee Analytics

            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-800">

                <tr className="text-left text-gray-400">

                  <th className="px-6 py-4">
                    Emp ID
                  </th>

                  <th className="px-6 py-4">
                    Name
                  </th>

                  <th className="px-6 py-4">
                    Stream
                  </th>

                  <th className="px-6 py-4">
                    Attendance
                  </th>

                  <th className="px-6 py-4">
                    Spark
                  </th>

                  <th className="px-6 py-4">
                    Project
                  </th>

                  <th className="px-6 py-4">
                    Risk
                  </th>

                  <th className="px-6 py-4">
                    Readiness
                  </th>

                </tr>

              </thead>

              <tbody>

                {paginatedTrainees.map(
                  (t, index) => (

                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5"
                    >

                      <td className="px-6 py-4">
                        {t.emp_id}
                      </td>

                      <td className="px-6 py-4 font-medium">
                        {t.name}
                      </td>

                      <td className="px-6 py-4">
                        {t.stream}
                      </td>

                      <td className="px-6 py-4 text-cyan-400 font-bold">
                        {t.attendance}%
                      </td>

                      <td className={`px-6 py-4 font-bold ${getScoreColor(t.spark_score)}`}>
                        {t.spark_score}
                      </td>

                      <td className={`px-6 py-4 font-bold ${getScoreColor(t.project_score)}`}>
                        {t.project_score}
                      </td>

                      <td className="px-6 py-4">

                        <span className={`px-3 py-1 rounded-full text-xs text-white ${getRiskColor(t.risk_level)}`}>

                          {t.risk_level}

                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-2">

                          <div className="bg-white/10 h-2 rounded-full w-24">

                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{
                                width:
                                  `${t.readiness}%`
                              }}
                            ></div>

                          </div>

                          <span className="text-xs text-gray-400">

                            {t.readiness}%

                          </span>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}

          <div className="flex justify-between items-center p-6 border-t border-white/10">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
              className="px-4 py-2 bg-slate-800 rounded-lg disabled:opacity-40"
            >

              Previous

            </button>

            <p className="text-sm text-gray-400">

              Page {currentPage} of {totalPages || 1}

            </p>

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
              className="px-4 py-2 bg-blue-600 rounded-lg disabled:opacity-40"
            >

              Next

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TrainerDashboard;