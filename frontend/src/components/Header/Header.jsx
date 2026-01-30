import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Button from "../Button/Button";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <>
      <header className={styles.topbar}>
        <h2>Employee System</h2>
        <nav>
          <ul>
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
            <li>
              <Button text="Logout" variant="danger" onClick={handleLogout} />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
