import { useEffect, useState } from "react";

import axios from "axios";

import {
  Users,
  TrendingUp,
  AlertTriangle,
  Target,
  Brain,
  Activity,
  Award,
  Upload,
  Bell,
  LogOut,
  Shield,
  Database,
  Zap,
  FileSpreadsheet,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

function AdminDashboard() {

  const [trainees, setTrainees] =
    useState([]);

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
  // KPI CALCULATIONS
  // =========================

  const totalTrainees =
    trainees.length;

  const avgScore =
    totalTrainees > 0
      ? (
          trainees.reduce(
            (sum, t) =>
              sum + (t.spark_score || 0),
            0
          ) / totalTrainees
        ).toFixed(1)
      : 0;

  const avgReadiness =
    totalTrainees > 0
      ? (
          trainees.reduce(
            (sum, t) =>
              sum + (t.readiness || 0),
            0
          ) / totalTrainees
        ).toFixed(1)
      : 0;

  const highRisk =
    trainees.filter(
      (t) => t.risk_level === "High"
    ).length;

  const deploymentReady =
    trainees.filter(
      (t) => t.readiness >= 75
    ).length;

  const avgAttendance =
    totalTrainees > 0
      ? (
          trainees.reduce(
            (sum, t) =>
              sum + (t.attendance || 0),
            0
          ) / totalTrainees
        ).toFixed(1)
      : 0;

  // =========================
  // CHART DATA
  // =========================

  const riskData = [

    {
      name: "High",
      value: trainees.filter(
        (t) => t.risk_level === "High"
      ).length,
      color: "#ef4444"
    },

    {
      name: "Medium",
      value: trainees.filter(
        (t) => t.risk_level === "Medium"
      ).length,
      color: "#facc15"
    },

    {
      name: "Low",
      value: trainees.filter(
        (t) => t.risk_level === "Low"
      ).length,
      color: "#22c55e"
    },
  ];

  const streamData = [

    {
      stream: "Java",
      count: trainees.filter(
        (t) => t.stream === "Java"
      ).length
    },

    {
      stream: "Python",
      count: trainees.filter(
        (t) => t.stream === "Python"
      ).length
    },

    {
      stream: "Cloud",
      count: trainees.filter(
        (t) => t.stream === "Cloud"
      ).length
    },
  ];

  // =========================
  // AI INSIGHTS
  // =========================

  const aiInsights = [

    `${highRisk} trainees currently require intervention.`,

    `${deploymentReady} trainees are deployment ready.`,

    `Average attendance is ${avgAttendance}%.`,

    `Overall readiness improved to ${avgReadiness}%.`,

    "AI engine monitoring all streams successfully.",

    "System analytics indicate stable training progression."
  ];

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.clear();

    window.location.href = "/";
  };

  // =========================
  // UPLOAD NAVIGATION
  // =========================

  const goToUpload = () => {

    window.location.href =
      "/upload";
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
      title: "Attendance",
      value: avgAttendance + "%",
      icon: Activity,
      color:
        "from-cyan-600 to-cyan-500"
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

    {
      title: "Deployment Ready",
      value: deploymentReady,
      icon: Zap,
      color:
        "from-orange-600 to-orange-500"
    },
  ];

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}

      <header className="sticky top-0 z-30 bg-slate-900 border-b border-white/10">

        <div className="flex items-center justify-between px-8 h-20">

          <div>

            <h1 className="text-3xl font-bold">

              Admin Dashboard

            </h1>

            <p className="text-sm text-gray-500 mt-1">

              Enterprise AI Training Control Center

            </p>

          </div>

          <div className="flex items-center gap-4">

            <button className="bg-slate-800 p-3 rounded-xl relative">

              <Bell className="w-5 h-5" />

              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>

            </button>

            <div className="bg-slate-800 px-4 py-2 rounded-xl">

              <p className="text-sm font-semibold">

                {user?.name}

              </p>

              <p className="text-xs text-gray-500">

                Administrator

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

        {/* QUICK ACTIONS */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <button
            onClick={goToUpload}
            className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 rounded-2xl text-left shadow-xl hover:scale-[1.02] transition-all"
          >

            <Upload className="w-10 h-10 mb-4" />

            <h2 className="text-2xl font-bold mb-2">

              Upload Data

            </h2>

            <p className="text-sm opacity-80">

              Upload trainee excel datasets

            </p>

          </button>

          <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6 rounded-2xl shadow-xl">

            <Database className="w-10 h-10 mb-4" />

            <h2 className="text-2xl font-bold mb-2">

              AI Engine

            </h2>

            <p className="text-sm opacity-80">

              Risk & readiness engine active

            </p>

          </div>

          <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-2xl shadow-xl">

            <Shield className="w-10 h-10 mb-4" />

            <h2 className="text-2xl font-bold mb-2">

              System Status

            </h2>

            <p className="text-sm opacity-80">

              Platform running normally

            </p>

          </div>

        </div>

        {/* KPI */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

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

        {/* CHARTS */}

        <div className="grid lg:grid-cols-2 gap-8 mb-8">

          {/* RISK */}

          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">

              Risk Distribution

            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={riskData}
                  dataKey="value"
                  outerRadius={100}
                >

                  {riskData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={entry.color}
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* STREAM */}

          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">

              Stream Analytics

            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart data={streamData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />

                <XAxis dataKey="stream" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* AI INSIGHTS */}

        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">

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

      </div>

    </div>
  );
}

export default AdminDashboard;