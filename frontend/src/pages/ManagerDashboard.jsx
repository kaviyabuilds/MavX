// import { useEffect, useState } from "react";

// import axios from "axios";

// import {
//   Users,
//   TrendingUp,
//   AlertTriangle,
//   Target,
//   Brain,
//   Activity,
//   Zap,
//   Bell,
//   LogOut,
//   BarChart3,
//   PieChart as PieChartIcon
// } from "lucide-react";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend
// } from "recharts";

// function ManagerDashboard() {

//   const [trainees, setTrainees] =
//     useState([]);

//   const user =
//     JSON.parse(
//       localStorage.getItem("user")
//     );

//   useEffect(() => {

//     fetchData();

//   }, []);

//   const fetchData = async () => {

//     try {

//       const res = await axios.get(
//         "https://mavx-production.up.railway.app/trainees"
//       );

//       setTrainees(res.data);

//     } catch (err) {

//       console.error(err);
//     }
//   };

//   // =========================
//   // KPI CALCULATIONS
//   // =========================

//   const totalTrainees =
//     trainees.length;

//   const avgScore =
//     totalTrainees > 0
//       ? (
//           trainees.reduce(
//             (sum, t) =>
//               sum + (t.spark_score || 0),
//             0
//           ) / totalTrainees
//         ).toFixed(1)
//       : 0;

//   const avgReadiness =
//     totalTrainees > 0
//       ? (
//           trainees.reduce(
//             (sum, t) =>
//               sum + (t.readiness || 0),
//             0
//           ) / totalTrainees
//         ).toFixed(1)
//       : 0;

//   const highRisk =
//     trainees.filter(
//       (t) => t.risk_level === "High"
//     ).length;

//   const deploymentReady =
//     trainees.filter(
//       (t) => t.readiness >= 75
//     ).length;

// {/* PERFORMANCE OVERVIEW */}

// <div className="grid lg:grid-cols-2 gap-8 mb-8">

//   <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">

//     <h2 className="text-xl font-bold mb-4">
//       🏆 Top Performer
//     </h2>

//     <h3 className="text-3xl font-bold text-green-400">
//       {
//         [...trainees].sort(
//           (a, b) =>
//             b.spark_score - a.spark_score
//         )[0]?.name || "N/A"
//       }
//     </h3>

//     <p className="text-gray-400 mt-2">
//       Stream: {
//         [...trainees].sort(
//           (a, b) =>
//             b.spark_score - a.spark_score
//         )[0]?.stream
//       }
//     </p>

//     <p className="text-5xl font-bold mt-4">
//       {
//         [...trainees].sort(
//           (a, b) =>
//             b.spark_score - a.spark_score
//         )[0]?.spark_score
//       }
//       %
//     </p>

//   </div>

//   <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">

//     <h2 className="text-xl font-bold mb-4">
//       ⚠ Needs Attention
//     </h2>

//     <h3 className="text-3xl font-bold text-red-400">
//       {
//         [...trainees].sort(
//           (a, b) =>
//             a.spark_score - b.spark_score
//         )[0]?.name || "N/A"
//       }
//     </h3>

//     <p className="text-gray-400 mt-2">
//       Stream: {
//         [...trainees].sort(
//           (a, b) =>
//             a.spark_score - b.spark_score
//         )[0]?.stream
//       }
//     </p>

//     <p className="text-5xl font-bold mt-4">
//       {
//         [...trainees].sort(
//           (a, b) =>
//             a.spark_score - b.spark_score
//         )[0]?.spark_score
//       }
//       %
//     </p>

//   </div>

// </div> 


//   // =========================
//   // CHART DATA
//   // =========================

//   const riskData = [

//     {
//       name: "High",
//       value: trainees.filter(
//         (t) => t.risk_level === "High"
//       ).length,
//       color: "#ef4444"
//     },

//     {
//       name: "Medium",
//       value: trainees.filter(
//         (t) => t.risk_level === "Medium"
//       ).length,
//       color: "#facc15"
//     },

//     {
//       name: "Low",
//       value: trainees.filter(
//         (t) => t.risk_level === "Low"
//       ).length,
//       color: "#22c55e"
//     },
//   ];

//   const streamData = [

//     {
//       stream: "Java",
//       count: trainees.filter(
//         (t) => t.stream === "Java"
//       ).length
//     },

//     {
//       stream: "Python",
//       count: trainees.filter(
//         (t) => t.stream === "Python"
//       ).length
//     },

//     {
//       stream: "Cloud",
//       count: trainees.filter(
//         (t) => t.stream === "Cloud"
//       ).length
//     },
//   ];

// {/* TOP & BOTTOM PERFORMERS */}

// <div className="grid lg:grid-cols-2 gap-8 mb-8">

//   <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">

//     <h2 className="text-xl font-bold mb-6">
//       🥇 Top 5 Toppers
//     </h2>

//     <table className="w-full">

//       <thead>

//         <tr className="text-left text-gray-400">

//           <th>Rank</th>
//           <th>Name</th>
//           <th>Score</th>

//         </tr>

//       </thead>

//       <tbody>

//         {
//           [...trainees]
//             .sort(
//               (a, b) =>
//                 b.spark_score - a.spark_score
//             )
//             .slice(0, 5)
//             .map((t, index) => (

//               <tr
//                 key={index}
//                 className="border-t border-white/10"
//               >

//                 <td className="py-3">
//                   #{index + 1}
//                 </td>

//                 <td>
//                   {t.name}
//                 </td>

//                 <td className="text-green-400 font-bold">
//                   {t.spark_score}
//                 </td>

//               </tr>

//             ))
//         }

//       </tbody>

//     </table>

//   </div>

//   <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">

//     <h2 className="text-xl font-bold mb-6">
//       📉 Bottom 5 Performers
//     </h2>

//     <table className="w-full">

//       <thead>

//         <tr className="text-left text-gray-400">

//           <th>Rank</th>
//           <th>Name</th>
//           <th>Score</th>

//         </tr>

//       </thead>

//       <tbody>

//         {
//           [...trainees]
//             .sort(
//               (a, b) =>
//                 a.spark_score - b.spark_score
//             )
//             .slice(0, 5)
//             .map((t, index) => (

//               <tr
//                 key={index}
//                 className="border-t border-white/10"
//               >

//                 <td className="py-3">
//                   #{index + 1}
//                 </td>

//                 <td>
//                   {t.name}
//                 </td>

//                 <td className="text-red-400 font-bold">
//                   {t.spark_score}
//                 </td>

//               </tr>

//             ))
//         }

//       </tbody>

//     </table>

//   </div>

// </div>

//   // =========================
//   // AI INSIGHTS
//   // =========================

// const sortedTrainees =
//   [...trainees].sort(
//     (a, b) =>
//       b.spark_score - a.spark_score
//   );

// const aiInsights = [

//   `${deploymentReady} trainees are deployment ready.`,

//   `${highRisk} trainees require immediate intervention.`,

//   `Top performer is ${
//     sortedTrainees[0]?.name || "N/A"
//   } with score ${
//     sortedTrainees[0]?.spark_score || 0
//   }%.`,

//   `Average readiness stands at ${avgReadiness}%.`,

//   `Overall training progression remains stable across streams.`
// ];

//   // =========================
//   // LOGOUT
//   // =========================

//   const handleLogout = () => {

//     localStorage.clear();

//     window.location.href = "/";
//   };

//   // =========================
//   // KPI CARDS
//   // =========================

//   const cards = [

//     {
//       title: "Total Trainees",
//       value: totalTrainees,
//       icon: Users,
//       color:
//         "from-blue-600 to-blue-500"
//     },

//     {
//       title: "Average Score",
//       value: avgScore + "%",
//       icon: TrendingUp,
//       color:
//         "from-purple-600 to-purple-500"
//     },

//     {
//       title: "High Risk",
//       value: highRisk,
//       icon: AlertTriangle,
//       color:
//         "from-red-600 to-red-500"
//     },

//     {
//       title: "Readiness",
//       value: avgReadiness + "%",
//       icon: Target,
//       color:
//         "from-green-600 to-green-500"
//     },

//     {
//       title: "Deployment Ready",
//       value: deploymentReady,
//       icon: Zap,
//       color:
//         "from-orange-600 to-orange-500"
//     },
//   ];

//   return (

//     <div className="min-h-screen bg-slate-950 text-white">

//       {/* HEADER */}

//       <header className="sticky top-0 z-30 bg-slate-900 border-b border-white/10">

//         <div className="flex items-center justify-between px-8 h-20">

//           <div>

//             <h1 className="text-3xl font-bold">

//               Manager Dashboard

//             </h1>

//             <p className="text-sm text-gray-500 mt-1">

//               Executive Training Intelligence Overview

//             </p>

//           </div>

//           <div className="flex items-center gap-4">

//             <button className="bg-slate-800 p-3 rounded-xl relative">

//               <Bell className="w-5 h-5" />

//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>

//             </button>

//             <div className="bg-slate-800 px-4 py-2 rounded-xl">

//               <p className="text-sm font-semibold">

//                 {user?.name}

//               </p>

//               <p className="text-xs text-gray-500">

//                 Manager

//               </p>

//             </div>

//             <button
//               onClick={handleLogout}
//               className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
//             >

//               <LogOut className="w-5 h-5" />

//             </button>

//           </div>

//         </div>

//       </header>

//       <div className="p-8">

//         {/* KPI */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">

//           {cards.map((card, idx) => (

//             <div
//               key={idx}
//               className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 shadow-xl`}
//             >

//               <card.icon className="w-8 h-8 mb-4" />

//               <p className="text-sm opacity-80">

//                 {card.title}

//               </p>

//               <h2 className="text-3xl font-bold mt-2">

//                 {card.value}

//               </h2>

//             </div>

//           ))}

//         </div>

//         {/* CHARTS */}

//         <div className="grid lg:grid-cols-2 gap-8 mb-8">

//           {/* RISK PIE */}

//           <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">

//             <div className="flex items-center gap-3 mb-6">

//               <PieChartIcon className="w-6 h-6 text-blue-400" />

//               <h2 className="text-xl font-bold">

//                 Risk Distribution

//               </h2>

//             </div>

//             <ResponsiveContainer
//               width="100%"
//               height={300}
//             >

//               <PieChart>

//                 <Pie
//                   data={riskData}
//                   dataKey="value"
//                   nameKey="name"
//                   outerRadius={100}
//                 >

//                   {riskData.map(
//                     (entry, index) => (

//                       <Cell
//                         key={index}
//                         fill={entry.color}
//                       />

//                     )
//                   )}

//                 </Pie>

//                 <Tooltip />

//               </PieChart>

//             </ResponsiveContainer>

//           </div>

//           {/* STREAM BAR */}

//           <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">

//             <div className="flex items-center gap-3 mb-6">

//               <BarChart3 className="w-6 h-6 text-purple-400" />

//               <h2 className="text-xl font-bold">

//                 Stream Distribution

//               </h2>

//             </div>

//             <ResponsiveContainer
//               width="100%"
//               height={300}
//             >

//               <BarChart data={streamData}>

//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="#334155"
//                 />

//                 <XAxis dataKey="stream" />

//                 <YAxis />

//                 <Tooltip />

//                 <Legend />

//                 <Bar
//                   dataKey="count"
//                   fill="#3b82f6"
//                   radius={[10, 10, 0, 0]}
//                 />

//               </BarChart>

//             </ResponsiveContainer>

//           </div>

//         </div>

//         {/* AI INSIGHTS */}

//         <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">

//           <div className="flex items-center gap-3 mb-6">

//             <Brain className="w-6 h-6 text-purple-400" />

//             <h2 className="text-2xl font-bold">

//               AI Insights

//             </h2>

//           </div>

//           <div className="grid md:grid-cols-2 gap-4">

//             {aiInsights.map(
//               (insight, idx) => (

//                 <div
//                   key={idx}
//                   className="bg-slate-800 p-4 rounded-xl border border-white/5"
//                 >

//                   <p className="text-gray-300">

//                     {insight}

//                   </p>

//                 </div>

//               )
//             )}

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default ManagerDashboard;

function ManagerDashboard() {
  const [trainees, setTrainees] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://mavx-production.up.railway.app/trainees");
      setTrainees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // KPI CALCULATIONS
  // =========================
  const totalTrainees = trainees.length;
  const avgScore = totalTrainees > 0
    ? (trainees.reduce((sum, t) => sum + (t.spark_score || 0), 0) / totalTrainees).toFixed(1)
    : 0;
  const avgReadiness = totalTrainees > 0
    ? (trainees.reduce((sum, t) => sum + (t.readiness || 0), 0) / totalTrainees).toFixed(1)
    : 0;
  const highRisk = trainees.filter((t) => t.risk_level === "High").length;
  const deploymentReady = trainees.filter((t) => t.readiness >= 75).length;

  // =========================
  // CHART DATA
  // =========================
  const riskData = [
    { name: "High", value: trainees.filter((t) => t.risk_level === "High").length, color: "#ef4444" },
    { name: "Medium", value: trainees.filter((t) => t.risk_level === "Medium").length, color: "#facc15" },
    { name: "Low", value: trainees.filter((t) => t.risk_level === "Low").length, color: "#22c55e" },
  ];

  const streamData = [
    { stream: "Java", count: trainees.filter((t) => t.stream === "Java").length },
    { stream: "Python", count: trainees.filter((t) => t.stream === "Python").length },
    { stream: "Cloud", count: trainees.filter((t) => t.stream === "Cloud").length },
  ];

  // =========================
  // AI INSIGHTS
  // =========================
  const sortedTrainees = [...trainees].sort((a, b) => b.spark_score - a.spark_score);
  const aiInsights = [
    `${deploymentReady} trainees are deployment ready.`,
    `${highRisk} trainees require immediate intervention.`,
    `Top performer is ${sortedTrainees[0]?.name || "N/A"} with score ${sortedTrainees[0]?.spark_score || 0}%.`,
    `Average readiness stands at ${avgReadiness}%.`,
    `Overall training progression remains stable across streams.`
  ];

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // =========================
  // KPI CARDS
  // =========================
  const cards = [
    { title: "Total Trainees", value: totalTrainees, icon: Users, color: "from-blue-600 to-blue-500" },
    { title: "Average Score", value: avgScore + "%", icon: TrendingUp, color: "from-purple-600 to-purple-500" },
    { title: "High Risk", value: highRisk, icon: AlertTriangle, color: "from-red-600 to-red-500" },
    { title: "Readiness", value: avgReadiness + "%", icon: Target, color: "from-green-600 to-green-500" },
    { title: "Deployment Ready", value: deploymentReady, icon: Zap, color: "from-orange-600 to-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-slate-900 border-b border-white/10">
        <div className="flex items-center justify-between px-8 h-20">
          <div>
            <h1 className="text-3xl font-bold">Manager Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Executive Training Intelligence Overview</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-slate-800 p-3 rounded-xl relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="bg-slate-800 px-4 py-2 rounded-xl">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-gray-500">Manager</p>
            </div>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {cards.map((card, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 shadow-xl`}>
              <card.icon className="w-8 h-8 mb-4" />
              <p className="text-sm opacity-80">{card.title}</p>
              <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
            </div>
          ))}
        </div>

        {/* PERFORMANCE OVERVIEW */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">🏆 Top Performer</h2>
            <h3 className="text-3xl font-bold text-green-400">
              {[...trainees].sort((a, b) => b.spark_score - a.spark_score)[0]?.name || "N/A"}
            </h3>
            <p className="text-gray-400 mt-2">
              Stream: {[...trainees].sort((a, b) => b.spark_score - a.spark_score)[0]?.stream}
            </p>
            <p className="text-5xl font-bold mt-4">
              {[...trainees].sort((a, b) => b.spark_score - a.spark_score)[0]?.spark_score}%
            </p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">⚠ Needs Attention</h2>
            <h3 className="text-3xl font-bold text-red-400">
              {[...trainees].sort((a, b) => a.spark_score - b.spark_score)[0]?.name || "N/A"}
            </h3>
            <p className="text-gray-400 mt-2">
              Stream: {[...trainees].sort((a, b) => a.spark_score - b.spark_score)[0]?.stream}
            </p>
            <p className="text-5xl font-bold mt-4">
              {[...trainees].sort((a, b) => a.spark_score - b.spark_score)[0]?.spark_score}%
            </p>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* RISK PIE */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <PieChartIcon className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold">Risk Distribution</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={riskData} dataKey="value" nameKey="name" outerRadius={100}>
                  {riskData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* STREAM BAR */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold">Stream Distribution</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={streamData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="stream" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#3b82f6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP & BOTTOM PERFORMERS */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">🥇 Top 5 Toppers</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400">
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {[...trainees]
                  .sort((a, b) => b.spark_score - a.spark_score)
                  .slice(0, 5)
                  .map((t, index) => (
                    <tr key={index} className="border-t border-white/10">
                      <td className="py-3">#{index + 1}</td>
                      <td>{t.name}</td>
                      <td className="text-green-400 font-bold">{t.spark_score}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">📉 Bottom 5 Performers</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400">
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {[...trainees]
                  .sort((a, b) => a.spark_score - b.spark_score)
                  .slice(0, 5)
                  .map((t, index) => (
                    <tr key={index} className="border-t border-white/10">
                      <td className="py-3">#{index + 1}</td>
                      <td>{t.name}</td>
                      <td className="text-red-400 font-bold">{t.spark_score}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI INSIGHTS */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">AI Insights</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {aiInsights.map((insight, idx) => (
              <div key={idx} className="bg-slate-800 p-4 rounded-xl border border-white/5">
                <p className="text-gray-300">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}