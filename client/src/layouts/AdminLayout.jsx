import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar role="admin" />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;