import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <>
      <header className="topbar">
        <h2>Employee System</h2>
        <nav className="action-buttons">
          <ul>
            <li>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </li>
            <li>
              <Link to="/list" className="btn btn-primary">
                List
              </Link>
            </li>
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

export default Header;
