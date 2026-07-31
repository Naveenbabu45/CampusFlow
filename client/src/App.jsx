import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentDashboard from "./pages/StudentDashboard";
import RaiseComplaint from "./pages/RaiseComplaint";
import MyComplaints from "./pages/MyComplaints";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/AdminDashboard";
import AllComplaints from "./pages/AllComplaints";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Student */}

      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/raise-complaint"
        element={
          <ProtectedRoute role="student">
            <RaiseComplaint />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-complaints"
        element={
          <ProtectedRoute role="student">
            <MyComplaints />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute role="student">
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Admin */}

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/all-complaints"
        element={
          <ProtectedRoute role="admin">
            <AllComplaints />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;