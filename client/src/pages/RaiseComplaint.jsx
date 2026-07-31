import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import StudentLayout from "../layouts/StudentLayout";

function RaiseComplaint() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await API.post(
        "/complaints",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Complaint Raised Successfully ✅");

      navigate("/my-complaints");
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            📝 Raise Complaint
          </h1>

          <p className="text-gray-500 mb-8">
            Fill all details carefully.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>
              <label className="block font-semibold mb-2">
                Complaint Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Enter complaint title"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block font-semibold mb-2">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">
                    Select Category
                  </option>

                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Network</option>
                  <option>Classroom</option>
                  <option>Hostel</option>
                  <option>Others</option>

                </select>

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  placeholder="Example: C Block Room 204"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />

              </div>

            </div>

            <div>

              <label className="block font-semibold mb-2">
                Description
              </label>

              <textarea
                rows="6"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                placeholder="Describe your complaint..."
                className="w-full border rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-bold transition"
            >
              {loading
                ? "Submitting..."
                : "Submit Complaint"}
            </button>

          </form>

        </div>

      </div>
    </StudentLayout>
  );
}

export default RaiseComplaint;