function DashboardCard({ title, value, color }) {
  return (
    <div
      className={`${color} rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}
    >
      <p className="text-lg opacity-90 font-medium">
        {title}
      </p>

      <h2 className="text-5xl font-extrabold mt-4">
        {value}
      </h2>
    </div>
  );
}

export default DashboardCard;
<div className="grid lg:grid-cols-2 gap-6">

  <div className="bg-white rounded-3xl shadow-lg p-6">
    <h2 className="text-2xl font-bold mb-4">
      🎯 Quick Actions
    </h2>

    <div className="flex gap-4">

      <button
        onClick={() => navigate("/raise-complaint")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
      >
        Raise Complaint
      </button>

      <button
        onClick={() => navigate("/my-complaints")}
        className="bg-slate-800 hover:bg-black text-white px-6 py-3 rounded-xl"
      >
        My Complaints
      </button>

    </div>
  </div>

  <div className="bg-white rounded-3xl shadow-lg p-6">

    <h2 className="text-2xl font-bold mb-3">
      📢 Tips
    </h2>

    <ul className="space-y-3 text-gray-600">

      <li>✅ Add proper complaint title.</li>

      <li>✅ Mention exact location.</li>

      <li>✅ Upload image if possible.</li>

      <li>✅ Track status regularly.</li>

    </ul>

  </div>

</div>