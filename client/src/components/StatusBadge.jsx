function StatusBadge({ status }) {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-purple-100 text-purple-700",
    Resolved: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;