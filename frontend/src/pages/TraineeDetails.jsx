import { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function TraineeDetails() {

  const { id } = useParams();

  const [trainee, setTrainee] =
    useState(null);

  useEffect(() => {

    axios.get(
      `http://127.0.0.1:8000/trainee/${id}`
    )
      .then(res => setTrainee(res.data));

  }, []);

  if (!trainee) {

    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );

  }

  const readinessData = [

    {
      name: "Readiness",
      value: trainee.readiness
    },

    {
      name: "Remaining",
      value: 100 - trainee.readiness
    }

  ];

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}

      <header className="h-20 bg-slate-900 border-b border-slate-800 flex justify-between items-center px-8">

        <h1 className="text-3xl font-bold">
          Trainee Analytics
        </h1>

        <a
          href="/dashboard"
          className="text-blue-400"
        >
          Back to Dashboard
        </a>

      </header>

      <div className="p-8">

        {/* PROFILE CARD */}

        <div className="bg-slate-900 p-8 rounded-3xl mb-8">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-4xl font-bold mb-3">
                {trainee.name}
              </h2>

              <p className="text-slate-400">
                Stream: {trainee.stream}
              </p>

            </div>

            <div>

              <span
                className={`px-5 py-2 rounded-full text-lg ${
                  trainee.risk_level === "High"
                    ? "bg-red-500"
                    : trainee.risk_level === "Medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >

                {trainee.risk_level} Risk

              </span>

            </div>

          </div>

        </div>

        {/* KPI SECTION */}

        <div className="grid grid-cols-3 gap-6 mb-8">

          <div className="bg-blue-600 p-6 rounded-2xl">

            <h2 className="text-xl">
              Avg Score
            </h2>

            <p className="text-5xl mt-4 font-bold">
              {trainee.spark_score}
            </p>

          </div>

          <div className="bg-green-600 p-6 rounded-2xl">

            <h2 className="text-xl">
              Readiness
            </h2>

            <p className="text-5xl mt-4 font-bold">
              {trainee.readiness}%
            </p>

          </div>

          <div className="bg-purple-600 p-6 rounded-2xl">

            <h2 className="text-xl">
              Deployment Status
            </h2>

            <p className="text-3xl mt-6 font-bold">
              {trainee.readiness >= 75
                ? "Ready"
                : "Needs Training"}
            </p>

          </div>

        </div>

        {/* CHART + INSIGHTS */}

        <div className="grid grid-cols-2 gap-6 mb-8">

          {/* READINESS CHART */}

          <div className="bg-slate-900 p-6 rounded-3xl">

            <h2 className="text-2xl font-bold mb-6">
              Readiness Analysis
            </h2>

            <div className="h-[300px]">

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={readinessData}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >

                    <Cell fill="#22c55e" />

                    <Cell fill="#1e293b" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* AI INSIGHTS */}

          <div className="bg-slate-900 p-6 rounded-3xl">

            <h2 className="text-2xl font-bold mb-6">
              AI Insight
            </h2>

            <div className="bg-slate-800 p-6 rounded-2xl">

              {trainee.insight}

            </div>

            <h2 className="text-2xl font-bold mt-8 mb-6">
              Recommendation
            </h2>

            <div className="bg-slate-800 p-6 rounded-2xl">

              {trainee.recommendation}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TraineeDetails;