import {
  FaBell,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";

function Navbar() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b bg-white px-8 shadow-sm">

      {/* Left */}

      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome back, {user.name || "Student"} 👋
        </h2>

        <p className="mt-1 text-sm text-gray-500 capitalize">
          Logged in as {user.role}
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Search */}

        <div className="hidden items-center rounded-xl border bg-gray-50 px-4 py-2 lg:flex">

          <FaSearch className="mr-2 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none"
          />

        </div>

        {/* Notification */}

        <button className="relative rounded-full bg-gray-100 p-3 transition hover:bg-blue-100">

          <FaBell
            size={20}
            className="text-gray-700"
          />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        {/* User */}

        <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-2">

          <FaUserCircle
            size={42}
            className="text-blue-600"
          />

          <div className="hidden md:block">

            <h3 className="font-semibold">
              {user.name}
            </h3>

            <p className="text-sm text-gray-500 capitalize">
              {user.role}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;