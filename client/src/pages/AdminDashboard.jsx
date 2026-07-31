import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AdminLayout from "../layouts/AdminLayout";
import DashboardCard from "../components/DashboardCard";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/complaints/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const completion =
    stats.total === 0
      ? 0
      : Math.round((stats.resolved / stats.total) * 100);

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl">

          <h1 className="text-4xl font-bold">
            CampusFlow Admin Dashboard
          </h1>

          <p className="mt-2 text-blue-100">
            Monitor, manage and resolve student complaints efficiently.
          </p>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          <DashboardCard
            title="Total Complaints"
            value={loading ? "..." : stats.total}
            color="bg-blue-600"
          />

          <DashboardCard
            title="Pending"
            value={loading ? "..." : stats.pending}
            color="bg-yellow-500"
          />

          <DashboardCard
            title="In Progress"
            value={loading ? "..." : stats.inProgress}
            color="bg-purple-600"
          />

          <DashboardCard
            title="Resolved"
            value={loading ? "..." : stats.resolved}
            color="bg-green-600"
          />

        </div>

        {/* Progress */}

        <div className="rounded-3xl bg-white p-6 shadow-lg">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Resolution Progress
            </h2>

            <span className="text-lg font-semibold text-green-600">
              {completion}%
            </span>

          </div>

          <div className="mt-5 h-4 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-green-500 transition-all duration-700"
              style={{
                width: `${completion}%`,
              }}
            />

          </div>

          <p className="mt-3 text-gray-500">
            Percentage of complaints resolved.
          </p>

        </div>
                {/* Quick Actions & Tips */}

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <h2 className="mb-5 text-2xl font-bold">
              🚀 Quick Actions
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

              <button
                onClick={() => navigate("/all-complaints")}
                className="rounded-2xl bg-blue-600 px-6 py-4 text-white transition hover:bg-blue-700"
              >
                View All Complaints
              </button>

              <button
                onClick={fetchStats}
                className="rounded-2xl bg-green-600 px-6 py-4 text-white transition hover:bg-green-700"
              >
                Refresh Dashboard
              </button>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <h2 className="mb-4 text-2xl font-bold">
              📢 Admin Tips
            </h2>

            <ul className="space-y-3 text-gray-600">

              <li>✅ Review new complaints daily.</li>

              <li>✅ Update complaint status regularly.</li>

              <li>✅ Resolve high priority complaints first.</li>

              <li>✅ Keep students informed.</li>

            </ul>

          </div>

        </div>

        {/* Complaint Summary */}

        <div className="rounded-3xl bg-white p-6 shadow-lg">

          <h2 className="mb-5 text-2xl font-bold">
            Complaint Summary
          </h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border p-5">
              <p className="text-gray-500">Total</p>
              <h3 className="mt-2 text-3xl font-bold">
                {stats.total}
              </h3>
            </div>

            <div className="rounded-2xl border p-5">
              <p className="text-yellow-600">Pending</p>
              <h3 className="mt-2 text-3xl font-bold">
                {stats.pending}
              </h3>
            </div>

            <div className="rounded-2xl border p-5">
              <p className="text-purple-600">In Progress</p>
              <h3 className="mt-2 text-3xl font-bold">
                {stats.inProgress}
              </h3>
            </div>

            <div className="rounded-2xl border p-5">
              <p className="text-green-600">Resolved</p>
              <h3 className="mt-2 text-3xl font-bold">
                {stats.resolved}
              </h3>
            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminDashboard;