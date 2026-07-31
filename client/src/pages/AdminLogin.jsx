import { useNavigate } from "react-router-dom";


function AdminLogin() {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div className="admin-login">

      <div className="login-box">

        <h1>Admin Login</h1>

        <input
          type="email"
          placeholder="Enter admin email"
        />

        <input
          type="password"
          placeholder="Enter password"
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>
  );
}

export default AdminLogin;