import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


function Home() {
  return (
    <>
      <Navbar />

      <div className="home">
        <h1>CampusFlow</h1>

        <p>Smart Campus Complaint Management System</p>

        <Link to="/">
          <button>Student Login</button>
        </Link>

        <Link to="/">
  <button>Admin Login</button>
</Link>
      </div>
    </>
  );
}

export default Home;