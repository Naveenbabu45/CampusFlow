import { useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaUserTag,
  FaPhone,
  FaUniversity,
  FaIdCard,
  FaEdit,
  FaSave,
  FaLock,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import API from "../services/api";
import StudentLayout from "../layouts/StudentLayout";

function Profile() {
  const storedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const [editing, setEditing] = useState(false);

  const [user, setUser] = useState({
    name: storedUser.name || "",
    email: storedUser.email || "",
    role: storedUser.role || "",
    phone: storedUser.phone || "",
    department: storedUser.department || "",
    studentId: storedUser.studentId || "",
  });

  const [loading, setLoading] = useState(false);

  // Change Password State
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordLoading, setPasswordLoading] =
    useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await API.put(
        "/users/me",
        {
          name: user.name,
          phone: user.phone,
          department: user.department,
          studentId: user.studentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      toast.success("Profile Updated");

      setEditing(false);
    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (
      !passwords.oldPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      return toast.error("Please fill all fields");
    }

    if (
      passwords.newPassword !==
      passwords.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match"
      );
    }

    try {
      setPasswordLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await API.put(
        "/auth/change-password",
        {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Password update failed"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <StudentLayout>
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl">

  <h1 className="text-4xl font-bold">
    My Profile
  </h1>

  <p className="mt-2 text-blue-100">
    Manage your personal information.
  </p>

</div>

<div className="rounded-3xl bg-white p-8 shadow-xl">

  <div className="flex flex-col items-center gap-8 md:flex-row">

    <FaUserCircle
      size={150}
      className="text-blue-600"
    />

    <div className="flex-1 space-y-5">

      <div>

        <label className="font-semibold">
          Full Name
        </label>

        <input
          name="name"
          value={user.name}
          disabled={!editing}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border p-3"
        />

      </div>

      <div>

        <label className="font-semibold">
          Email
        </label>

        <div className="mt-2 flex items-center gap-3 rounded-xl border p-3">

          <FaEnvelope className="text-blue-600" />

          <span>{user.email}</span>

        </div>

      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>

          <label className="font-semibold">
            Phone
          </label>

          <div className="mt-2 flex items-center rounded-xl border p-3">

            <FaPhone className="mr-3 text-green-600" />

            <input
              name="phone"
              value={user.phone}
              disabled={!editing}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="w-full outline-none"
            />

          </div>

        </div>

        <div>

          <label className="font-semibold">
            Department
          </label>

          <div className="mt-2 flex items-center rounded-xl border p-3">

            <FaUniversity className="mr-3 text-purple-600" />

            <input
              name="department"
              value={user.department}
              disabled={!editing}
              onChange={handleChange}
              placeholder="Department"
              className="w-full outline-none"
            />

          </div>

        </div>

      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>

          <label className="font-semibold">
            Student ID
          </label>

          <div className="mt-2 flex items-center rounded-xl border p-3">

            <FaIdCard className="mr-3 text-orange-600" />

            <input
              name="studentId"
              value={user.studentId}
              disabled={!editing}
              onChange={handleChange}
              placeholder="Student ID"
              className="w-full outline-none"
            />

          </div>

        </div>

        <div>

          <label className="font-semibold">
            Role
          </label>

          <div className="mt-2 flex items-center rounded-xl border p-3">

            <FaUserTag className="mr-3 text-blue-600" />

            <span className="capitalize">
              {user.role}
            </span>

          </div>

        </div>

      </div>

      <div className="flex justify-end gap-4 pt-6">

        {!editing ? (

          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            <FaEdit />
            Edit Profile
          </button>

        ) : (

          <button
            onClick={saveProfile}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
          >
            <FaSave />

            {loading
              ? "Saving..."
              : "Save Changes"}

          </button>

        )}

      </div>

    </div>

  </div>

</div>
{/* Profile Summary */}

<div className="rounded-3xl bg-white p-8 shadow-xl">

  <h2 className="mb-5 text-2xl font-bold">
    Profile Summary
  </h2>

  <div className="grid gap-6 md:grid-cols-3">

    <div className="rounded-2xl bg-blue-50 p-6">

      <h3 className="text-lg font-semibold text-blue-700">
        Department
      </h3>

      <p className="mt-2 text-xl">
        {user.department || "-"}
      </p>

    </div>

    <div className="rounded-2xl bg-green-50 p-6">

      <h3 className="text-lg font-semibold text-green-700">
        Student ID
      </h3>

      <p className="mt-2 text-xl">
        {user.studentId || "-"}
      </p>

    </div>

    <div className="rounded-2xl bg-purple-50 p-6">

      <h3 className="text-lg font-semibold text-purple-700">
        Role
      </h3>

      <p className="mt-2 text-xl capitalize">
        {user.role}
      </p>

    </div>

  </div>

</div>

{/* Change Password */}

<div className="rounded-3xl bg-white p-8 shadow-xl">

  <div className="flex items-center gap-3 mb-6">

    <FaLock className="text-red-600 text-2xl" />

    <h2 className="text-2xl font-bold">
      Change Password
    </h2>

  </div>

  <div className="grid gap-5">

    <input
      type="password"
      name="oldPassword"
      placeholder="Old Password"
      value={passwords.oldPassword}
      onChange={handlePasswordChange}
      className="w-full rounded-xl border p-3"
    />

    <input
      type="password"
      name="newPassword"
      placeholder="New Password"
      value={passwords.newPassword}
      onChange={handlePasswordChange}
      className="w-full rounded-xl border p-3"
    />

    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm New Password"
      value={passwords.confirmPassword}
      onChange={handlePasswordChange}
      className="w-full rounded-xl border p-3"
    />

    <button
      onClick={changePassword}
      disabled={passwordLoading}
      className="rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
    >
      {passwordLoading
        ? "Updating..."
        : "Update Password"}
    </button>

  </div>

</div>

</div>

</StudentLayout>

);
}

export default Profile;