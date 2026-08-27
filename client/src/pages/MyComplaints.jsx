import { useEffect, useState } from "react";
import API from "../services/api";
import StudentLayout from "../layouts/StudentLayout";
import StatusBadge from "../components/StatusBadge";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/complaints/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComplaints(data);
    } catch (err) {
      console.error("Fetch Complaints Error:", err);
    }
  };

  const filtered = complaints.filter((item) => {
    const matchTitle = (item.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      filter === "All" || item.status === filter;

    return matchTitle && matchStatus;
  });

  return (
    <StudentLayout>
      <div className="space-y-6">

        {/* ================================
            Header
        ================================= */}

        <div>
          <h1 className="text-4xl font-bold">
            📋 My Complaints
          </h1>

          <p className="mt-2 text-gray-500">
            Track all your complaints and admin responses.
          </p>
        </div>

        {/* ================================
            Main Card
        ================================= */}

        <div className="rounded-3xl bg-white p-6 shadow-lg">

          {/* Search + Filter */}

          <div className="mb-6 flex flex-col gap-4 md:flex-row">

            <input
              type="text"
              placeholder="🔍 Search Complaint..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="All">
                All
              </option>

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

          {/* ================================
              Table
          ================================= */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead className="bg-slate-100">

                <tr>

                  <th className="p-4 text-left">
                    Title
                  </th>

                  <th className="p-4 text-left">
                    Category
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Admin Remarks
                  </th>

                  <th className="p-4 text-left">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {filtered.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="py-10 text-center text-gray-500"
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

                      {/* Title */}

                      <td className="p-4">

                        <div className="font-semibold">
                          {item.title}
                        </div>

                        {item.description && (
                          <div className="mt-1 max-w-xs text-sm text-gray-500">
                            {item.description}
                          </div>
                        )}

                      </td>

                      {/* Category */}

                      <td className="p-4">
                        {item.category}
                      </td>

                      {/* Status */}

                      <td className="p-4">

                        <StatusBadge
                          status={item.status}
                        />

                      </td>

                      {/* Admin Remarks */}

                      <td className="p-4">

                        {item.remarks ? (

                          <div className="max-w-xs rounded-xl border border-blue-200 bg-blue-50 p-3">

                            <p className="whitespace-pre-wrap text-sm text-gray-700">
                              {item.remarks}
                            </p>

                          </div>

                        ) : (

                          <span className="text-sm italic text-gray-400">
                            No remarks yet
                          </span>

                        )}

                      </td>

                      {/* Date */}

                      <td className="p-4 whitespace-nowrap">

                        {item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleDateString()
                          : "-"}

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </StudentLayout>
  );
}

export default MyComplaints;