import { useEffect, useMemo, useState } from "react";
import { Search, RefreshCw, MessageSquare } from "lucide-react";
import { toast } from "react-hot-toast";
import API from "../services/api";

import AdminLayout from "../layouts/AdminLayout";
import StatusBadge from "../components/StatusBadge";

function AllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // ================================
  // Fetch Complaints
  // ================================
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
      console.error(err);
      toast.error("Unable to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // Update Status + Remarks
  // ================================
  const updateComplaint = async (id, status, remarks) => {
    const ok = window.confirm(
      "Are you sure you want to update this complaint?"
    );

    if (!ok) return;

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/complaints/${id}`,
        {
          status,
          remarks,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Complaint Updated Successfully");

      fetchComplaints();
    } catch (err) {
      console.error("Update Error:", err);

      toast.error(
        err?.response?.data?.message ||
          "Complaint Update Failed"
      );
    }
  };

  // ================================
  // Search + Filter
  // ================================
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

        {/* ================================
            Header
        ================================= */}

        <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-8 text-white shadow-xl">

          <h1 className="text-4xl font-bold">
            Complaint Management
          </h1>

          <p className="mt-2 text-slate-300">
            Manage, filter and update every student complaint.
          </p>

        </div>

        {/* ================================
            Statistics Cards
        ================================= */}

        <div className="grid gap-6 md:grid-cols-4">

          <div className="rounded-3xl bg-blue-600 p-6 text-white shadow-lg">

            <p>Total Complaints</p>

            <h2 className="mt-3 text-4xl font-bold">
              {complaints.length}
            </h2>

          </div>

          <div className="rounded-3xl bg-yellow-500 p-6 text-white shadow-lg">

            <p>Pending</p>

            <h2 className="mt-3 text-4xl font-bold">
              {
                complaints.filter(
                  (c) => c.status === "Pending"
                ).length
              }
            </h2>

          </div>

          <div className="rounded-3xl bg-purple-600 p-6 text-white shadow-lg">

            <p>In Progress</p>

            <h2 className="mt-3 text-4xl font-bold">
              {
                complaints.filter(
                  (c) => c.status === "In Progress"
                ).length
              }
            </h2>

          </div>

          <div className="rounded-3xl bg-green-600 p-6 text-white shadow-lg">

            <p>Resolved</p>

            <h2 className="mt-3 text-4xl font-bold">
              {
                complaints.filter(
                  (c) => c.status === "Resolved"
                ).length
              }
            </h2>

          </div>

        </div>

        {/* ================================
            Search + Filter
        ================================= */}

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
                className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-blue-500"
              />

            </div>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="rounded-xl border px-5 py-3 outline-none"
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>

            <button
              type="button"
              onClick={fetchComplaints}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700"
            >
              <RefreshCw size={18} />
              Refresh
            </button>

          </div>

        </div>

        {/* ================================
            Complaints
        ================================= */}

        <div className="space-y-6">

          {loading ? (

            <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
              <p className="text-gray-500">
                Loading complaints...
              </p>
            </div>

          ) : filtered.length === 0 ? (

            <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
              <p className="text-gray-500">
                No Complaints Found
              </p>
            </div>

          ) : (

            filtered.map((item) => (

              <div
                key={item._id}
                className="rounded-3xl bg-white p-6 shadow-xl transition hover:shadow-2xl"
              >

                {/* ================================
                    Complaint Header
                ================================= */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                  <div>

                    <p className="text-sm font-medium text-blue-600">
                      Student
                    </p>

                    <h2 className="text-xl font-bold text-slate-800">
                      {item.student?.name || "Unknown Student"}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {item.student?.email || ""}
                    </p>

                  </div>

                  <StatusBadge status={item.status} />

                </div>

                {/* ================================
                    Complaint Details
                ================================= */}

                <div className="mt-6 grid gap-5 md:grid-cols-2">

                  <div>

                    <p className="text-sm font-medium text-gray-500">
                      Complaint
                    </p>

                    <h3 className="mt-1 text-lg font-semibold">
                      {item.title}
                    </h3>

                  </div>

                  <div>

                    <p className="text-sm font-medium text-gray-500">
                      Category
                    </p>

                    <p className="mt-1 font-medium">
                      {item.category}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm font-medium text-gray-500">
                      Priority
                    </p>

                    <span
                      className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium text-white ${
                        item.priority === "High"
                          ? "bg-red-500"
                          : item.priority === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {item.priority}
                    </span>

                  </div>

                  <div>

                    <p className="text-sm font-medium text-gray-500">
                      Location
                    </p>

                    <p className="mt-1 font-medium">
                      {item.location || "-"}
                    </p>

                  </div>

                </div>

                {/* ================================
                    Description
                ================================= */}

                <div className="mt-5 rounded-2xl bg-slate-50 p-5">

                  <p className="text-sm font-semibold text-gray-500">
                    Description
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-gray-700">
                    {item.description}
                  </p>

                </div>

                {/* ================================
                    Admin Update Section
                ================================= */}

                <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

                  <div className="mb-4 flex items-center gap-2">

                    <MessageSquare className="h-5 w-5 text-blue-600" />

                    <h3 className="text-lg font-bold text-slate-800">
                      Admin Response
                    </h3>

                  </div>

                  <div className="grid gap-5 md:grid-cols-2">

                    {/* Status */}

                    <div>

                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Complaint Status
                      </label>

                      <select
                        id={`status-${item._id}`}
                        defaultValue={item.status}
                        className="w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-blue-500"
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Resolved">
                          Resolved
                        </option>

                      </select>

                    </div>

                    {/* Remarks */}

                    <div>

                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Remarks
                      </label>

                      <textarea
                        id={`remarks-${item._id}`}
                        defaultValue={item.remarks || ""}
                        rows={3}
                        placeholder="Enter remarks for the student..."
                        className="w-full resize-none rounded-xl border bg-white px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const statusElement =
                        document.getElementById(
                          `status-${item._id}`
                        );

                      const remarksElement =
                        document.getElementById(
                          `remarks-${item._id}`
                        );

                      const status =
                        statusElement?.value || item.status;

                      const remarks =
                        remarksElement?.value || "";

                      updateComplaint(
                        item._id,
                        status,
                        remarks
                      );
                    }}
                    className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Update Complaint
                  </button>

                </div>

                {/* ================================
                    Existing Remarks
                ================================= */}

                {item.remarks && (
                  <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-5">

                    <p className="text-sm font-semibold text-green-700">
                      Current Admin Remarks
                    </p>

                    <p className="mt-2 whitespace-pre-wrap text-gray-700">
                      {item.remarks}
                    </p>

                  </div>
                )}

              </div>

            ))

          )}

        </div>

        {/* ================================
            Footer Summary
        ================================= */}

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
                    (c) => c.status === "In Progress"
                  ).length
                }
              </p>

              <p>
                Resolved:{" "}
                {
                  complaints.filter(
                    (c) => c.status === "Resolved"
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