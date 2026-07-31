import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import StudentLayout from "../layouts/StudentLayout";
import DashboardCard from "../components/DashboardCard";
import StatusBadge from "../components/StatusBadge";

function StudentDashboard() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get(
        "/complaints/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const total = complaints.length;

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const progress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const chartData = [
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "In Progress",
      value: progress,
    },
    {
      name: "Resolved",
      value: resolved,
    },
  ];

  const COLORS = [
    "#facc15",
    "#8b5cf6",
    "#22c55e",
  ];

  return (
    <StudentLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl">

          <h1 className="text-4xl font-bold">
            👋 Welcome, {user?.name}
          </h1>

          <p className="mt-2 text-blue-100">
            Track and manage your complaints easily.
          </p>

        </div>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          <DashboardCard
            title="Total"
            value={loading ? "..." : total}
            color="bg-blue-600"
          />

          <DashboardCard
            title="Pending"
            value={loading ? "..." : pending}
            color="bg-yellow-500"
          />

          <DashboardCard
            title="In Progress"
            value={loading ? "..." : progress}
            color="bg-purple-600"
          />

          <DashboardCard
            title="Resolved"
            value={loading ? "..." : resolved}
            color="bg-green-600"
          />

        </div>

        {/* Charts */}

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <h2 className="mb-5 text-2xl font-bold">
              Complaint Status
            </h2>

            <div style={{ width: "100%", height: 320 }}>

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >

                    {chartData.map((item, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <h2 className="mb-5 text-2xl font-bold">
              Complaint Overview
            </h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <BarChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                  radius={[10,10,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Latest Complaints */}

        <div className="rounded-3xl bg-white shadow-lg">

          <div className="flex items-center justify-between border-b p-6">

            <h2 className="text-2xl font-bold">
              Latest Complaints
            </h2>

            <button
              onClick={() =>
                navigate("/raise-complaint")
              }
              className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              + Raise Complaint
            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="p-4 text-left">
                    Complaint
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Date
                  </th>

                </tr>

              </thead>

                             
              <tbody>{loading ? (

                  <tr>

                    <td
                      colSpan="3"
                      className="py-10 text-center text-gray-500"
                    >
                      Loading complaints...
                    </td>

                  </tr>

                ) : complaints.length === 0 ? (

                  <tr>

                    <td
                      colSpan="3"
                      className="py-10 text-center text-gray-500"
                    >
                      No complaints found.
                    </td>

                  </tr>

                ) : (

                  complaints
                    .slice(0, 5)
                    .map((item) => (

                      <tr
                        key={item._id}
                        className="border-b transition hover:bg-slate-50"
                      >

                        <td className="p-4 font-medium">
                          {item.title}
                        </td>

                        <td className="p-4">
                          <StatusBadge
                            status={item.status}
                          />
                        </td>

                        <td className="p-4">
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString()}
                        </td>

                      </tr>

                    ))

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* Progress */}

        <div className="rounded-3xl bg-white p-6 shadow-lg">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Resolution Progress
            </h2>

            <span className="text-lg font-semibold text-green-600">
              {total === 0
                ? 0
                : Math.round(
                    (resolved / total) * 100
                  )}
              %
            </span>

          </div>

          <div className="mt-5 h-4 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-green-500 transition-all duration-700"
              style={{
                width: `${
                  total === 0
                    ? 0
                    : (resolved / total) * 100
                }%`,
              }}
            />

          </div>

        </div>

        {/* Quick Actions */}

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <h2 className="mb-5 text-2xl font-bold">
              🚀 Quick Actions
            </h2>

            <div className="flex flex-wrap gap-4">

              <button
                onClick={() =>
                  navigate("/raise-complaint")
                }
                className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
              >
                Raise Complaint
              </button>

              <button
                onClick={() =>
                  navigate("/my-complaints")
                }
                className="rounded-xl bg-slate-900 px-6 py-3 text-white hover:bg-black"
              >
                My Complaints
              </button>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <h2 className="mb-5 text-2xl font-bold">
              📢 Tips
            </h2>

            <ul className="space-y-3 text-gray-600">

              <li>
                ✅ Add a meaningful complaint title.
              </li>

              <li>
                ✅ Mention the exact location.
              </li>

              <li>
                ✅ Upload an image whenever possible.
              </li>

              <li>
                ✅ Check your complaint status regularly.
              </li>

            </ul>

          </div>

        </div>

      </div>

    </StudentLayout>
  );
}

export default StudentDashboard;
              