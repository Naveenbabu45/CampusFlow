import {
  MdDashboard,
  MdOutlineReportProblem,
} from "react-icons/md";
import {
  FaClipboardList,
  FaUser,
  FaGraduationCap,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Sidebar({ role }) {
  const location = useLocation();
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  const studentLinks = [
    {
      name: "Dashboard",
      path: "/student-dashboard",
      icon: <MdDashboard size={22} />,
    },
    {
      name: "Raise Complaint",
      path: "/raise-complaint",
      icon: <MdOutlineReportProblem size={22} />,
    },
    {
      name: "My Complaints",
      path: "/my-complaints",
      icon: <FaClipboardList size={20} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser size={20} />,
    },
  ];

  const adminLinks = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <MdDashboard size={22} />,
    },
    {
      name: "All Complaints",
      path: "/all-complaints",
      icon: <FaClipboardList size={20} />,
    },
  ];

  const links =
    role === "admin"
      ? adminLinks
      : studentLinks;

  return (
    <aside className="flex min-h-screen w-72 flex-col bg-slate-900 text-white shadow-2xl">

      {/* Logo */}

      <div className="border-b border-slate-700 p-8">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-600 p-3">
            <FaGraduationCap size={28} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-blue-400">
              CampusFlow
            </h1>

            <p className="text-sm text-slate-400">
              Complaint Management
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">

        {links.map((item) => {

          const active =
            location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`mb-3 flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 ${
                active
                  ? "bg-blue-600 shadow-lg"
                  : "hover:bg-slate-800"
              }`}
            >
              {item.icon}

              <span className="font-medium">
                {item.name}
              </span>
            </Link>
          );

        })}

      </nav>

      {/* Bottom */}

      <div className="border-t border-slate-700 p-5">

        <div className="mb-5 flex items-center gap-3 rounded-xl bg-slate-800 p-4">

          <FaUser
            size={42}
            className="text-blue-400"
          />

          <div>

            <h3 className="font-semibold">
              {user.name}
            </h3>

            <p className="text-sm capitalize text-slate-400">
              {user.role}
            </p>

          </div>

        </div>

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-500 py-3 transition hover:bg-red-600"
        >
          <FiLogOut />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;