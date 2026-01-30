import { useState } from "react";
import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Logged in:", data);
        setLoginData({ email: "", password: "" }); // Clear form
        // navigate(0); // Refresh the page to show updated list
        alert("Login Successful!");
        navigate("/list");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <div className={styles["auth-wrapper"]}>
        <div className={styles["auth-card"]}>
          <div className={styles["auth-header"]}>
            <h2>Welcome Back</h2>
            <p>Please login to your account</p>
          </div>
          <form id="loginForm" className={styles["auth-form"]} onSubmit={onSubmit}>
            <div className={styles["form-group"]}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                value={loginData.email}
                onChange={handleInput}
                className={styles["form-control"]}
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleInput}
                required
                className={styles["form-control"]}
              />
            </div>

            <Button type="submit" variant="primary" fullWidth={true} text="Sign In" />
          </form>

          <div className={styles["auth-footer"]}>
            <p>
              Don't have an account? <Link to="/register">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
