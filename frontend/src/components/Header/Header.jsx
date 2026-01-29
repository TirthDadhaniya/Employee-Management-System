import { Link } from "react-router-dom";
import "./Header.css";
import Button from "../Button/Button";

function Header() {
  return (
    <>
      <header className="topbar">
        <h2>Employee System</h2>
        <nav className="action-buttons">
          <ul>
            <li>
              <Link to="/login">
                <Button text="Login" variant="primary" />
              </Link>
            </li>

            <li>
              <Link to="/list">
                <Button text="List" variant="primary" />
              </Link>
            </li>
            <li>
              <Link to="/designation">
                <Button text="Manage Designations" variant="primary" />
              </Link>
            </li>
            <li>
              <Link to="/employee">
                <Button text="Manage Employees" variant="primary" />
              </Link>
            </li>

            <li>
              <Link to="/salary">
                <Button text="Manage Salaries" variant="primary" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
