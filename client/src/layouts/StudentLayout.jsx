import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function StudentLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar role="student" />

      <div className="flex-1 ml-72">
        <Navbar />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;