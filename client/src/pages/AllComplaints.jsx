import { useEffect, useMemo, useState } from "react";
import { Search, RefreshCw, Filter } from "lucide-react";
import { toast } from "react-hot-toast";
import API from "../services/api";
import AdminLayout from "../layouts/AdminLayout";
import StatusBadge from "../components/StatusBadge";

function AllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await API.get("/complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComplaints(data);
    } catch (err) {
      console.log(err);
      toast.error("Unable to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    const ok = window.confirm(
      "Change complaint status?"
    );

    if (!ok) return;

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/complaints/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status Updated");

      fetchComplaints();
    } catch (err) {
      console.log(err);
      toast.error("Status Update Failed");
    }
  };

  const filtered = useMemo(() => {
    return complaints.filter((item) => {
      const query = search.toLowerCase();

      const matchSearch =
        item.title?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.student?.name?.toLowerCase().includes(query);

      const matchFilter =
        filter === "All" ||
        item.status === filter;

      return matchSearch && matchFilter;
    });
  }, [complaints, search, filter]);

  return (
    <AdminLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-8 text-white shadow-xl">

          <h1 className="text-4xl font-bold">
            Complaint Management
          </h1>

          <p className="mt-2 text-slate-300">
            Manage, filter and update every student complaint.
          </p>

        </div>

        {/* Top Cards */}

        <div className="grid gap-6 md:grid-cols-4">

          <div className="rounded-3xl bg-blue-600 p-6 text-white">

            <p>Total Complaints</p>

            <h2 className="mt-3 text-4xl font-bold">
              {complaints.length}
            </h2>

          </div>

          <div className="rounded-3xl bg-yellow-500 p-6 text-white">

            <p>Pending</p>

            <h2 className="mt-3 text-4xl font-bold">
              {
                complaints.filter(
                  (c) => c.status === "Pending"
                ).length
              }
            </h2>

          </div>

          <div className="rounded-3xl bg-purple-600 p-6 text-white">

            <p>In Progress</p>

            <h2 className="mt-3 text-4xl font-bold">
              {
                complaints.filter(
                  (c) =>
                    c.status ===
                    "In Progress"
                ).length
              }
            </h2>

          </div>

          <div className="rounded-3xl bg-green-600 p-6 text-white">

            <p>Resolved</p>

            <h2 className="mt-3 text-4xl font-bold">
              {
                complaints.filter(
                  (c) =>
                    c.status === "Resolved"
                ).length
              }
            </h2>

          </div>

        </div>

        {/* Search */}

        <div className="rounded-3xl bg-white p-6 shadow-lg">

          <div className="flex flex-col gap-4 md:flex-row">

            <div className="relative flex-1">

              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search by title, category or student..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-xl border py-3 pl-12 pr-4"
              />

            </div>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="rounded-xl border px-5"
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>

            <button
              onClick={fetchComplaints}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 text-white"
            >
              <RefreshCw size={18} />
              Refresh
            </button>

          </div>

        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="p-4 text-left">Student</th>

                  <th className="p-4 text-left">Complaint</th>

                  <th className="p-4 text-left">Category</th>

                  <th className="p-4 text-left">Priority</th>

                  <th className="p-4 text-left">Location</th>

                  <th className="p-4 text-left">Status</th>

                  <th className="p-4 text-left">Action</th>

                </tr>

              </thead>

              <tbody>
                                {loading ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="py-12 text-center text-gray-500"
                    >
                      Loading complaints...
                    </td>

                  </tr>

                ) : filtered.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="py-12 text-center text-gray-500"
                    >
                      No Complaints Found
                    </td>

                  </tr>

                ) : (

                  filtered.map((item) => (

                    <tr
                      key={item._id}
                      className="border-b transition hover:bg-slate-50"
                    >

                      <td className="p-4 font-medium">
                        {item.student?.name || "Unknown"}
                      </td>

                      <td className="max-w-xs p-4">
                        <div className="font-semibold">
                          {item.title}
                        </div>

                        <div className="mt-1 text-sm text-gray-500">
                          {item.description}
                        </div>
                      </td>

                      <td className="p-4">
                        {item.category}
                      </td>

                      <td className="p-4">

                        <span
                          className={`rounded-full px-3 py-1 text-sm text-white ${
                            item.priority === "High"
                              ? "bg-red-500"
                              : item.priority === "Medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        >
                          {item.priority}
                        </span>

                      </td>

                      <td className="p-4">
                        {item.location || "-"}
                      </td>

                      <td className="p-4">
                        <StatusBadge
                          status={item.status}
                        />
                      </td>

                      <td className="p-4">

                        <select
                          value={item.status}
                          onChange={(e) =>
                            updateStatus(
                              item._id,
                              e.target.value
                            )
                          }
                          className="rounded-lg border px-3 py-2"
                        >
                          <option>Pending</option>
                          <option>In Progress</option>
                          <option>Resolved</option>
                        </select>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* Footer Summary */}

        <div className="rounded-3xl bg-white p-6 shadow-lg">

          <div className="flex flex-col justify-between gap-3 md:flex-row">

            <div>

              <h2 className="text-2xl font-bold">
                Summary
              </h2>

              <p className="mt-2 text-gray-500">
                Total Complaints:{" "}
                <strong>{complaints.length}</strong>
              </p>

            </div>

            <div className="text-gray-600">

              <p>
                Pending:{" "}
                {
                  complaints.filter(
                    (c) => c.status === "Pending"
                  ).length
                }
              </p>

              <p>
                In Progress:{" "}
                {
                  complaints.filter(
                    (c) =>
                      c.status === "In Progress"
                  ).length
                }
              </p>

              <p>
                Resolved:{" "}
                {
                  complaints.filter(
                    (c) =>
                      c.status === "Resolved"
                  ).length
                }
              </p>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AllComplaints;