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

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Target,
  Brain,
  Activity,
  Zap,
  Bell,
  LogOut,
  BarChart3,
  PieChart as PieChartIcon,
  X,
  CheckCircle,
  Clock,
  AlertCircle
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

function ManagerDashboard() {
  const [trainees, setTrainees] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchData();
    // Initialize with some dummy notifications
    initializeNotifications();
  }, []);

  useEffect(() => {
    // Update unread count whenever notifications change
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://mavx-production.up.railway.app/trainees");
      setTrainees(res.data);
      // Generate notifications based on fetched data
      generateNotificationsFromData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const initializeNotifications = () => {
    const initialNotifications = [
      {
        id: 1,
        title: "Welcome to Dashboard",
        message: "You have successfully logged in as Manager",
        time: new Date().toISOString(),
        read: false,
        type: "success",
        priority: "medium"
      },
      {
        id: 2,
        title: "Weekly Report Ready",
        message: "This week's training performance report is now available",
        time: new Date(Date.now() - 3600000).toISOString(),
        read: false,
        type: "info",
        priority: "low"
      }
    ];
    setNotifications(initialNotifications);
  };

  const generateNotificationsFromData = (traineesData) => {
    const newNotifications = [];
    const currentTime = new Date();
    
    // Risk-based notifications
    const highRiskTrainees = traineesData.filter(t => t.risk_level === "High");
    if (highRiskTrainees.length > 0) {
      newNotifications.push({
        id: Date.now() + 1,
        title: "⚠️ High Risk Alert",
        message: `${highRiskTrainees.length} trainee(s) are at high risk. Immediate attention required: ${highRiskTrainees.map(t => t.name).join(", ")}`,
        time: currentTime.toISOString(),
        read: false,
        type: "urgent",
        priority: "high"
      });
    }
    
    // Deployment ready notifications
    const readyTrainees = traineesData.filter(t => t.readiness >= 75);
    if (readyTrainees.length > 0) {
      newNotifications.push({
        id: Date.now() + 2,
        title: "✅ Deployment Ready",
        message: `${readyTrainees.length} trainee(s) are ready for deployment: ${readyTrainees.map(t => t.name).join(", ")}`,
        time: currentTime.toISOString(),
        read: false,
        type: "success",
        priority: "medium"
      });
    }
    
    // Top performer notification
    if (traineesData.length > 0) {
      const topPerformer = [...traineesData].sort((a, b) => b.spark_score - a.spark_score)[0];
      newNotifications.push({
        id: Date.now() + 3,
        title: "🏆 Top Performer Update",
        message: `${topPerformer.name} is the current top performer with ${topPerformer.spark_score}% score in ${topPerformer.stream} stream`,
        time: currentTime.toISOString(),
        read: false,
        type: "info",
        priority: "medium"
      });
    }
    
    // Low performer alert
    const lowPerformer = [...traineesData].sort((a, b) => a.spark_score - b.spark_score)[0];
    if (lowPerformer && lowPerformer.spark_score < 50) {
      newNotifications.push({
        id: Date.now() + 4,
        title: "📉 Performance Alert",
        message: `${lowPerformer.name} needs immediate attention with ${lowPerformer.spark_score}% score. Consider intervention.`,
        time: currentTime.toISOString(),
        read: false,
        type: "warning",
        priority: "high"
      });
    }
    
    // Stream performance insights
    const streamCounts = {
      Java: traineesData.filter(t => t.stream === "Java").length,
      Python: traineesData.filter(t => t.stream === "Python").length,
      Cloud: traineesData.filter(t => t.stream === "Cloud").length
    };
    const topStream = Object.entries(streamCounts).sort((a, b) => b[1] - a[1])[0];
    newNotifications.push({
      id: Date.now() + 5,
      title: "📊 Stream Distribution",
      message: `${topStream[0]} stream has the highest number of trainees (${topStream[1]} trainees)`,
      time: currentTime.toISOString(),
      read: false,
      type: "info",
      priority: "low"
    });
    
    setNotifications(prev => [...prev, ...newNotifications]);
  };

  const addDummyNotification = () => {
    const dummyNotifications = [
      {
        title: "System Maintenance",
        message: "System will undergo maintenance on Sunday from 2 AM to 4 AM",
        type: "warning"
      },
      {
        title: "New Feature Released",
        message: "AI-powered performance prediction is now available",
        type: "success"
      },
      {
        title: "Meeting Reminder",
        message: "Manager's weekly sync meeting in 30 minutes",
        type: "info"
      },
      {
        title: "Data Sync Complete",
        message: "All trainee data has been synchronized successfully",
        type: "success"
      },
      {
        title: "Performance Spike",
        message: "Overall trainee performance has increased by 15% this week",
        type: "info"
      }
    ];
    
    const randomNotif = dummyNotifications[Math.floor(Math.random() * dummyNotifications.length)];
    const newNotification = {
      id: Date.now(),
      title: randomNotif.title,
      message: randomNotif.message,
      time: new Date().toISOString(),
      read: false,
      type: randomNotif.type,
      priority: Math.random() > 0.7 ? "high" : "medium"
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "warning":
      case "urgent":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case "info":
        return <Clock className="w-5 h-5 text-blue-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === "high") return "border-l-4 border-red-500";
    if (type === "urgent") return "border-l-4 border-red-500";
    if (type === "warning") return "border-l-4 border-yellow-500";
    if (type === "success") return "border-l-4 border-green-500";
    return "border-l-4 border-blue-500";
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
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
            {/* NOTIFICATION BUTTON WITH DROPDOWN */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="bg-slate-800 p-3 rounded-xl relative hover:bg-slate-700 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* NOTIFICATION DROPDOWN */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-slate-800 rounded-xl shadow-2xl border border-white/10 z-50 overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h3 className="font-bold text-lg">Notifications</h3>
                    <div className="flex gap-2">
                      {notifications.length > 0 && (
                        <>
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-400 hover:text-blue-300"
                          >
                            Mark all read
                          </button>
                          <button
                            onClick={clearAllNotifications}
                            className="text-xs text-red-400 hover:text-red-300"
                          >
                            Clear all
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-400">
                        <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No notifications</p>
                        <p className="text-sm mt-1">You're all caught up!</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-white/10 hover:bg-slate-700/50 transition-colors cursor-pointer ${getNotificationColor(notif.type, notif.priority)} ${notif.read ? 'opacity-60' : ''}`}
                          onClick={() => markAsRead(notif.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notif.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <h4 className="font-semibold text-sm">{notif.title}</h4>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notif.id);
                                  }}
                                  className="text-gray-500 hover:text-gray-300 ml-2"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-sm text-gray-300 mt-1">{notif.message}</p>
                              <p className="text-xs text-gray-500 mt-2">{formatTime(notif.time)}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {/* Add dummy notification button */}
                  <div className="p-3 border-t border-white/10 bg-slate-900">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addDummyNotification();
                      }}
                      className="w-full text-center text-sm text-blue-400 hover:text-blue-300 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      + Add Test Notification
                    </button>
                  </div>
                </div>
              )}
            </div>

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
                      <td className="text-green-400 font-bold">{t.spark_score}%</td>
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
                      <td className="text-red-400 font-bold">{t.spark_score}%</td>
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

export default ManagerDashboard;