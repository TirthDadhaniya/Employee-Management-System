import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <header className="topbar">
        <h2>Employee System</h2>
        <nav className="action-buttons">
          <ul>
            <li>
              <Link to="/employee" className="btn btn-primary">
                Manage Employees
              </Link>
            </li>
            <li>
              <Link to="/designation" className="btn btn-primary">
                Manage Designations
              </Link>
            </li>
            <li>
              <Link to="/salary" className="btn btn-primary">
                Manage Salaries
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
