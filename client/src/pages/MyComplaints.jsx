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
      console.log(err);
    }
  };

  const filtered = complaints.filter((item) => {
    const matchTitle = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      filter === "All" || item.status === filter;

    return matchTitle && matchStatus;
  });

  return (
    <StudentLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-4xl font-bold">
            📋 My Complaints
          </h1>

          <p className="text-gray-500 mt-2">
            Track all your complaints.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex flex-col md:flex-row gap-4 mb-6">

            <input
              type="text"
              placeholder="🔍 Search Complaint..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="flex-1 border rounded-xl px-4 py-3"
            />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                </tr>

              </thead>

              <tbody>

                {filtered.length === 0 ? (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center py-10 text-gray-500"
                    >
                      No Complaints Found
                    </td>

                  </tr>

                ) : (

                  filtered.map((item) => (

                    <tr
                      key={item._id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4 font-medium">
                        {item.title}
                      </td>

                      <td className="p-4">
                        {item.category}
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

      </div>
    </StudentLayout>
  );
}

export default MyComplaints;